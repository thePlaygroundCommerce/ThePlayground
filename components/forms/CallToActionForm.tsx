"use client";
import { useFormState } from "react-dom";
import { callToActionCreateForm } from "api/customerApi";
import Link from "next/link";
import { AppProps } from "index";
import Button from "components/Button";

type CallToActionProps = AppProps & {
  buttonText: string | null;
  // description: any;
  // onSuccessDescription?: any;
  // onFailDescription?: any;
  // variation: any;

  type: string;
  id: string;
  name: string;
  placeholder: any;
  url: string;
};

const CallToActionForm = ({
  buttonText = "SHOP NOW",
  type,
  placeholder,
  name,
  id,
  url,
}: CallToActionProps) => {
  const [{ isSubmitted }, formAction] = useFormState(callToActionCreateForm, {
    isSubmitted: false,
    error: null,
  });

  return (
    <>
      {/* <h6 className="mb-4 text-white">
        {(isSubmitted &&
          "Thanks for joining the grounds. Check up on your email for any updates!") ||
          description}
      </h6> */}
      {isSubmitted || (
        <form className="text-black">
          {placeholder && (
            <input
              type={type}
              id={id}
              name={name}
              className="p-2 rounded w-64 border"
              placeholder={placeholder?.toString()}
            />
          )}
          <Link href={url}>
            <Button type="submit" variant="primary">{buttonText}</Button>
          </Link>
        </form>
      )}
    </>
  );
};

export default CallToActionForm;
