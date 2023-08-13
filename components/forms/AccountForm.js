import React from "react";

const AccountForm = () => {
  return (
    <form>
      <div className="flex">
        <div>
          <label>FirstName</label>
          <input className="border" type="text" name="firstname" id="firstname" />
        </div>
        <div>
          <label>LastName</label>
          <input className="border" type="text" name="lastname" id="lastname" />
        </div>
      </div>
        <div>
          <label>Password</label>
          <input className="border" type="submit" name="resetPassword" id="resetPassword" />
        </div>
      <div>
        <label>Email</label>
        <input className="border" type="text" name="email" id="email" />
      </div>
      <div>
        <input className="border" type="submit" value="Save" />
      </div>
    </form>
  );
};

export default AccountForm;
