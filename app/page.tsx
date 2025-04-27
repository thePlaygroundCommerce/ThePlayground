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
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b29"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b29"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cf7_11.jpg"
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
      </a>
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b2d"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b2d"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cf3_1.jpg"
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
      </a>
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b31"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b31"]'
        href="#"
        className="k-insta-post w-inline-block"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cfb_pexels-marta-wave-6437461.jpg"
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
      </a>
    </div>,
    <div
      data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b36"
      data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b36"]'
      className="k-insta-feed-slide wf-grid"
      aria-hidden="true"
    >
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b37"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b37"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cf7_11.jpg"
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
      </a>
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3b"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3b"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cf3_1.jpg"
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
      </a>
      <a
        data-w-id="b32ede34-2bf4-3a18-2fe8-72eb0fd61b3f"
        data-wf-id='["8ecba459-37ab-3465-c53c-c1e98e89dc9b","b32ede34-2bf4-3a18-2fe8-72eb0fd61b3f"]'
        href="#"
        className="k-insta-post w-inline-block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src="https://cdn.prod.website-files.com/67f9692d7e88b9a05d707c22/67f9692e7e88b9a05d707cfb_pexels-marta-wave-6437461.jpg"
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
      </a>
    </div>


  ];

  return (
    <div className="page-wrapper">
      <WebflowHero />
      <div className="section section--spaced-1">
        <div className="k-container-1">
          <div
            data-w-id="9230dac5-099c-6cbc-335e-757232a3d415"
            className="k-section-header k-s-header--pair"
          >
            <div className="k-s__block k-s--space-r-1">
              <div className="heading-2-wrapper heading-space-2">
                <AnimatedComponent
                  className="absolute inset-0 bg-white"
                  animation={"up"}
                >
                  <h2>Eternity Textures Do Last Forever</h2>
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
                    Before we begin to give you additional information on this
                    topic, take a moment to think about how much you already
                    know.
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
          </div>
          <div
            data-w-id="927f0ab0-ae40-78eb-c052-2bd5bf7bd9d2"
            className="k-d-flex-row"
          >
            <div className="k-half-col k-pr-1">
              <div className="k-collection-Image-wrap">
                <Image
                  src={staticImages.kal}
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
                          src={staticImages.laptopbag}
                          height={1080}
                          width={1080}
                          loading="lazy"
                          alt="Boy wearing cosy shirt"
                          className="k-slide-cover-Image object-cover"
                        />
                        <div className="k-card-overlay-mask">
                          <a
                            href="#"
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
        <TabSlider />
      </div>
      <div className="section section--spaced-1">
        <div className="k-container-1">
          <div className="k-section-header k-s-header--pair">
            <div className="k-s__block k-s--space-r-1">
              <div className="heading-2-wrapper heading-space-2">
                <h2 className="k-h2">Follow us on Instagram</h2>
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
        <WebflowSlider visibleItemsCount={1} isInfinite withIndicator={false}>
          {b}
        </WebflowSlider>
      </div>
      {/* <div className="section section--spaced-1">
        <div className="k-container-1">
          <div className="k-section-header k-s-header--pair">
            <div className="k-s__block k-s--space-r-1">
              <div className="heading-2-wrapper heading-space-2">
                <h2 className="k-h2">Style Feeds</h2>
              </div>
              <div className="k-heading-line"></div>
            </div>
            <div className="k-s__block">
              <div className="k-button-wrap k-right-align">
                <a href="#" className="k-btn k-btn--solid w-button">all articles</a>
              </div>
            </div>
          </div>
        </div>
        <div className="k-slider-wrapper-with-arrows">
          <div data-delay="4000" data-animation="slide" className="k-col-slider w-slider" data-autoplay="false"
            data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0"
            data-nav-spacing="3" data-duration="500" data-infinite="true">
            <div className="k-col-slider-mask w-slider-mask">
              <div className="k-col-slide w-slide"></div>
              <div className="k-col-slide w-slide"></div>
              <div className="k-col-slide w-slide"></div>
              <div className="k-col-slide w-slide"></div>
            </div>
            <div id="style_feed_left_arrow" className="k-l-arrow hide-arrow w-slider-arrow-left">
              <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg></div>
            </div>
            <div id="style_feed_right_arrow" className="k-r-arrow hide-arrow w-slider-arrow-right">
              <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg></div>
            </div>
            <div className="hide-slider-dots w-slider-nav w-round"></div>
          </div>
          <div className="k-slider-custom-menu">
            <a id="custom_left_arrow" href="#" className="k-slider-custom-arrows arrow-left w-inline-block">
              <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg></div>
            </a>
            <a id="custom_right_arrow" href="#" className="k-slider-custom-arrows arrow-right w-inline-block">
              <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg></div>
            </a>
          </div>
        </div>
      </div> */}
      <div className="hero-slider-placeholder">
        <div className="section section--full">
          <div className="k-collection-wrapper w-dyn-list">
            <div role="list" className="k-collection-list w-dyn-items">
              <div role="listitem" className="k-collection-item w-dyn-item">
                <div className="k-full-container k-container--strech">
                  <div className="k-hero-side-slider-1">
                    <Image
                      loading="lazy"
                      alt=""
                      className="k-slide-cover-Image"
                    />
                    <div className="k-slide-image-overlay"></div>
                  </div>
                  <div
                    id="w-node-_639a5eaa-5c25-0245-1575-e0488fe314f9-5d707c83"
                    className="k-hero-right"
                  >
                    <div className="heading-wrapper heading-space-1">
                      <h1></h1>
                      <div className="k-slide-heading-overlay"></div>
                    </div>
                    <div className="para-wrapper">
                      <p className="k-slider-para"></p>
                      <div className="k-slide-para-overlay"></div>
                    </div>
                    <div className="k-button-wrap btn-wrap-1">
                      <a href="#" className="btn w-button">
                        shop now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
          <div className="fake-collection-wrapper">
            <div className="add-container">
              <div className="k-article-cl-wrapper w-dyn-list">
                <div role="list" className="k-articles-cl w-dyn-items">
                  <div role="listitem" className="k-article-cli w-dyn-item">
                    <a href="#" className="k-card-with-desc w-inline-block">
                      <div className="k-card-thumbnail">
                        <Image
                          loading="lazy"
                          alt=""
                          className="k-article-thumbnail w-dyn-bind-empty"
                        />
                      </div>
                      <div className="k-card-desc">
                        <div className="text-small w-dyn-bind-empty"></div>
                        <h4 className="w-dyn-bind-empty"></h4>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="w-dyn-empty">
                  <div>No items found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

const A = () => (
  <>
    {/* <div>
      <Hero
        type={"static"}
        items={[
          {
            image: { alt: "", fill: true },
            content: (
              <div className="p-4 flex flex-col justify-end h-full text-mintcream-100">
                <Heading level={1}>FREE SHIPPING</Heading>
                <p className="truncate">
                  Try out our new travel gear with zero shipping or handling
                  fees applied.
                </p>
                <div className="mt-2">
                  <Link href="/shop"><Button variant="primary">Shop Now</Button></Link>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
    <div className="lg:container mx-auto flex flex-col gap-12 md:mb-12">
      <div className="p-4">
        <Slider
          type={"DEFAULT"}
          title={"SHOP OUR NEWEST GEAR"}
          headline={undefined}
          slides={items
            .filter((obj) => obj.itemData)
            .map((obj) => {
              const image = images.find(
                (obj2) => obj2.id === obj.itemData?.imageIds?.[0]
              );
              return {
                image: {
                  src: image?.imageData?.url,
                  alt: image?.imageData?.caption ?? "",
                },
                content: {
                  link: `/shop/product/${obj.id}`,
                  title: obj.itemData?.name ?? "",
                  price: Number(
                    obj.itemData?.variations?.[0].itemVariationData
                      ?.priceMoney?.amount ?? 0
                  ),
                },
              };
            })}
        />
      </div>
      <div className="min-h-[75vh]">
        <Heading level={2} className="p-4">
          THE PLAYGROUND MISSION
        </Heading>
        <Showcase
          contentStyles={{ classes: "text-center p-4" }}
          content={{
            title: "",
            description: (
              <div className="">
                <p>Our mission is to redefine the
                  way you experience travel. We believe that travel
                  is not just about reaching a destination but about the
                  journey itself. That's why we curate experiences that
                  inspire and connect you with the world around you.</p>
                <Link href="/about" className="text-xs italic underline">Learn More</Link>
              </div>
            )

          }}
          image={{ alt: "", width: 1080, height: 1080 }}
          flipped
        />
      </div>
      <div className="min-h-[75vh] flex flex-col gap-4">
        <Showcase
          content={
            <div className="text-center h-full flex flex-col justify-center items-center">
              <div className="">
                <div>
                  <Heading level={4} className="text-sm font-bold text-red-500 italic m-2">
                    🔥 TRENDING 🔥
                  </Heading>
                </div>
                <Heading level={2} className="m-2">
                  {hotItem.itemData?.name}
                </Heading>
                <ul className="check">
                  <li className="">Weatherproof</li>
                  <li>Embedded USB Charger Port</li>
                  <li>Durable and Water Resistant</li>
                  <li>Stylish Modern Shape and Feel</li>
                </ul>
                <Link href={`/shop/product/${hotItem.id}`}>
                  <Button className="mt-6" variant="primary">
                    SHOW NOW
                  </Button>
                </Link>
              </div>
            </div>
          }
          image={{
            src: hotItemImage?.url,
            alt: hotItemImage?.caption ?? "",
            width: 1080,
            height: 1080
          }}
        />
      </div>
      {blogs.length > 1 && (
        <div>
          <div className="p-4">
            <Heading level={2}>
              LATEST NEWS
            </Heading>
          </div>
          <div className="md:min-h-[75vh] flex flex-col lg:gap-4 lg:flex-row text-mintcream-200">
            <div className="w-full min-h-96 relative overflow-hidden sm:rounded">
              {blogCards[0]}
            </div>
            <div className="w-full min-h-96 flex items-center relative overflow-hidden sm:rounded order-last lg:order-none">
              <NewsletterForm
                className="text-mintcream-700"
                {...{
                  description:
                    "You are signing up to receive product updates and newsletters. By signing up, you are consenting to our privacy policy but you can opt out at any time.",
                  title: (<Heading level={2}>Get exclusive access to new products, deals & surprise giveaways.</Heading>)
                }}
              />
            </div>
            <div className="w-full min-h-96 relative overflow-hidden sm:rounded">
              {blogCards[1]}
            </div>
          </div>
        </div>
      )}
    </div> */}
  </>
);

const B = ({ }) => (
  <>
    <div className="k-full-slide w-slide">
      <a href="#" className="k-full-light-box w-inline-block w-lightbox">
        <Image
          src={staticImages.dina}
          loading="lazy"
          sizes="87vw"
          alt=""
          className="k-lightbox-thumbnail"
        />
        <Image
          src={staticImages.Icon}
          loading="lazy"
          alt=""
          className="k-lighbox-play"
        />
      </a>
    </div>
  </>
);
