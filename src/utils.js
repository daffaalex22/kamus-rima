import { collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { segmenter } from "./segmenter";
import { firestore } from "../firebase";

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
        // orderBy("numOfSyllables", "desc"),
        ...conditions
      )
    );

    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastIndex = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { items, lastIndex }
  };

  // const fetchRDBData = async () => {
  //   const dataRef = ref(rdb, "entries");

  //   try {
  //     const snapshot = await get(rdbQuery(dataRef, limitToFirst(10)));
  //     if (snapshot.exists()) {
  //       setRDBData(Object.values(snapshot.val()));
  //     } else {
  //       console.log("No data available");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // }

  return fetchData();
  // fetchRDBData();
}

export { getRimaTypeFromTitle, codeToRimaType, rimaTypeToCode, RIMA, fetchWordsRhymeWith, RIMA_CODE };