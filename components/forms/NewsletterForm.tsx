"use client";
import { callToActionCreateForm } from "api/customerApi";
import clsx from "clsx";
import Button from "components/Button";
import { Content } from "components/Hero";
import Heading from "components/typography/Heading";
import { useActionState, useState } from "react";

const NewsletterForm = ({
  content: { title, headline, description } = { description: "", title: "" },
}: Omit<Content, "image">) => {
  const submitForm = (previousState: any, formData: FormData) => {
    callToActionCreateForm(previousState, formData);
    return { isSubmitted: true };
  };
  const [inputActive, setInputActive] = useState<boolean>(false)
  const [{ isSubmitted }, formAction] = useActionState(submitForm, {
    isSubmitted: false,
  });

  return (
    <div className="p-4 text-mintcream-100">
      <div className="text-center">
        <Heading level={4}>{title}</Heading>
      </div>
      {/* <h6 className="mb-4 m-auto text-white">
        {(isSubmitted &&
          "Thanks for joining the grounds. Check up on your email for any updates!") ||
          description}
      </h6> */}
      {isSubmitted || (
        <form className="text-black flex my-4" action={formAction}>
          <div className="flex p-2 grow rounded-md bg-mintcream-100 shadow-md  shadow-mintcream-600">
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              className="w-full bg-transparent focus:outline-none"
              placeholder={"Enter you email to register"}
            />

            <div>
              <Button type="submit" className={clsx(inputActive ? "bg-slate-200" : "bg-slate-500", "text-white p-2")}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
      {description && (
        <div className="text-xs text-center">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
