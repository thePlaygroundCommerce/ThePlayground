import { getMainNavigation, LayoutPageProps } from "app/layout";
import Button from "components/Button";
import NewsletterForm from "components/forms/NewsletterForm";
import Header from "components/Header";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function Layout({ children }: LayoutPageProps) {
  return (
    <>
      <div className="min-h-screen">
        {children}
        {/* <Link href="/shop">
          <Button variant="link" className="text-xs text-zinc-600 flex items-center py-2">
            <Breadcrumbs
            items={breadcrumbs}
          />
            <div className="mx-4">
              <GoChevronLeft size={20} />
            </div>
            <div>BACK TO PRODUCTS</div>
          </Button>
        </Link> */}

      </div>
      <div className="lg:w-1/3 m-12 mx-auto">
        <NewsletterForm
          {...{
            description:
              "You are signing up to receive product updates and newsletters. By signing up, you are consenting to our privacy policy but you can opt out at any time.",
            title:
              "Get exclusive access to new products, deals & surprise giveaways.",
          }}
        />
      </div>
    </>
  );
}
