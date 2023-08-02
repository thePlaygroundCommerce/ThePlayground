import { BsFillCheckCircleFill } from "react-icons/bs";
import { getOrder } from "api/carts";
import OrderList from "components/OrderList";
import Link from "next/link";
import Button from "components/Button";

const Checkout = async ({ params: { orderId } }) => {
  const { order, objects } = await getOrderAndCatalogObjects(orderId);
  return (
    <div className="grid grid-cols-12 px-8">
      <div className="col-span-7">
        <OrderList orders={order.lineItems} />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col mt-5">
          <div className="m-auto p-3">
            <BsFillCheckCircleFill size={100} color="green" />
          </div>
          <div className="text-center w-3/4 m-auto p-3">
            <p>
              We thank you for your purchase. You will receive an email with
              your order details shortly.
            </p>
            <p>
              Log in to your aaccount and keep track of or change your order.
            </p>
            <Link href="/login">
              <Button variant="link">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="link">
                View Order
              </Button>
            </Link>
            <Link href="/apparel">
              <Button variant="link">
                Continue Shopping
              </Button>
            </Link>
            <div>
              <div>How was your shopping experience?</div>
              <div className="flex">
                <div className="flex-gdiv-1 ">
                  <div as="textarea" placeholder="..." />
                </div>
                <Button variant="secondary">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

async function getOrderAndCatalogObjects(orderId) {
  try {
    const { order } = await fetch(
      process.env.square[process.env.NODE_ENV].url + "checkout/order/" + orderId
    )
      .then((res) => res.json())
      .then(({ result }) => result)
      .catch((err) => err);
    const lineItemsCatalogIdList = order.lineItems.map(
      (item) => item.catalogObjectId
    );

    const objects = await fetch(
      process.env.square[process.env.NODE_ENV].url + "catalog",
      {
        method: "POST",
        body: JSON.stringify({
          objectIds: lineItemsCatalogIdList,
          includeRelatedObjects: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => err);
    return {
      order,
      objects,
    };
  } catch (error) {
    return {
      error: error.result,
    };
  }
  const { order } = await getOrder(orderId);
  console.log(order);
  //
  // const objects = await getCatalogItems(lineItemsCatalogIdList, true);

  return {
    // order,
    // objects,
  };
}
