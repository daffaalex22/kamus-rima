// const monophtong = ['eu'];
// const diphtong = ['ai', 'au', 'ei', 'oi'];
const tongToChar = {
  'ai': '%',
  'au': '^',
  'ei': '&',
  'oi': '*',
  'eu': '|'
}
const charToTong = {
  '%': 'ai',
  '^': 'au',
  '&': 'ei',
  '*': 'oi',
  '|': 'eu'
}

// const combinedConsonants = ['kh', 'ng', 'ny', 'sy'];
const CCToChar = {
  'kh': '!',
  'ng': '@',
  'ny': '#',
  'sy': '$'
}
const charToCC = {
  '!': 'kh',
  '@': 'ng',
  '#': 'ny',
  '$': 'sy'
}

// The extra chars are masked combined vowels (diphtong and monophtong)
const vowels = ['a', 'i', 'u', 'e', 'o', '%', '^', '&', '*', '|'];
const isVowel = (letter) => {
  return vowels.includes(letter);
}

const maskWord = (word) => {
  return word
    .replace('kh', CCToChar['kh'])
    .replace('ng', CCToChar['ng'])
    .replace('ny', CCToChar['ny'])
    .replace('sy', CCToChar['sy'])
    .replace('ai', tongToChar['ai'])
    .replace('au', tongToChar['au'])
    .replace('ei', tongToChar['ei'])
    .replace('oi', tongToChar['oi'])
    .replace('eu', tongToChar['eu'])
}

const unmaskWord = (maskedWord) => {
  return maskedWord
    .replace('!', charToCC['!'])
    .replace('@', charToCC['@'])
    .replace('#', charToCC['#'])
    .replace('$', charToCC['$'])
    .replace('%', charToTong['%'])
    .replace('^', charToTong['^'])
    .replace('&', charToTong['&'])
    .replace('*', charToTong['*'])
    .replace('|', charToTong['|'])
}

function findVowelIndices(str) {
  const indices = [];

  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i].toLowerCase())) indices.push(i);
  }

  return indices;
}

const segmenter = (input) => {
  const output = {
    segments: [],
    vowels: [],
    numOfSyllables: 0,
    firstSyllable: '',
    lastSyllable: '',
    secondLastSyllable: '',
    lastTwoSyllables: '',
    lastSound: '',
    rhymeType: '',
  }

  const result = []

  const word = maskWord(input);
  const vowelIndices = findVowelIndices(word);

  // Skip those with no vowels
  if (!vowelIndices.length) return output;

  let curr = word.slice(0, vowelIndices[0]);
  let next = '';
  for (let i = 0; i < vowelIndices.length - 1; i++) {
    curr += word[vowelIndices[i]]

    if (vowelIndices[i + 1] - vowelIndices[i] > 2) {
      curr += word[vowelIndices[i] + 1]
      next += word.slice(vowelIndices[i] + 2, vowelIndices[i + 1])
    } else if (vowelIndices[i + 1] - vowelIndices[i] === 2) {
      next += word.slice(vowelIndices[i] + 1, vowelIndices[i + 1])
    }

    result.push(curr);
    curr = next;
    next = ''
  }

  const lastSound = word.slice(vowelIndices[vowelIndices.length - 1], word.length)

  curr += lastSound
  result.push(curr);

  result.forEach((value, index, array) => {
    array[index] = unmaskWord(value);
  });

  output.segments = result;
  output.vowels = vowelIndices.map(i => unmaskWord(word[i]));
  output.numOfSyllables = result.length;
  output.firstSyllable = result[0];
  output.lastSyllable = result[result.length - 1]
  output.secondLastSyllable = result.length > 1 ? result[result.length - 2] : '';
  output.lastTwoSyllables = result.length > 1 ? result[result.length - 2] + result[result.length - 1] : '';
  output.lastSound = unmaskWord(lastSound);
  output.rhymeType = isVowel(word[word.length - 1]) ? 'open' : 'closed';

  return output
}

export { segmenter };