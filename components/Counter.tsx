import { Dispatch, SetStateAction, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppProps } from "types";
import Button from "./Button";

type Props = AppProps & {
  count: number;
  allowDeletion?: boolean;
  onCountChange: any;
};

const Counter = ({ count: initialCount = 1, onCountChange, allowDeletion = false }: Props) => {
  const [count, setCount] = useState(initialCount);
  const handleIncrement = () => { setCount(count => count + 1); onCountChange(count + 1) };
  const handleDecrement = () => { setCount(count => count - 1); onCountChange(count - 1) };
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.target.value;
    const valueToSet = value < 2 ? 1 : value;
    onCountChange(valueToSet);
  };

  return (
    <div className="flex rounded-full justify-around align-middle px-5 py-2">
      <div>
        <Button
          className="border p-3 rounded-full"
          disabled={!allowDeletion && initialCount < 2}
          onClick={handleDecrement}
        >
          <FaMinus size={6} />
        </Button>
        <input
          className="text-center max-w-12"
          type="number"
          id="counterInput"
          name="counterInput"
          onChange={handleTextChange}
          value={count}
        />
        <Button className="border p-3 rounded-full" onClick={handleIncrement}>
          <FaPlus size={6} />
        </Button>
      </div>

    </div>
  );
};

export default Counter;
