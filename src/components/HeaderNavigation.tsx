import Link from "next/link";
import { Nav } from "@/app/layout";
import { AppProps } from "index";

type Props = AppProps & { navs: Nav[] };

const HeaderNavigation = ({ navs }: Props) => {
  navs = [{id: "shop", link: "/shop", title: "Shop"}]
  return (
    <nav className="h-full">
      <ul className="flex whitespace-nowrap">
        {navs.map(({ id, title = "title", link }) => (
          <li key={id} className="text-black w-full">
            <Link className="px-4 py-2 md:px-4 md:py-2 block w-full" href={`${link ?? "shop"}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
