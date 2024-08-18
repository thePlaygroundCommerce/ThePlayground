import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { createCustomer, getCustomer } from 'api/customerApi'
import { redirect } from 'next/navigation';


export async function GET() {
  const user = await currentUser();
  if (!user) redirect("/account/sign-in")
    
  const squareId = user.privateMetadata.squareId

  if (squareId && (await getCustomer(squareId)).result.customer) null;
  else {
    createCustomer({
      referenceId: user.id,
      givenName: user.firstName ?? "",
      familyName: user.lastName ?? "",
      emailAddress: user.primaryEmailAddress?.emailAddress,
      phoneNumber: user.primaryPhoneNumber?.phoneNumber,
    }).then(({ result: { customer } }) => customer && clerkClient().users.updateUserMetadata(user.id, {
      privateMetadata: {
        squareId: customer.id
      }
    }))
  }

  redirect("/shop")

}