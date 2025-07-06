import Button from "components/Button";
import Image from "components/Image";
import NewsletterForm from "components/forms/NewsletterForm";
import Hero from "components/Hero";
import PhotoGrid from "components/PhotoGrid";
import Showcase from "components/Showcase";
import { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import Slider, { WebflowSlider } from "components/Slider";
import Heading from "components/typography/Heading";
import Link from "next/link";

const Page = () => {
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-12">
        <div className="leading-7">
          <Image width={1080} height={1080} alt={""} />
          <div className="bg-gray-100 p-4 flex flex-col gap-4">
            <h3>Our Story</h3>
            <p>
              At The Playground, we are passionate about making travel accessible,
              enjoyable, and hassle-free. Whether you're planning a quick getaway
              or a luxurious vacation, we're here to help you every step of the
              way.
            </p>
          </div>
        </div>
        <div>
          {/* <WebflowSlider visibleItemsCount={0} isInfinite={false} withIndicator={false} withControls={false}>
            {["a"]}
          </WebflowSlider> */}
        </div>
        {/* <div className="p-4">
          <Showcase
            // image={{ alt: "", fill: true }}
            image={{ alt: "", width: 1080, height: 1080 }}
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
        </div> */}
        {/* <PhotoGrid
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
        /> */}
        {/* <Slider
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
        /> */}
        {/* <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <Heading className="">Check the FAQs</Heading>
            <p>Take a look at our FAQs for any quick information of our store regarding shipping, returns, discounts and more.</p>
          </div>
          <Link href="/faqs"><Button variant="primary">View FAQs</Button></Link>
        </div> */}
        <div className="container mx-auto">
          <Showcase image={{ alt: "", width: 1080, height: 1080 }} content={{
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
    </div>
  );
};

export default Page;
