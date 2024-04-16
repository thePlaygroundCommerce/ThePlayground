import Link from "next/link";
import NewsletterForm from "./forms/NewsletterForm.jsx";
import SocialMediaButtons from "./SocialMediaButtons.js";
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t p-5">
      <div className="flex">
        <div className="w-full flex items-end flex-col text-right">
          {/* <div>
            <p>About Us</p>
            <p>Contact </p>
            <p>Terms & Conditions</p>
            <p>Feedback & Returns</p>
          </div> */}
          <SocialMediaButtons align="center" />
        </div>
        {/* <div className="w-full pl-6">
          <p>You should keep a eye on us, we're a bit crazy.</p>
          <div className="w-max">
            <NewsletterForm />
          </div>
        </div> */}
      </div>
      {/* <div className="flex justify-center mt-4">
        <Link href="/">
          <Image alt="Logo" src="/The Playground Logo_Black.svg" height={75} width={75} />
        </Link>
      </div> */}
    </footer>
  );
}

export default Footer;
