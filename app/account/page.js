import Button from "components/Button";
import LoginForm from "components/LoginForm";

const Account = () => {
  return (
    <div className="grid grid-cols-9 p-4">
      <div className="col-span-1">
        {/* <SideNav catalogCategories={mappedCatalogItems.categories} /> */}
        {/* SettingsNav */}
        {["Orders", "Wishlists", "Profile", "Password", "Account"].map(
          (nav) => (
            <li key={nav}>
              <Button>{nav}</Button>
            </li>
          )
        )}
      </div>
      <div className="col-span-8"></div>
      {/* <div className="w-100 p-3">
        <p>New To The Shop?</p>
        <p className="lh-sm display-6 fw-bolder mt-4 " style={{ width: "90%" }}>
          We can keep a tab on your orders, save multiple addresses, and get you
          checked out much faster.
        </p>
        <button variant="" className="">
          CREATE AN ACCOUNT
        </button>
      </div>
      <div className="w-100 p-3">
        <p>Good To See You Again !</p>
        <div className="w-75 mt-5 m-auto">
          <LoginForm />
        </div>
      </div> */}
    </div>
  );
};

export default Account;
