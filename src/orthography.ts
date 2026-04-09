export function makeUnmarked(str: string) {
  return swapOkinaForApostrophe(
    removeInitialOkina(removeKahako(removeDoubleVowelOkinas(str))),
  );
}

function removeInitialOkina(str: string) {
  return str.replace(/^ʻ/, "");
}

function removeDoubleVowelOkinas(text: string): string {
  return (
    text
      //
      .replace(/aʻa/g, "aa") // remove U+02BB ʻokina
      .replace(/eʻe/g, "ee") // remove U+02BB ʻokina
      .replace(/iʻi/g, "ii") // remove U+02BB ʻokina
      .replace(/oʻo/g, "oo") // remove U+02BB ʻokina
      .replace(/uʻu/g, "uu") // remove U+02BB ʻokina
  ); // remove U+0027 APOSTROPHE
}

function removeKahako(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove macrons
    .normalize("NFC");
}

function swapOkinaForApostrophe(str: string): string {
  return str.replace(/ʻ/g, "’");
}

export function removeDiacritics(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove macrons
    .replace(/ʻ/g, "") // remove U+02BB ʻokina
    .replace(/‘/g, "") // remove U+2018 LEFT SINGLE QUOTATION MARK
    .replace(/'/g, "") // remove U+0027 APOSTROPHE
    .normalize("NFC");
}
