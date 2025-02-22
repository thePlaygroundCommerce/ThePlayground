"use client";
import Form from "next/form";
import { registerCustomer } from "api/customerApi";
import clsx from "clsx";
import Button from "components/Button";
import { Content } from "components/Hero";
import Heading from "components/typography/Heading";
import { ReactElement, useActionState, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { lowerCase } from "lodash";

const NewsletterForm = ({
  content: { title, headline, description } = { description: "", title: "" },
}: Omit<Content, "image">) => {
  const submitForm = (previousState: any, formData: FormData) => {
    const req: { [i: string]: string } = {};

    for (const [k, v] of formData.entries()) {
      req[k] = v.toString();
    }

    // @ts-ignore
    registerCustomer(req);
    return { isSubmitted: true };
  };

  const inputs = ["Name", "Email", "Order Number", "Message"];
  const [{ isSubmitted, ...rest }, formAction] = useActionState(submitForm, {
    isSubmitted: false,
  });

  const inputMap = inputs.reduce<{ [id in typeof inputs[number] ]: ReactElement }>(
    (acc, cur) => {
      const lowercase = cur.toLowerCase();
      const required = lowercase !== 'order number';

      const props = {
        type: lowercase === "email" ? lowercase : "text",
        id: lowercase,
        name: lowercase,
        required: required,
        className: "w-full bg-transparent focus:outline-none"
      }

      return {
        ...acc,
        [lowercase]: (
          <div >
            <label htmlFor={lowercase}>{`${cur}${(required && '*') || ""}`}</label>
            <div className="p-4 mt-1 rounded-md bg-mintcream-100 shadow-md  shadow-mintcream-600">
              {lowercase === "message" ? (
                <textarea {...props} rows={10} />
              ) : (
                <input
                  {...props}
                />
              )}
            </div>
          </div>
        ),
      };
    },
    {}
  );

  return (
    <div className="text-mintcream-100">
      <div className="text-center text-black flex justify-between">
        <Heading level={4}>{title}</Heading>
        <p className="text-sm italic text-zinc-400">* Required</p>
      </div>
      <div className="my-4 flex justify-center">
        {isSubmitted ? (
          <BsCheck2Circle size={25} />
        ) : (
          <Form className="text-black w-full" action={formAction}>
            <div className="grid grid-cols-2 gap-6">
              <div className="">{inputMap.name}</div>
              <div className="">{inputMap.email}</div>
              <div className="col-span-2">{inputMap["order number"]}</div>
              <div className="col-span-2">{inputMap.message}</div>
            </div>
            <div className="mt-4">
              <Button
                type="submit"
                className={clsx(
                  "bg-mintcream-800",
                  "text-white p-2"
                )}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </div>
      {description && (
        <div className="text-xs text-center">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
