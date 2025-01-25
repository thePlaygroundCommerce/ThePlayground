import { LayoutPageProps } from "app/layout";
import Button from "components/Button";
import NewsletterForm from "components/forms/NewsletterForm";
import Showcase from "components/Showcase";
import Slider from "components/Slider";
import { GoChevronLeft } from "react-icons/go";

export const metadata = {
  title: "The Playground | Shop",
};

export default function Layout({ children }: LayoutPageProps) {
  


  return (
    <div className="mt-16">
      <div className="min-h-screen">
        <div className="mx-4 text-xs text-zinc-600 flex items-center gap-2 fixed">
          {/* <Breadcrumbs
            items={breadcrumbs}
          /> */}
          <div>
            <GoChevronLeft size={20} />
          </div>
          <div>SHOP</div>
        </div>
        {children}
      </div>
      <div className="bg-mintcream-950">
        <NewsletterForm
          content={{
            description:
              "You are signing up to receive product updates and newsletters. By signing up, you are consenting to our privacy policy but you can opt out at any time.",
            title:
              "Get exclusive access to new products, deals & surprise giveaways.",
          }}
        />
      </div>
    </div>
  );
}
