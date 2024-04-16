import { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppProps } from "types";

type Props = AppProps & {
  count: number;
  onCountChange: Dispatch<SetStateAction<number>>;
};

const Counter = ({ count = 1, onCountChange }: Props) => {
  const handleIncrement = () => onCountChange(count + 1);
  const handleDecrement = () => onCountChange(count - 1);
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.target.value;
    const valueToSet = value < 2 ? 1 : value;
    onCountChange(valueToSet);
  };

  return (
    <div className="flex rounded-full justify-around align-middle px-5 py-2">
      <button
        className="border p-3 rounded-full"
        disabled={count < 2}
        onClick={handleDecrement}
      >
        <FaMinus />
      </button>
      <input
        className="text-center w-full "
        type="number"
        id="counterInput"
        name="counterInput"
        onChange={handleTextChange}
        value={count}
      />
      <button className="border p-3 rounded-full" onClick={handleIncrement}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
