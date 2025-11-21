export const buttons = [
  "AC",
  "DEL",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "00",
  "0",
  ".",
  "=",
];

export const operators = buttons.filter((button) => isNaN(Number(button)));
