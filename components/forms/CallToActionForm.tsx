"use client";
import { useFormState } from "react-dom";
import { callToActionCreateForm } from "api/customerApi";
import Spinner from "components/Spinner";
import Link from "next/link";

type CallToActionProps = {
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
  buttonText,
  type,
  placeholder,
  name,
  id,
  url
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
          {placeholder && <input
            type={type}
            id={id}
            name={name}
            className="p-2 rounded w-64 border"
            placeholder={placeholder?.toString()}
          />}
          <button
            // aria-disabled={pending}
            type="submit"
            className="text-white p-2 bg-slate-700"
          >
            <Link href={url}>{buttonText}</Link>
          </button>
        </form>
      )}
    </>
  );
};

export default CallToActionForm;
