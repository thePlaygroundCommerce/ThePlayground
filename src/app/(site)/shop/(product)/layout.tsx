
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function Layout({ children }: LayoutProps<"/shop">) {
  return (
    <>
      {children}
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
