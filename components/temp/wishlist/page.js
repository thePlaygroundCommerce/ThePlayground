import React from "react";

const Wishlist = () => {
  return true ? <EmptyWishList /> : <div></div>;
};

const EmptyWishList = () => (
  <div>
    <p>You dont have any items in your wishlist.</p>
  </div>
);

export default Wishlist;
