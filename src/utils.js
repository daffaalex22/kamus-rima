import { collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { segmenter } from "./segmenter";
import { firestore } from "../firebase";
import parse from "node-html-parser";

const RIMA = {
  AKHIR_SEMPURNA: 'rima-akhir-sempurna',
  AKHIR_TAK_SEMPURNA: 'rima-akhir-tak-sempurna',
  AKHIR_GANDA: 'rima-akhir-ganda',
  AKHIR_GANDA_TAK_SEMPURNA: 'rima-akhir-ganda-tak-sempurna',
  AWAL: 'rima-awal',
  KONSONAN: 'rima-konsonan',
}

const RIMA_CODE = {
  AKHIR_SEMPURNA: 1,
  AKHIR_TAK_SEMPURNA: 2,
  AKHIR_GANDA: 3,
  AKHIR_GANDA_TAK_SEMPURNA: 4,
  AWAL: 5,
  KONSONAN: 6,
}

const codeToRimaType = {
  1: 'rima-akhir-sempurna',
  2: 'rima-akhir-tak-sempurna',
  3: 'rima-akhir-ganda',
  4: 'rima-akhir-ganda-tak-sempurna',
  5: 'rima-awal',
  6: 'rima-konsonan',
}

const rimaTypeToCode = {
  'rima-akhir-sempurna': 1,
  'rima-akhir-tak-sempurna': 2,
  'rima-akhir-ganda': 3,
  'rima-akhir-ganda-tak-sempurna': 4,
  'rima-awal': 5,
  'rima-konsonan': 6,
}

const getRimaTypeFromTitle = (title) => title.toLowerCase().replace(/\s+/g, '-');

const getFirestoreConditions = (word, rimaTypeCode) => {
  const {
    lastSyllable,
    lastTwoSyllables,
    firstSyllable,
    lastSound
  } = segmenter(word);

  const conditions = []

  switch (codeToRimaType[rimaTypeCode]) {
    case RIMA.AKHIR_SEMPURNA:
      conditions.push(where("lastSyllable", "==", lastSyllable));
      break;
    case RIMA.AKHIR_GANDA:
      conditions.push(where("lastTwoSyllables", "==", lastTwoSyllables));
      break;
    case RIMA.AKHIR_TAK_SEMPURNA:
      conditions.push(where("lastSound", "==", lastSound));
      conditions.push(where("lastSyllable", "!=", lastSyllable));
      break;
    case RIMA.AWAL:
      conditions.push(where("firstSyllable", "==", firstSyllable));
      break;
    // TODO: Fix the query for rima konsonan and rima akhir ganda tak sempurna
    default:
      // TODO: FIX THIS, STILL USING THE WRONG WAY TO QUERY
      conditions.push(where("lastSyllable", "==", lastSyllable));
      break;
  }

  return conditions;
}

const fetchWordsRhymeWith = (word, rimaTypeCode, opts = {}) => {
  const conditions = getFirestoreConditions(word, rimaTypeCode)

  if (opts?.lastIndex) {
    conditions.push(startAfter(opts?.lastIndex))
  }

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "entries"),
        limit(opts?.limit || 25),
        ...conditions
      )
    );

    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastIndex = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { items, lastIndex }
  };

  return fetchData();
}

const fetchDefinition = (word) => {
  return fetch(`https://api.allorigins.win/raw?url=https://kbbi.web.id/${word}`, {
    headers: {
      'Origin': 'http://localhost:5173', // or your actual origin
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.text();
    })
    .then(data => {
      const root = parse(data);
      const div1 = root.getElementById("d1");

      if (!div1) return null;

      return getMainDefinition(word, div1);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
};

const getMainDefinition = (word, expandedDefinition) => {
  let content = expandedDefinition.innerHTML;

  // Step 4: Create a temporary div to parse the content
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  // Step 5: Get all child nodes of the temp div
  let childNodes = Array.from(tempDiv.childNodes);

  // Step 6: Create a container to hold the new divs
  let divs = {};  // Store divs in an object by their id

  let currentElement = "";
  childNodes.forEach(node => {
    if (node.nodeName === "BR") {
      currentElement = "";
    } else if (node.nodeName === 'B' && node.textContent.length > 1) {
      let newDiv = document.createElement('div');

      newDiv.innerHTML = node.outerHTML;
      let boldElement = newDiv.querySelector('b');

      // Skipping the additional definitions
      if (
        boldElement &&
        boldElement.textContent.trim().startsWith('--')
      ) {
        return;
      }

      // Getting the key
      if (boldElement) {
        let boldText = boldElement.textContent.trim();
        let cleanText = boldText.replace(/[^A-Za-z-]/g, '');
        newDiv.id = cleanText;
      }

      divs[newDiv.id] = newDiv;
      currentElement = newDiv.id;
    } else if (currentElement) {
      const curr = divs[currentElement];
      curr.appendChild(node);
      divs[currentElement] = curr;
    }
  });

  return divs[word]?.innerHTML
};

export {
  getRimaTypeFromTitle,
  codeToRimaType,
  rimaTypeToCode,
  RIMA,
  RIMA_CODE,
  fetchWordsRhymeWith,
  fetchDefinition
};