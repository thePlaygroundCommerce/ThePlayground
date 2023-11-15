import Link from "next/link";
import NewsletterForm from "./forms/NewsletterForm.tsx";
import SocialMediaButtons from "./SocialMediaButtons.js";
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t p-5 px-16">
      <div className="flex">
        <div className="w-full flex items-end flex-col pr-6 text-center">
          <div>
            <p>About Us</p>
            <p>Feedback & Returns</p>
            <p>Contact Us</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
        <div className="w-full pl-6">
          <p>You should keep a eye on us, we're a bit crazy.</p>
          <div className="w-max">
            <NewsletterForm />
            <SocialMediaButtons className="" align="center" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/">
          <Image src="/The Playground Logo_Black.svg" height={75} width={75} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
