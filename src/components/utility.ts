export const currencyConvert = (val: any) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(val);
  const formattedCurrencyValue = formattedNumber.replace(/₹/, "₹ ");
  return formattedCurrencyValue;
};

export const currentDate = () => {
  const currentDate = new Date();
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate =
    "on " + currentDate.toLocaleDateString("en-US", options);
  return formattedDate;
};
