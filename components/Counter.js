import { Button, Form, InputGroup } from "react-bootstrap";

const Counter = ({ count = 1, onCountChange }) => {
  const handleIncrement = () => onCountChange(count + 1);
  const handleDecrement = () => onCountChange(count - 1);
  const handleTextChange = (e) => {
    const value = +e.target.value;
    const valueToSet = value < 2 ? 1 : value
    onCountChange(valueToSet);
  };

  return (
    <div className="w-100">
      <InputGroup>
        <Button disabled={count < 2} onClick={handleDecrement} variant="secondary">
          -
        </Button>
        <Form.Control
          className="text-center p-0" style={{  width: 25 }}
          type="number"
          onChange={handleTextChange}
          value={count}
        />
        <Button onClick={handleIncrement} variant="secondary">
          +
        </Button>
      </InputGroup>
    </div>
  );
};

export default Counter;
