import { getProductDetails, searchItems } from "api/catalogApi";
import Button from "components/Button";
import NewsletterForm from "components/forms/NewsletterForm";
import Hero, { WebflowHero } from "components/Hero";
import Image from "components/Image";
import Showcase from "components/Showcase";
import Slider, { WebflowSlider } from "components/Slider";
import Heading from "components/typography/Heading";
import Link from "next/link";
import { client } from "prismicio";
import React, { Fragment } from "react";
import { mapArrayToMap } from "util/index";

import staticImages from "util/images.ts";
import Transition from "../components/Transition";
import AnimatedComponent from "components/AnimatedComponent";
import TabSlider from "components/TabSlider";
import PhotoGrid from "components/PhotoGrid";
import { ContentImage, ContentData } from "index";

import pic2 from "public/images/goumbik.jpg"
import pic1 from "public/images/jibarofoto.jpg"
import pic3 from "public/images/nappy.jpg"

import pic4 from "public/images/fotosragrop.jpg"
import pic5 from "public/images/laptopbag.jpg"
import pic6 from "public/images/andrea.jpg"

import pic7 from "public/images/konyk.jpeg"

import pic8 from "public/images/field.jpeg"
import pic9 from "public/images/pawan.jpg"
import pic10 from "public/images/oliur.jpg"


import pic11 from "public/images/samuel.jpeg"
import pic12 from "public/images/lucas.jpg"


type Props = {};

const page = async (props: Props) => {
  const { objects } = await searchItems({ categoryIds: [] });
  const { items, images } = mapArrayToMap(objects);
  const hotItem = (await getProductDetails("")).result?.object ?? items[0];
  const hotItemImage = images.find(
    (obj) => obj.id === hotItem.itemData?.imageIds?.[0]
  )?.imageData;
  const blogs = await client.getAllByType("blog_post");
  const blogCards = blogs.map(({ uid, data: { title, headline } }) => (
    <Fragment key={uid}>
      <Image style={{ objectFit: "cover" }} alt={""} fill />
      <div className="absolute flex flex-col justify-end w-full h-full p-4">
        <div>
          <Heading level={1}>{title}</Heading>
          <p className="truncate text-sm">{headline}</p>
          <Link href={`/log/${uid}`}>
            <Button padding={0} className="text-xs underline italic">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  ));

  const b = [
    <div
      data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b28"
      data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b28"]'
      className="k-insta-feed-slide wf-grid"
    >
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b29"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b29"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <Image
          src={pic1}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2a"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2a"
          alt="Boy 12 years wearing coat "
          className="k-insta-img"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2b"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2b"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2c"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2c"]'
            className="k-icon-24 w-embed"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2d"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2d"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <Image
          src={pic2}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2e"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2e"
          alt="Boy wearing hood "
          className="k-insta-img"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2f"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2f"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b30"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b30"]'
            className="k-icon-24 w-embed"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b31"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b31"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <Image
          src={pic3}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b32"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b32"
          alt="Boy wearongzebra crossing short"
          className="k-insta-img"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b33"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b33"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b34"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b34"]'
            className="k-icon-24 w-embed"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
            </svg>
          </div>
        </div>
      </Link>
    </div>,
    <div
      data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b36"
      data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b36"]'
      className="k-insta-feed-slide wf-grid"
      aria-hidden="true"
    >
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b37"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b37"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={pic4}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b38"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b38"
          alt=""
          className="k-insta-img"
          aria-hidden="true"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b39"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b39"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3a"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3a"]'
            className="k-icon-24 w-embed"
            aria-hidden="true"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
                aria-hidden="true"
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3b"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3b"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={pic5}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3c"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3c"
          alt=""
          className="k-insta-img"
          aria-hidden="true"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3d"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3d"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3e"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3e"]'
            className="k-icon-24 w-embed"
            aria-hidden="true"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
                aria-hidden="true"
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3f"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3f"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={pic6}
          loading="lazy"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b40"]'
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b40"
          alt=""
          className="k-insta-img"
          aria-hidden="true"
        />
        <div
          data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b41"
          data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b41"]'
          className="k-insta-overlay"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div
            data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b42"
            data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b42"]'
            className="k-icon-24 w-embed"
            aria-hidden="true"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
                aria-hidden="true"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>


  ];

  const gridItems: (ContentImage | ContentData)[] = [
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Backpacks",
      link: "/backpacks",
      src: pic1
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Wallets",
      link: "/wallets",
      src: pic2
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Cross Body Bags",
      src: pic3
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Luggage",
      src: pic5
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Totes & Shoulder Bags",
      src: pic4
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Duffel Bags",
      src: pic6
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Work Bags",
      src: pic7
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Toiletry Bags",
      src: pic8
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Packing Cubes",
      src: pic9
    },
    {
      // src: pic1,
      // objectFit: "contain",
      title: "Travel Accessories",
      src: pic10
    },
    // {
    //   title: <Heading>Our Mission</Heading>,
    //   description: (
    //     <p>
    //       Our mission is to redefine the way you experience travel. We
    //       believe that travel is not just about reaching a destination
    //       but about the journey itself. That's why we curate experiences
    //       that inspire and connect you with the world around you.
    //     </p>
    //   ),
    // },
    // {
    //   fill: true,
    //   alt: "test",
    // },
  ]

  return (
    <div className="page-wrapper">
      <WebflowHero />
      <div className="section section--spaced-1">
        <div className="k-container-1">
          {/* <div
            data-w-id="9230dac5-099c-6cbc-335e-757232a3d415"
            className="k-section-header k-s-header--pair"
          >
            <div className="k-s__block k-s--space-r-1">
              <div className="heading-2-wrapper heading-space-2">
                <AnimatedComponent
                  className="absolute inset-0 bg-white"
                  animation={"up"}
                >
                  <h2>Plan Right <br /> Pack Right <br /> Play Right</h2>
                </AnimatedComponent>
              </div>
              <div className="k-heading-line"></div>
            </div>
            <div className="k-s__block">
              <div className="k-para-wrap">
                <AnimatedComponent
                  className="absolute inset-0 bg-white"
                  animation={"up"}
                >
                  <p className="k-para-1 k-text-gray-1">
                    We are all 
                    <br />
                    <br />
                    Enlargement of the underground corm accumulates
                    phyto-estrogens (Hormone from Plant) comprising isoflavones
                    (daidzin, daidzein, genistin, genistein and puerarin) and
                    others such as miroestrol and its derivatives,
                    beta-sitosterol, stigmasterol, coumestrol, puerarin,
                    mirificoumestan, kwakhurin and mirificin.
                  </p>
                </AnimatedComponent>
              </div>
            </div>
          </div> */}
          <div
            data-w-id="927f0ab0-ae40-78eb-c052-2bd5bf7bd9d2"
            className="k-d-flex-row"
          >
            <div className="k-half-col k-pr-1">
              <div className="k-collection-Image-wrap">
                <Image
                  src={pic11}
                  loading="lazy"
                  sizes="(max-width: 479px) 92vw, (max-width: 991px) 38vw, (max-width: 1439px) 31vw, 100vw"
                  className="k-slide-cover-Image"
                  alt={""}
                />
                <div
                  style={{
                    WebkitTransform:
                      "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  }}
                  className="k-Image-overlay"
                ></div>
              </div>
            </div>
            <div className="k-half-col">
              <div className="k-d-flex-row k-inner">
                <div className="k-season-clw w-dyn-list">
                  <div role="list" className="k-collection-cl w-dyn-items">
                    <div role="listitem" className="k-season-cli w-dyn-item">
                      <div className="k-card k-card-for-collection">
                        <Image
                          src={pic12}
                          height={1080}
                          width={1080}
                          loading="lazy"
                          alt="Boy wearing cosy shirt"
                          className="k-slide-cover-Image object-cover h-full"
                        />
                        <div className="k-card-overlay-mask">
                          <a
                            href="/shop"
                            className="k-card-cover-link w-inline-block"
                          >
                            <div className="k-heading-3-wrapper">
                              <h3>
                                Style advice, shopping tips and outfit
                                inspiration
                              </h3>
                            </div>
                            <div className="text-uppercase">shop now</div>
                          </a>
                        </div>
                        <div
                          style={{
                            WebkitTransform:
                              "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                          }}
                          className="k-Image-overlay"
                        ></div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-dyn-empty">
                    <div>No items found.</div>
                  </div> */}
                </div>
                <div className="k-exclusive-label">
                  <AnimatedComponent
                    className="absolute inset-0 bg-white"
                    animation={"up"}
                  >
                    <div className="text-uppercase k-text-gray-2 rotated-text">
                      Exclusive Spring
                    </div>
                    <div className="text-uppercase">Collection</div>
                  </AnimatedComponent>
                  {/* <div
                    style={{ WebkitTransform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" }}
                    className="k-label-overlay"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section--spaced-1">
        <PhotoGrid gridItems={gridItems} />
      </div>
      <div className="section section--spaced-1">
        <div className="k-container-1">
          <div className="k-section-header k-s-header--pair">
            <div className="k-s__block k-s--space-r-1">
              <div className="heading-2-wrapper heading-space-2">
                <h2 className="k-h2">Stay tuned on Instagram</h2>
              </div>
              <div className="k-heading-line"></div>
            </div>
            <div className="k-s__block">
              <div className="k-button-wrap k-right-align">
                <a href="#" className="k-btn w-button">
                  follow us
                </a>
              </div>
            </div>
          </div>
        </div>
        <WebflowSlider visibleItemsCount={1} isInfinite withIndicator={false} withControls={true}>
          {b}
        </WebflowSlider>
      </div>
    </div>
  );
};

export default page;