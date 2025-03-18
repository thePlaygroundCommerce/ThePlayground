import ContactForm from "components/forms/ContactForm";
import SocialMediaButtons from "components/SocialMediaButtons";
import Heading from "components/typography/Heading";

const Page = () => {
  return (
    <div className="p-4 container mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center flex flex-col gap-6 justify-around items-center md:w-3/4">
          <div>
            <Heading>Contact Us</Heading>
            <p>
              Can't find information you were expecting to find? Have some feedback
              for our online store? We would love to help answer any question you
              might have regarding our store or travel in general. Feel free to reach
              out to us via email at theplaygroundmedia@outlook.com. We should get
              back to you in the following 24 hours of receiving your email.
            </p>
          </div>
          <div>
            <Heading>Follow Us</Heading>
            <p>
              We also have active social media platforms, such as Instagram, Facebook
              and YouTube. As we have product promotions and discounts, significant
              travel news, and travel content we think you would enjoy. Feel free to
              shoot us a message on those platforms
            </p>
            <div className="w-48 m-auto mt-4">
              <SocialMediaButtons align="around" />
            </div>
          </div>
        </div>
        <div><ContactForm title={""} /></div>
      </div>
    </div>
  );
};

export default Page;
