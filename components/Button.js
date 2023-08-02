'use client'

const Button = ({ children, onClick }) => {
  return (
    <button className="border p-3" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
