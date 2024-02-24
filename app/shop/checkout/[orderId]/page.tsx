import { BsFillCheckCircleFill } from "react-icons/bs";
import OrderList from "components/OrderList";
import Link from "next/link";
import Button from "components/Button";
import { getOrderAndCatalogObjects } from "api/checkoutApi";

const Checkout = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const res = await getOrderAndCatalogObjects(orderId);
  const lineItems = res?.order;

  return (
    <div className="h-full grid grid-cols-12 px-8">
      <div className="col-span-7">
        <OrderList orders={lineItems} />
      </div>
      <div className="col-span-5 h-full border-l">
        <div className="flex flex-col mt-5">
          <div className="m-auto w-3/4 p-3">
            <div className="flex mb-5 justify-center">
              <BsFillCheckCircleFill size={100} color="green" />
            </div>
            <p>
              We thank you for your purchase. You will receive an email to
              "email" with your order details shortly.
            </p>
          </div>
          <div className="text-center w-3/4 m-auto p-3">
            <div className="mb-5">
              <p>
                Log in to your aaccount and keep track of or change your order.
              </p>
              <Link href="/authenticate">
                <Button onClick={undefined} className={undefined}>Login</Button>
              </Link>
              <Link href="/apparel">
                <Button variant="link">Continue Shopping</Button>
              </Link>
            </div>
            <div className="text-left flex">
              <div className="border px-3 py-1 w-full">
                <textarea
                  id="experience"
                  name="experience"
                  className="w-full bg-white"
                  placeholder="How was your shopping experience?"
                ></textarea>
              </div>
              <Button variant="secondary">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
