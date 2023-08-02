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
    <div>
      <button disabled={count < 2} onClick={handleDecrement}>
        <FaMinus />
      </button>
      <input 
        className="text-center w-8"
        type="number"
        id="counterInput"
        name="counterInput"
        onChange={handleTextChange}
        value={count}
      />
      <button onClick={handleIncrement} variant="secondary">
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
