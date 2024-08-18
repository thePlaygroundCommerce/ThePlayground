import { SignOutButton, UserProfile } from "@clerk/nextjs"

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="flex flex-col">
      <UserProfile />
        <SignOutButton>
            <button className="mt-12">Log out</button>
        </SignOutButton>
    </div>
  )
}

export default Page