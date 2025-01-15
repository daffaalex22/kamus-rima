const RIMA = {
  AKHIR_SEMPURNA: 'rima-akhir-sempurna',
  AKHIR_TAK_SEMPURNA: 'rima-akhir-tak-sempurna',
  AKHIR_GANDA: 'rima-akhir-ganda',
  AKHIR_GANDA_TAK_SEMPURNA: 'rima-akhir-ganda-tak-sempurna',
  AWAL: 'rima-awal',
  KONSONAN: 'rima-konsonan',
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

export { getRimaTypeFromTitle, codeToRimaType, rimaTypeToCode, RIMA };