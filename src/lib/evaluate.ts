import { evaluate } from "mathjs";

export const evaluateData = (
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const data = evaluate(state);
    setState(data.toString());
  } catch (error) {
    console.error("error", error);
    setState("Error");
  }
};
