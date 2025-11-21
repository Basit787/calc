import * as data from "@/lib/data";
import { evaluateData } from "@/lib/evaluate";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription } from "./ui/card";
import { Input } from "./ui/input";

const Calculator = () => {
  const [state, setState] = useState<string>("");

  const { buttons, operators } = data;

  const calculate = useCallback(
    (variable: string) => {
      if (state.length === 0 && variable === "=") return;
      if (state === "Error") setState("");

      if (variable === "AC") setState("");
      else if (variable === "DEL") setState((prv) => prv.slice(0, -1));
      else if (variable === "=") evaluateData(state, setState);
      else if (state.length === 0 && operators.includes(variable)) setState("");
      else if (
        operators.includes(variable) &&
        operators.includes(state[state.length - 1])
      )
        setState(state.replace(state[state.length - 1], variable));
      else setState((prv) => prv + variable);
    },
    [state, operators]
  );
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-accent/50">
      <Card className="p-4 bg-accent-foreground/25 shadow-2xl outline-none border-0">
        <article>
          <Input
            className="h-20 text-right md:text-2xl font-bold placeholder:text-foreground bg-background/75 border-0"
            value={state}
            placeholder="0"
            readOnly
          />
        </article>
        <CardDescription className="flex justify-center items-center">
          <article className="grid justify-center items-center grid-cols-4 gap-6">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={`h-16 w-16 rounded-full cursor-pointer ${
                  operators.includes(button)
                    ? "bg-primary/85 hover:bg-primary/80 active:bg-primary/90"
                    : "bg-foreground/50 hover:bg-foreground/45 active:bg-foreground/55 text-accent-foreground"
                } ${
                  button === "=" &&
                  "bg-primary/95 hover:bg-primary/90 active:bg-primary"
                }`}
                onClick={() => calculate(button)}
              >
                {button}
              </Button>
            ))}
          </article>
        </CardDescription>
      </Card>
    </section>
  );
};

export default Calculator;
