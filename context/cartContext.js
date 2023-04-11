import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const [cart, setCart] = useState(null);
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (cookies.cartRefID) {
      fetch("/api/carts")
        .then((res) => res.json())
        .then((result) => {
          result.error ? null : setCart(result.order);
        });
    } else {
      setCookie("cartRefID", uuidv4());
    }
  }, []);

  const updateCart = async (catalogOrder) => {
    if (cart) {
      fetch("/api/carts/updateCart", {
        ...init,
        body: JSON.stringify(catalogOrder),
      })
        .then((res) => {
          console.log(res.json());
        })
        .then((result) => {
          return result;
        });
    } else {
      return createCart(catalogOrder);
    }
  };
  const createCart = async (catalogOrder) => {
    if (cart) {
      console.log("Active cart already present");
    } else {
      fetch("/api/carts/createCart", {
        ...init,
        body: JSON.stringify(catalogOrder),
      })
        .then((res) => {
          console.log("Woah");
          console.log(res.json());
        })
        .then((result) => {
          console.log("Woah");
          return result;
        }).catch(err => console.log(err));
    }
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, createCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
