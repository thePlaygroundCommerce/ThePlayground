import React from "react";

const Logindiv = () => {
  return (
    <div>
      <div className="mb-3" controlId="divBasicEmail">
        <div>Email address</div>
        <div type="email" placeholder="Enter email" />
      </div>

      <div className="mb-3" controlId="divBasicPassword">
        <div>Password</div>
        <div type="password" placeholder="Password" />
      </div>
      <div className="mb-3" controlId="divBasicCheckbox">
        <div type="checkbox" label="Remember Me" />
      </div>
      <div className="text-center">
        <button variant="" type="submit" className="w-25">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Logindiv;
