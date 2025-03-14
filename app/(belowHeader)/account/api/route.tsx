import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { registerCustomer, getCustomer } from 'api/customerApi'
import { redirect } from 'next/navigation';


export async function GET() {
  const user = await currentUser();
  if (!user) redirect("/account/sign-in")
    
  const squareId = user.privateMetadata.squareId

  if (squareId && (await getCustomer(squareId)).result.customer) null;
  else {
    registerCustomer({
      // referenceId: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      emailAddress: user.primaryEmailAddress?.emailAddress ?? "",
      phoneNumber: user.primaryPhoneNumber?.phoneNumber,
    }).then(({ result: { customer } }) => customer && clerkClient().users.updateUserMetadata(user.id, {
      privateMetadata: {
        squareId: customer.id
      }
    }))
  }

  redirect("/shop")

}