'use client'

const Button = ({ children, onClick }) => {
  return (
    <button className="border p-3 rounded-lg" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
