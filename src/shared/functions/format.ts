export const phoneFormat = (phone: string) => {
  return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2 $3");
};

export const numberFormat = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
