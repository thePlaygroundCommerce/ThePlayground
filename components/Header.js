import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "prismicio";

async function Header() {
  let navs = [];
  try {
    const doc = await createClient().getSingle("header", {
      graphQuery: `
      {
        header {
          navs {
            nav {
              ... on categorylink {
                ...categorylinkFields
              }
            }
          }
        }
      }
      `,
    });
    

    navs = doc.data.navs
  } catch (error) {
    console.log(error);
  }

  return (
    <header className="sticky top-0 border-b z-10 bg-white w-full">
      <div className="relative">
        <p className="bg-black text-white px-4 p-2">
          Free Shipping on Orders over $100!
        </p>
        <div className="px-8 py-3">
          <div className="w-full h-9 flex justify-between items-center">
            <div className="">
              <Link href="/">
                <Image
                  src="/The Playground Logo_Black.svg"
                  height={75}
                  width={75}
                />
              </Link>
            </div>
            <div className="">
              <div className="flex justify-around ">
                <HeaderNavigation navs={navs} />
              </div>
            </div>
            <div className="">
              <HeaderActions />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
