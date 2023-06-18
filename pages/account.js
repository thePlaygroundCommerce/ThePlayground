import LoginForm from "components/LoginForm";
import SettingLayout from "layouts/SettingLayout";
import React from "react";
import { Button, Container } from "react-bootstrap";

const Account = () => {
  return (
    <Container className="d-flex">
      <div className="w-100 p-3">
        <p>New To The Shop?</p>
        <p className="lh-sm display-6 fw-bolder mt-4 " style={{ width: '90%' }}>We can keep a tab on your orders, save multiple addresses, and get you checked out much faster.</p>
        <Button variant="" className="">CREATE AN ACCOUNT</Button>
      </div>
      <div className="w-100 p-3">
        <p>Good To See You Again !</p>
        <div className="w-75 mt-5 m-auto">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
};

// Account.Layout = SettingLayout

export default Account;
