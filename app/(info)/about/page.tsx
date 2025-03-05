import Button from "components/Button";
import NewsletterForm from "components/forms/NewsletterForm";
import Hero from "components/Hero";
import PhotoGrid from "components/PhotoGrid";
import Showcase from "components/Showcase";
import { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import Slider from "components/Slider";
import Heading from "components/typography/Heading";
import Link from "next/link";

const Page = () => {
  return (
    <div className=" flex flex-col gap-6">
      {/* <div className="">
        <Hero
          type={"static"}
          items={[
            {
              content: {
                title: "The Playground",
                headline: null,
                // cta: {},
                last_publication_date: "",
                link: "",
              },
              contentStyles: {
                text_content_position: "middleCenter",
              },
              image: {
                alt: "test",
                fill: true
              },
            },
          ]}
        ></Hero>
      </div> */}

      <div className="py-12 px-6 flex flex-col gap-12 container mx-auto">
        {/* <div className="mx-auto w-1/2 text-center">
          <p>

          </p>
        </div> */}
        <Showcase
          image={{ alt: "", fill: true }}
          content={{
            title: "Welcome to The Playground",
            description:
              "At The Playground, we are passionate about making travel accessible, \
            enjoyable, and hassle-free. Whether you're planning a quick getaway \
            or a luxurious vacation, we're here to help you every step of the \
            way.\
              ",
          }}
          flipped
        />
        <PhotoGrid
          gridItems={[
            {
              // src: pic1,
              // objectFit: "contain",
              fill: true,
              alt: "test",
            },
            {
              fill: true,
              alt: "test",
            },
            {
              title: <Heading>Our Mission</Heading>,
              description: (
                <p>
                  Our mission is to redefine the way you experience travel. We
                  believe that travel is not just about reaching a destination
                  but about the journey itself. That's why we curate experiences
                  that inspire and connect you with the world around you.
                </p>
              ),
            },
            {
              fill: true,
              alt: "test",
            },
          ]}
        />
        <Slider
          type={"ICONS"}
          title={null}
          headline={undefined}
          slides={[
            {
              image: { src: "", alt: "" },
              content: {
                icon: "SHIP",
                title: "Swift Shipping",
                description:
                  "We don't really like long waiting either, get your items shipped in 1 - 2 days.",
              },
            },
            {
              image: { src: "", alt: "" },
              content: {
                icon: "CHECK",
                title: "Tested & Reliable Products",
                description:
                  "All our products have been tested and tried to make sure they don't fail in the heat of your travels.",
              },
            },
            {
              image: { src: "", alt: "" },
              content: {
                icon: "STAR",
                title: "Trusted Reviews",
                description: "TTest Desc",
              },
            },
          ]}
        />
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <Heading className="">Check the FAQs</Heading>
            <p>Take a look at our FAQs for any quick informattion of our store regarding shipping, returns, discounts and more.</p>
          </div>
          <Link href="/faqs"><Button variant="primary">View FAQs</Button></Link>
        </div>
        <Showcase image={{ alt: "", fill: true }} content={{
          title: (
            <div className="text-center">
              <Heading level={1} className="text-mintcream-700">Join Our Newsletter</Heading>
              <Heading level={2} className="text-mintcream-700">Join Our Newsletter</Heading>
              <Heading level={3} className="text-mintcream-700">Join Our Newsletter</Heading>
            </div>
          ),
          description: (
            <NewsletterForm
              className="text-mintcream-700"
              {...{
                description:
                  "You are signing up to receive product updates and newsletters. By signing up, you are consenting to our privacy policy but you can opt out at any time.",
                title:
                  "Get exclusive access to new products, deals & surprise giveaways.",
              }}
            />
          )
        }} />


      </div>
    </div>
  );
};

export default Page;
