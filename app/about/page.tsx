import Hero from "components/Hero"
import Heading from "components/typography/Heading"

const Page = () => {
  return (
    <div className="container mx-auto ">
      <div className="">
        <Hero type={"static"} items={[{
          content: {
            title: "About Us",
            headline: null,
            cta: {},
            last_publication_date: "",
            link: ""
          },
          image: {
            src: "",
            alt: "",
            width: undefined,
            height: undefined
          },
        }]}></Hero>
      </div>
      <div className=" py-12 px-4 flex flex-col gap-12">
        <div>
          <Heading>Welcome to The Playground</Heading>
          <p>At The Playground, we are passionate about making travel accessible, enjoyable, and hassle-free. Whether you're planning a quick getaway or a luxurious vacation, we're here to help you every step of the way.</p>
        </div>
        <div>
          <Heading>Our Mission</Heading>
          <p>Our mission is to redefine the way you experience travel. We believe that travel is not just about reaching a destination but about the journey itself. That's why we curate experiences that inspire and connect you with the world around you.</p>
        </div>
        <div>
          <Heading>What We Offer</Heading>
          <ol className="list-decimal p-4">
            <li className="mb-6"><p>Wide Range of Destinations</p> From exotic beaches to bustling cities, we offer a diverse selection of destinations to suit every traveler's taste.</li>
            <li className="mb-6"><p>Seamless Booking</p> Our user-friendly platform allows you to book flights, hotels, and activities with ease, ensuring a stress-free planning process.</li>
            <li className="mb-6"><p>Expert Advice</p> Our team of travel experts is dedicated to providing you with personalized recommendations and insider tips to enhance your travel experience.</li>
            <li className="mb-6"><p>Best Deals</p> We negotiate with airlines, hotels, and tour operators to bring you the best deals and discounts, ensuring you get the most value for your money.</li>
          </ol>
        </div>
        <div>
          <Heading>Why Choose Us?</Heading>
          <p>
            - Trustworthy: With years of experience in the travel industry, we've built a reputation for reliability and customer satisfaction.

            - Customer-Centric: Your satisfaction is our priority. We are committed to exceeding your expectations and creating unforgettable travel memories.

            - Innovation: We leverage technology to innovate and improve our services continuously, ensuring that you have access to the latest tools and resources.
          </p>
        </div>
        <div>
          <Heading>Join Us on Your Next Adventure</Heading>
          <p>
            Whether you're a seasoned traveler or planning your first trip, The Playground is here to help you embark on your next adventure. Explore our website, discover new destinations, and let us inspire you to travel the world.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Page