"use client";

import { AppProps } from "index";
import React, { ReactElement, useActionState, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import Image from "./Image";
import Form from "next/form";
import Heading from "./typography/Heading";
import { Input } from "@headlessui/react";

const Modal = ({
  show: _show,
  logo,
  onClose = async () => ({ isSubmitted: false, show: false }),
}: AppProps & {
  logo: ReactElement;
  show: boolean;
  onClose?: (
    state: Awaited<{}>,
    payload: FormData
  ) => Promise<{ isSubmitted: boolean; show?: boolean }>;
}) => {
  const actionFn = async (state: {}, payload: FormData) => {
    return { ...onClose(state, payload), show: false };
  };

  const [state, action] = useActionState<{
    isSubmitted: boolean;
    show?: boolean;
  }, FormData>(actionFn, { isSubmitted: false, show: _show });
  const [input, setInput] = useState("");
  const [show, setShow] = useState<boolean>(state.show ?? false);

  return (
    show && (
      <div className="min-h-128 fixed inset-0 overflow-y-auto h-screen w-screen flex items-center justify-center backdrop-brightness-40">
        <div className="max-w-1/2 aspect-square rounded-md flex bg-mintcream-600 overflow-hidden">
          <div className="w-full min-h-full bg-cover relative">
            <Image className="absolute object-cover" alt="" fill />
          </div>
          <div className="w-full flex flex-col">
            <div id="header" className="p-1 flex">
              <div className="grow"></div>
              <Button onClick={() => setShow(false)}>
                <IoClose size={25} />
              </Button>
            </div>
            <div className="h-24 flex justify-center">{logo}</div>
            <div className="flex flex-col justify-center h-full">
              <div>
                <div
                  id="body"
                  className="grow p-4 text-center text-mintcream-100"
                >
                  <Heading level={2}>Lorem, ipsum.</Heading>
                  <Heading level={3} className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid odit necessitatibus quasi odio in? Corrupti
                    explicabo voluptas corporis ullam debitis! Adipisci rerum
                    qui deleniti architecto deserunt. Est porro atque voluptate!
                  </Heading>
                </div>
                <Form
                  action={action}
                  className="flex flex-col justify-center max-w-3/4 mx-auto bg-mintcream-800 rounded mt-4"
                >
                  <div className="bg-mintcream-100 border-green p-2 rounded">
                    <Input
                      name="emailAddress"
                      type="text"
                      placeholder="Enter email"
                      value={input}
                      onChange={(e) => setInput(e.currentTarget.value)}
                      className="w-full data-[focus]:outline-0 data-[focus]:border-0"
                    />
                  </div>
                  <Button type="submit" variant="primary">
                    Sign Up
                  </Button>
                </Form>
                <div
                  id="footer"
                  className="flex justify-center backdrop-blur-sm p-4"
                >
                  {/* <Link href="/">
                  <Button variant="primary">Sign Up</Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
