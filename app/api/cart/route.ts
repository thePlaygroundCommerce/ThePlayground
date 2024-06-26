import { callCreateCart, callGetCart, callUpdateCart } from "api/cartApi";
import { Order } from "square";

//export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const id = params.id;
  const order: Order = await callGetCart(id);

  return Response.json({ ...order });
}

//export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: Request) {
  const body = await request.json();
  const order: Order = await callUpdateCart(body, {
    method: "PUT",
  });
  return Response.json(order);
}

//export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const { order }: { order: Order } = await callCreateCart(body);

  return Response.json(order);
}
