import { Dispatch, SetStateAction, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppProps } from "types";
import Button from "./Button";
import clsx from "clsx";

type Props = AppProps & {
  count: number;
  allowDeletion?: boolean;
  onCountChange: any;
};

const Counter = ({ className, count: initialCount = 1, onCountChange, allowDeletion = false }: Props) => {
  const [count, setCount] = useState(initialCount);
  const handleIncrement = () => { setCount(count => count + 1); onCountChange(count + 1) };
  const handleDecrement = () => { if (count > 0) { setCount(count => count - 1); onCountChange(count - 1) } };
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.target.value;
    const valueToSet = value < 2 ? 1 : value;
    onCountChange(valueToSet);
  };

  const isDisabled = !allowDeletion && initialCount < 2;

  return (
    <div className={clsx("flex rounded items-center border-mintcream-600 border-2 text-mintcream-600 h-auto", className)}>
      <Button
        className={clsx(isDisabled && "opacity-0", "rounded-full")}
        disabled={isDisabled}
        onClick={handleDecrement}
      >
        <FaMinus size={6} />
      </Button>
      <input
        className="text-center w-5 max-w-12"
        type="number"
        id="counterInput"
        name="counterInput"
        onChange={handleTextChange}
        value={count}
      />
      <Button className="rounded-full" onClick={handleIncrement}>
        <FaPlus size={6} />
      </Button>
    </div>
  );
};

export default Counter;
