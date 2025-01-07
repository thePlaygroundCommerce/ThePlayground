import Image from "components/Image";
import clsx from "clsx";
import { Content, isImageProps } from "./Hero";
import Heading from "./typography/Heading";
import Link from "next/link";
import Button from "./Button";

type ShowcaseProps = Content & { flipped: boolean }

const Showcase = ({
  flipped,
  image,
  content: {
    headline,
    title,
    link,
    linkLabel,
    description,
    cta
  } = { headline: '', title: '' }
}: ShowcaseProps): JSX.Element => {
  const ImageComponent = isImageProps(image) ? <Image {...image} /> : image

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="w-full">
        {ImageComponent}
      </div>
      <div>
        <div className={clsx("w-full", flipped && "md:order-first")}>
          <div
            className={`p-8 flex flex-col justify-center h-full items-center md:items-center}`}
          >
            <p>{headline}</p>
            <div className="text-center">
              {typeof title == 'string' ? <Heading>{title}</Heading> : title}
              {/* <PrismicRichText field={slice.primary.title} /> */}
            </div>
            <div className={`md:w-2/3 text-left`}>
              {typeof description === 'string' ? <p>{description}</p> : description}

              {/* <PrismicRichText
                field={description}
                components={{
                  list: List,
                  listItem: ListItem,
                }}
              /> */}
            </div>
            {link && (
              <Link href={link}>
                <Button variant="primary">{linkLabel || "VIEW MORE"}</Button>
              </Link>
            )}
            {cta && (
              <div className="text-center m-8 flex">

                {/* <CallToActionForm
                  buttonText={
                    primary.call_to_action_label ?? cta.data.button_label ?? ""
                  }
                  type={""}
                  id={""}
                  name={""}
                  placeholder={cta.data.placeholder}
                  url={cta.data.url ?? ""}
                /> */}
                {/* <div className="">
                <Form>
                  <Form.Control className="" name="email" placeholder="Email" />
                </Form>
              </div>
              <div>
                <Button>
                  <PrismicNextLink
                    field={slice.primary.call_to_action_link || "/"}
                  >
                    {slice.primary.call_to_action_label ?? "Learn more…"}
                  </PrismicNextLink>
                </Button>
              </div> */}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Showcase;
