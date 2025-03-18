"use client";
import Form from 'next/form'
import { registerCustomer } from "api/customerApi";
import clsx from "clsx";
import Button from "components/Button";
import Heading from "components/typography/Heading";
import { ReactElement, ReactNode, useActionState, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { AppProps, ContentData } from 'index';

const isNotReactElement = (element: ReactNode | ReactElement) =>  typeof element === "string"

const NewsletterForm = ({
  className,
  title, headline, description
  // contentStyles: {  }
}: ContentData & AppProps) => {
  const submitForm = (previousState: any, formData: FormData) => {
    const req: { [i: string]: string } = {}

    for (const [k, v] of formData.entries()) {
      req[k] = v.toString()
    }
    // const req = formData.entries().reduce<{
    //   emailAddress: string;
    //   firstName?: string;
    //   lastName?: string;
    //   phoneNumber?: string;
    // }>((acc, [k, v]) => ({ ...acc, [k]: v }), { emailAddress: "" })
    // @ts-ignore
    registerCustomer(req)
    return { isSubmitted: true };
  };
  const [inputActive, setInputActive] = useState<boolean>(false)
  const [{ isSubmitted }, formAction] = useActionState(submitForm, {
    isSubmitted: false,
  });

  return (
    <div className={clsx("p-4", className)}>
      <div className="text-center">
        {isNotReactElement(title) ? <Heading level={4}>{title}</Heading> : title}
      </div>
      <div className='my-4 flex justify-center'>
        {isSubmitted ? (
          <BsCheck2Circle size={25} />
        ) : (
          <Form className="text-black w-full" action={formAction}>
            <div className="flex p-2 grow rounded-md bg-mintcream-100 shadow-md shadow-mintcream-600">
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                required
                onFocus={() => setInputActive(true)}
                onBlur={() => setInputActive(false)}
                className="w-full bg-transparent focus:outline-none"
                placeholder={"Enter your email to register"}
              />

              <div>
                <Button type="submit" className={clsx(!inputActive ? "bg-slate-200" : "bg-slate-500", "text-white p-2")}>
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
      {description && (
        <div className={clsx("text-xs text-center",)}>
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
