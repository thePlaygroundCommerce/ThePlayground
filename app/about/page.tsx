import Hero from "components/Hero";
import PhotoGrid from "components/PhotoGrid";
import Showcase from "components/Showcase";
import { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import Slider from "components/Slider";
import Heading from "components/typography/Heading";

import pic3 from "public/comingsoon.jpeg";
import pic1 from "public/forestbridge.jpeg";
import pic2 from "public/shirt.png";

const Page = () => {
  return (
    <div className="container mx-auto ">
      <div className="">
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
                src: pic3,
                alt: "test",
                width: 1800,
                height: 1800,
              },
            },
          ]}
        ></Hero>
      </div>
      <div className="py-12 flex flex-col gap-12">
        <div className="px-4 text-center">
          <Heading>Welcome to The Playground</Heading>
          <p>
            At The Playground, we are passionate about making travel accessible,
            enjoyable, and hassle-free. Whether you're planning a quick getaway
            or a luxurious vacation, we're here to help you every step of the
            way.
          </p>
        </div>
        <PhotoGrid
          gridItems={[
            {
              src: pic1,
              alt: "test",
            },
            {
              src: pic2,
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
              src: pic1,
              alt: "test",
            },
          ]}
        />
        <Slider
          type={"ICONS"}
          title={null}
          headline={undefined}
          slides={([1, 2, 3] as unknown as TypeOmittedSlideProps[]).fill({
            image: { src: "", alt: "" },
            content: { title: "Test", description: "TTest Desc" },
          })}
        />
        {/* <div>
          <Showcase image={{ ...pic2, alt: "test", blurHeight: undefined, blurWidth: undefined, objectFit: 'contain' }} content={{
            title: <Heading>What We Offer</Heading>, description: "haoh"
          }} flipped={false} />
        </div> */}
        <div className="p-4">
          <Heading>Join Us on Your Next Adventure</Heading>
          <p>
            Whether you're a seasoned traveler or planning your first trip, The
            Playground is here to help you embark on your next adventure.
            Explore our website, discover new destinations, and let us inspire
            you to travel the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
