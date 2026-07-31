import Image from "@/components/Image";
import Showcase from "@/components/Showcase";
import Heading from "@/components/typography/Heading";
import Newsletter from "@/components/Newsletter";
import clsx from "clsx";
import Grid from "@/components/Grid";
import { TravelBenefits } from "@/app/slices/TravelBenefits";

type LANDING_URL = "/landing/[uid]"

export default async function Page({ params }) {

  return (
    <div>
      {/* <div className="grid grid-cols-3 p-36 gap-8 relative">

        <div className=" w-full">
          <Heading level={1}>Lorem ipsum dolor sit amet.</Heading>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iusto fuga hic autem illo voluptate. Doloribus ipsam porro neque omnis, consequatur ab vel inventore est mollitia, totam natus quos eum.</p>
        </div>

        <div className="flex">
          {[1, 2].map((_, i) => (
            <div>
              <div key={i} className={clsx("w-75 aspect-2/3 shrink-0 relative overflow-hidden rounded-xl",
                i > 0 && "scale-90",
                i == 0 && "mr-4"
              )}>
                <div className="absolute bottom-0 z-10 text-zinc-100 p-4">
                  <Heading level={2}>Lorem ipsum dolor sit.</Heading>
                  <p>★★★★★</p>
                </div>
                <Image alt={""} className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src="https://picsum.photos/1600/1000?random=1"
          alt="Scenic river canyon with outdoor adventure guides"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-950/85 via-slate-900/55 to-primary/40" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Trusted by 10,000+ travelers
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find amazing outdoor adventures near you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              Compare trusted local guides for rafting, Jeep tours, hiking, ATV rides,
              and more. We connect you with operators that fit your style, budget, and
              dates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead-form"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:translate-y-[-2px]"
              >
                Get free quotes
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-2">
                <span className="text-accent">★★★★★</span> 4.9 average rating
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">✓</span> Secure &amp; private
              </span>
            </div>
          </div>
          <div className="glass-card rounded-4xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur xl:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">
                  Free matching service
                </p>
                <h2 className="font-display text-2xl font-semibold">
                  Tell us what you want
                </h2>
              </div>
              <div className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                No pressure
              </div>
            </div>
            <form id="hero-form" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-100">
                  <span className="mb-2 block">First name</span>
                  <input
                    name="firstName"
                    className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-100">
                  <span className="mb-2 block">Last name</span>
                  <input
                    name="lastName"
                    className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-100">
                <span className="mb-2 block">Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                />
              </label>
              <label className="block text-sm font-medium text-slate-100">
                <span className="mb-2 block">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-100">
                  <span className="mb-2 block">Zip code</span>
                  <input
                    name="zip"
                    className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-100">
                  <span className="mb-2 block">Activity</span>
                  <select
                    name="activity"
                    className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  >
                    <option value="">Choose adventure</option>
                    <option>White Water Rafting</option>
                    <option>Jeep Tours</option>
                    <option>Hiking Tours</option>
                    <option>ATV Tours</option>
                    <option>Horseback Riding</option>
                    <option>Ziplining</option>
                  </select>
                </label>
              </div>
              <label className="flex items-start gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>
                  I agree to be contacted regarding outdoor adventure offers.
                </span>
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:translate-y-[-2px]"
              >
                Get my free quotes
              </button>
              <p
                className="form-message text-sm text-emerald-200"
                aria-live="polite"
              />
            </form>
          </div>
        </div>
      </section>

      <div className="md:max-w-7xl mx-auto mt-12">
        <Grid items={[
          { info: "10K+", label: "Happy Travelers" },
          { info: "500+", label: "Local Tour Partners" },
          { info: "4.9", label: "Average Rating" },
          { info: "100%", label: "Secure & Private" },
        ]} />

        <section className="my-24">
          <Showcase content={
            <div className="relative h-full rounded-sm overflow-hidden">
              <Image alt="" />
            </div>
          } text={
            <div className="text-left">
              <h2 className="mb-12 text-7xl font-black">Perfect Adventures <br /> To Fit Your <br />Needs</h2>
              <p className="w-3/4">From guided rafting trips to scenic Jeep tours, we make it easier to discover outdoor experiences that match your pace, budget, and travel style. Share your dates and interests, and we’ll connect you with trusted local operators.</p>
            </div>
          } cta={""} reverse={false} />
        </section>


        <section>
          <div className="p-24 px-12">
            <Heading className="text-center mb-6" level={1}>Our Core Beliefs That Shape Travel Experiences</Heading>
            <div className="flex gap-8">
              <div className="border rounded-lg p-4 shadow-2xl/30 bg-zinc-800 text-zinc-300 flex flex-col gap-2">
                <div className="text-2xl bg-zinc-600 border-zinc-200/50 border p-2 w-fit aspect-square flex justify-center rounded-xl items-center">⛰️</div>
                <h5 className="text-lg font-bold">Adventure-first matching</h5>
                <p className="text-zinc-400">We help travelers connect with tours that fit their experience level, interests, and schedule.</p>
              </div>
              <div className="border rounded-lg p-4 shadow-2xl/30 bg-zinc-800 text-zinc-300 flex flex-col gap-2">
                <div className="text-2xl bg-zinc-600 border-zinc-200/50 border p-2 w-fit aspect-square flex justify-center rounded-xl items-center">🧭</div>
                <h5 className="text-lg font-bold">Local expertise</h5>
                <p className="text-zinc-400">Every recommendation is grounded in real guides, destinations, and traveler feedback.</p>
              </div>
              <div className="border rounded-lg p-4 shadow-2xl/30 bg-zinc-800 text-zinc-300 flex flex-col gap-2">
                <div className="text-2xl bg-zinc-600 border-zinc-200/50 border p-2 w-fit aspect-square flex justify-center rounded-xl items-center">💬</div>
                <h5 className="text-lg font-bold">Simple, no-pressure planning</h5>
                <p className="text-zinc-400">Get matched with options that feel right for your trip without the overwhelm of endless searching.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="p-36 text-center">
            <Heading className="mb-4" level={2}>Adventures And Stories<br /> Captured In Pictures</Heading>
            <div className="relative pt-[56.25%]">
              <iframe src="https://player.mediadelivery.net/embed/688372/5dc6cad5-5212-49ad-9341-95dd33391eef?autoplay=false&loop=false&muted=true&preload=true&responsive=true" loading="lazy" className="border-0 absolute top-0 h-full w-full" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        <TravelBenefits
          overline={"Why travelers choose us"}
          features={[
            { feature_title: "24/7 support", feature_description: "Questions before, during, and after your trip." },
            { feature_title: "Flexible booking", feature_description: "Easy rescheduling and verified operator details." },
            { feature_title: "Money-back guarantee", feature_description: "Trusted protection for your adventure plans." },
            { feature_title: "Local experts", feature_description: "Operators that know the region and the terrain." },
          ]}
          title={"Premium support, local expertise, and zero guesswork."}
          description={"Every recommendation is curated for safety, quality, and memorable experiences that feel effortless from booking to adventure day."}
        />

        <section>
          <Showcase content={
            <div className="relative h-full rounded-sm overflow-hidden">
              <Image alt="" />
            </div>
          } text={
            <div className="text-right">
              <h2 className="mb-12 text-7xl font-black">Most Trusted <br/> Partners In The <br/>Travel Industry</h2>
              <p className="w-3/4 ml-auto">Whether you’re planning a weekend escape or a bucket-list trip, we connect you with operators who know the terrain, the best routes, and know how to create a memorable experience from start to finish.</p>
            </div>
          } cta={""} reverse={true} />
        </section>

        <section>
          <div className="p-36">
            <Newsletter
              title={"Stay Connected"}
              description={"Join our newsletter and receive outdoor travel itinerary tips on the best adventure spots in the world."}
              cta={"Join Now"}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

// export async function generateMetadata({
//   params,
// }: PageProps<LANDING_URL>): Promise<Metadata> {
//   const { uid } = await params;
//   const page = await client.getByUID("product_landing_page", uid)
//     .catch(() => undefined);

//   return {
//     title: page?.data.meta_title,
//     description: page?.data.meta_description,
//     openGraph: {
//       images: [{ url: page?.data.meta_image.url ?? "" }],
//     },
//   };
// }
