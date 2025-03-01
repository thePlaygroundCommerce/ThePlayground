import ContactForm from "components/forms/ContactForm";
import Heading from "components/typography/Heading";
import React from "react";

const Page = () => {
  const sections = [
    {
      title: "Why Partner with Us?",
      content: (
        <p>
          Reach a diverse audience of travel enthusiasts from around the world
          who visit our platform seeking inspiration and booking
          services.Showcase your services and offerings to our engaged community
          of travelers through dedicated promotional campaigns and featured
          listings.We believe in building strong partnerships based on mutual
          benefit. From affiliate programs to sponsored content, we offer
          flexible collaboration options tailored to your goals.
        </p>
      ),
    },

    {
      title: "How to Get Started",
      content: (
        <>
          <div>
            <ol type="I" className="list-decimal">
              <li className="mb-6">
                <p>Contact Us</p><p>Reach out to our partnership team using the
                  contact form below. Please provide details about your business,
                  partnership goals, and how you envision collaborating with us.</p>
              </li>
              <li className="mb-6">
                <p>Evaluation and Approval</p><p>Our team will review your proposal
                  and respond promptly to discuss next steps and finalize the
                  partnership agreement.</p>
              </li>
            </ol>
          </div>
          <div>
            <ContactForm title={""}/>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="w-3/4 mx-auto text-center">
        <Heading className="px-12">Work with The Playground</Heading>
        <p className="">
          Thank you for considering a partnership with The Playground. We're
          excited about the possibility of collaborating with passionate
          individuals and businesses who share our commitment to delivering
          exceptional travel experiences. Whether you're a travel blogger,
          influencer, tour operator, or accommodation provider, we invite you to
          explore the various opportunities to work with us.
        </p>
      </div>
      <div className="flex gap-6">
        {sections.map(({ title, content }) => (
          <div key={title} className="w-3/4 my-8">
            <Heading className="p-8">{title}</Heading>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

// <div>
//   <Heading>Follow Us</Heading>

//   <p>
//     Stay updated on partnership opportunities, travel trends, and more by following us on social media.
//   </p>
