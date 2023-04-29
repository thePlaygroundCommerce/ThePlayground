import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const [cart, setCart] = useState({
    itemVariationsIDs: [],
    order: null,
  });
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (cookies.cartID) {
      fetch("/api/carts")
        .then((res) => res.json())
        .then(({ order }) => {
          const parsedOrder = JSON.parse(order);
          !order ? null : populateCart(parsedOrder);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const updateCart = async (lineItem) => {
    if (cart.order) {
      const body = {
        orderID: cart.order.id,
        order: {
          version: cart.order.version,
          lineItems: [lineItem],
        },
      };
      fetch("/api/carts/updateCart", {
        ...init,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(({ order }) => {
          console.log("Cart Successfully Updated");
          const parsedOrder = JSON.parse(order);

          populateCart(parsedOrder);
        })
        .catch((err) => console.log(err));
    } else {
      createCart(lineItem);
    }
  };
  const createCart = async (catalogOrder, checkout) => {
    catalogOrder.state = checkout ? "OPEN" : "DRAFT";
    const body = JSON.stringify(catalogOrder);
    return fetch("/api/carts/createCart", {
      ...init,
      body: body,
    })
      .then((res) => {
        return res.json();
      })
      .then(({ order }) => {
        console.log("Cart Successfully Created");
        const parsedOrder = JSON.parse(order);

        if (checkout) {
          return parsedOrder;
        } else {
          setCookie("cartID", parsedOrder.id, {
            path: "/",
          });
          populateCart(parsedOrder);
        }
      })
      .catch((err) => console.log(err));
  };
  const populateCart = (order) => {
    setCart({
      order: order,
      itemVariationsIDs: order.lineItems.map(
        ({ catalogObjectId }) => catalogObjectId
      ),
    });
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, createCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
