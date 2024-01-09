export const phoneFormat = (phone: string) => {
  return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2 $3");
};

export const numberFormat = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const onlyLetters = (text: string) => {
  const pattern = /[^a-zA-Z\s'àáâãäåæçèéêëìíîïðñóôõöøùúûüýÿ'-]+/gu;
  const replacement = "";
  return text.replace(pattern, replacement);
};

export const cutLongWords = (text: string) => {
  let word = text;

  if (word.length >= 15) {
    word = word.slice(0, 15) + "...";
  }

  return word;
};
