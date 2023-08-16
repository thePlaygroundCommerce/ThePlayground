import NewsletterForm from "./NewsletterForm";
import SocialMediaButttons from "./SocialMediaButttons";

function Footer() {
  return (
    <footer className="border-t p-5">
      <div className="flex w-1/2 mx-auto">
        <div className="">
          <p>About Us</p>
          <p>Feedback & Returns</p>
          <p>Contact Us</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="w-5"></div>
        <div className="">
          <p>You should keep a eye on us, we're a bit crazy.</p>
          <NewsletterForm />
          <SocialMediaButttons />
        </div>
      </div>
      <div className="text-center">
        <p>The Playground</p>
      </div>
    </footer>
  );
}

export default Footer;
