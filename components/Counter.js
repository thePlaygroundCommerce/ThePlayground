import { FaMinus, FaPlus } from "react-icons/fa";

const Counter = ({ count = 1, onCountChange }) => {
  const handleIncrement = () => onCountChange(count + 1);
  const handleDecrement = () => onCountChange(count - 1);
  const handleTextChange = (e) => {
    const value = +e.target.value;
    const valueToSet = value < 2 ? 1 : value;
    onCountChange(valueToSet);
  };

  return (
    <div className="flex rounded-full justify-around align-middle px-5 py-2">
      <button className="border p-3 rounded-full" disabled={count < 2} onClick={handleDecrement}>
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
      <button className="border p-3 rounded-full" onClick={handleIncrement} variant="secondary">
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
