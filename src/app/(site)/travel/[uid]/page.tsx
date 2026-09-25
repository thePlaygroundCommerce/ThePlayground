import Image from "@/components/Image";
import clsx from "clsx";
import Grid from "@/components/Grid";
import { submitTravelLeadForm } from "@/app/actions/forms/submissions";
import Form from "next/form";
import { Input } from "@headlessui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { DisclosureList } from "@/components/BlogTableOfContents";
import { SliceZone } from "@prismicio/react";
import { TravelLeadPageDocument } from "prismicio-types";
import { client } from "@/api/clients";
import logger from "@/util/logger";
import { redirect } from "next/navigation";
import { components } from "@/app/slices";
import { isFilled } from "@prismicio/client";
import Hero from "@/app/slices/Hero";

export default async function Page({ searchParams, params }) {
  const {
    error,
    success
  } = await searchParams;

  const { uid } = await params

  let page: TravelLeadPageDocument<string>;

  try {
    page = await client.getByUID('travel_lead_page', uid)
  } catch {
    logger.error("Missing page with uid %s", uid)
    redirect("/landing/travel")
  }

  const { slices } = page.data
  const hero = isFilled.sliceZone(slices) && slices.find((sl) => sl.slice_type === "hero")

  return (
    <div>
      {hero ? <SliceZone slices={[hero]} components={components} /> : (
        <section id="form" className="relative overflow-hidden bg-slate-900 text-white">
          <Image
            src="/images/travel.jpg"
            alt="Scenic river canyon with outdoor adventure guides"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="z-10 absolute inset-0 bg-linear-to-br from-slate-950/85 via-slate-900/55 to-primary/40" />
          <div className="z-20 relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                Trusted by 10,000+ travelers
              </div>
              <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Find amazing outdoor adventures near you.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                Compare trusted local guides for rafting, Jeep tours, hiking, ATV rides,
                and more. We connect you with operators that fit your style, budget, and
                dates.
              </p>
              {/* <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead-form"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-100 bg-zinc-800 transition hover:-translate-y-0.5"
              >
                Get free quotes
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div> */}
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="text-accent">★★★★★</span> 4.9 average rating
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Secure &amp; private
                </span>
              </div>
            </div>
            <div className="glass-card rounded-4xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop xl:p-8">
              {success ? (
                <div>
                  <BsFillCheckCircleFill
                    size="5rem"
                    className="my-12 m-auto"
                    color="green"
                  />
                  <p className="text-center">Thank you for submitting your information. We will be sure to contact you in the next 24 hours!</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Tour matching service
                      </p>
                      <h2 className="font-display text-2xl font-semibold">
                        Fill And Submit Form
                      </h2>
                    </div>
                    {/* <div className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                No pressure
              </div> */}
                  </div>
                  <Form action={submitTravelLeadForm} id="hero-form" className="space-y-4">
                    <Input hidden readOnly name="formId" value="ad1exasxwt6" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium text-slate-100">
                        <span className="mb-2 block">First name</span>
                        <input
                          name="fi-sender-firstName"
                          placeholder="Joe"
                          className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-100">
                        <span className="mb-2 block">Last name</span>
                        <input
                          name="fi-sender-lastName"
                          placeholder="Daniels"
                          className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
                        />
                      </label>
                    </div>
                    <label className="block text-sm font-medium text-slate-100">
                      <span className="mb-2 block">Email</span>
                      <input
                        type="email"
                        placeholder="joedaniels@gmail.com"
                        name="fi-sender-email"
                        className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-100">
                      <span className="mb-2 block">Phone</span>
                      <input
                        type="tel"
                        placeholder="7568492837"
                        name="fi-sender-phone"
                        className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
                      />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium text-slate-100">
                        <span className="mb-2 block">Zip code</span>
                        <input
                          name="fi-sender-postcode"
                          placeholder="20394"
                          className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-100">
                        <span className="mb-2 block">Activity</span>
                        <select
                          name="fi-message-activity"
                          className={clsx(error ? "border-red-400" : "border-white/20", "w-full rounded-2xl border bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0")}
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
                    {/* <label className="flex items-start gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  name="fi-checkbox-consent"
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>
                  I agree to be contacted regarding outdoor adventure offers.
                </span>
              </label> */}
                    <button
                      type="submit"
                      className="w-full rounded-full bg-zinc-800 px-6 py-3 font-semibold text-slate-100 transition hover:-translate-y-0.5 cursor-pointer"
                    >
                      Get my free quotes
                    </button>
                    <p className="text-red-400 p-1 text-center">{error}</p>
                  </Form>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <Grid items={[
        { info: "10K+", label: "Happy Travelers" },
        { info: "500+", label: "Local Tour Partners" },
        { info: "4.9", label: "Average Rating" },
        { info: "100%", label: "Secure & Private" },
      ]} />

      <div className="md:max-w-7xl mx-auto mt-12 grid grid-cols-3">
        <div className="col-span-2">

          {/* <DisclosureList items={[
            { heading: "hello", id: "hello" },
            { heading: "hello", id: "hello" },
          ]} /> */}

          {isFilled.sliceZone(slices) && slices.filter((sl) => sl.slice_type !== "hero").map((slice) => (
            <div className="">
              <SliceZone slices={[slice]} components={components} />
            </div>
          ))}

        </div>
        <div className="col-span-1">
          <div className="p-4 md:p-8">
            <div className="sticky top-20 z-40">
              <div className="rounded-3xl border border-zinc-200 bg-stone-100 p-6 shadow-xl sm:p-8">
                <h2 className="text-center text-4xl font-black uppercase leading-none tracking-tight text-emerald-700">
                  TOUR DETAILS
                </h2>

                <div className="mt-7 space-y-6 text-slate-900">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-sm border border-emerald-700 text-xs font-bold text-emerald-700">
                      ✓
                    </span>
                    <div>
                      <p className="text-base font-black uppercase tracking-tight text-emerald-700">
                        DEPARTS DAILY
                      </p>
                    </div>
                  </div>

                  <div className="ml-8 space-y-1">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700 text-sm font-bold text-emerald-700">
                        ◔
                      </span>
                      <div>
                        <p className="text-base font-black uppercase tracking-tight text-emerald-700">
                          DEPARTS
                        </p>
                        <p className="text-base font-medium text-slate-700">
                          Between 6:00am and 7:00am
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700 text-sm font-bold text-emerald-700">
                        ↺
                      </span>
                      <div>
                        <p className="text-base font-black uppercase tracking-tight text-emerald-700">
                          RETURNS
                        </p>
                        <p className="text-base font-medium text-slate-700">
                          Between 7:00pm and 8:00pm
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700 text-xs font-bold text-emerald-700">
                        •
                      </span>
                      <div>
                        <p className="text-base font-black uppercase tracking-tight text-emerald-700">
                          DEPARTS FROM
                        </p>
                        <p className="max-w-xs text-base font-medium leading-snug text-slate-700">
                          Select hotels in the Phoenix, Scottsdale and Tempe area*
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 pl-8 text-sm italic leading-relaxed text-slate-700">
                    *In efforts to cut down on the amount of time it takes to do pick ups,
                    we may need you to meet at another hotel. Our office will contact you
                    upon booking.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-center text-4xl font-black uppercase leading-none tracking-tight text-emerald-700">
                    WHAT&apos;S INCLUDED
                  </h3>

                  <ul className="mt-5 space-y-4 text-left text-base font-medium text-slate-800">
                    {[
                      "Lodging in Sedona",
                      "Unlimited bottled water",
                      "Entrance fees to National Parks, tribal parks, or other named activities",
                      "Experienced and professional tour guide",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-snug">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="text-center text-4xl font-black uppercase leading-none tracking-tight text-emerald-700">
                    WHAT&apos;S NOT INCLUDED
                  </h3>

                  <ul className="mt-5 space-y-4 text-left text-base font-medium text-slate-800">
                    {[
                      "Meals",
                      "Guide gratuities",
                      "Third party activities",
                      "Incidental hotel fees",
                      "Travel insurance",
                      "Starting January 1, 2026, Non-US Citizen/Resident National Park Entry Fee Surcharge of $100/person (ages 16 and older) unless you have purchased an America the Beautiful Non-Resident Annual Pass.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-snug">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                          ×
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="mt-8 w-full rounded-md bg-emerald-700 px-6 py-4 text-center text-3xl font-black uppercase tracking-tight text-white shadow-lg transition hover:brightness-105"
                >
                  CALL TO BOOK
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
