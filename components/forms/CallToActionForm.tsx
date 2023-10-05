"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { callToActionCreateForm } from "api/customerApi";
import Spinner from "components/Spinner";

const CallToActionForm = ({
  primary,
  variation,
  placeholder,
  description,
}: {
  primary: any;
  description: any;
  onSuccessDescription?: any;
  onFailDescription?: any;
  variation: any;
  placeholder: any;
}) => {
  const { pending } = useFormStatus();
  const [{ isSubmitted }, formAction] = useFormState(callToActionCreateForm, { });

  return (
    <>
      <h6 className="mb-4 text-white">
        {(isSubmitted &&
          "Thanks for joining the grounds. Check up on your email for any updates!") ||
          description}
      </h6>
      {isSubmitted || (
        <form
          className="text-black"
          action={formAction}
        >
          {variation !== "onlyButton" && (
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="p-2 rounded w-64"
              placeholder={placeholder?.toString()}
            />
          )}
          <button
            aria-disabled={pending}
            type="submit"
            className="text-white p-2 bg-slate-700"
          >
            {primary.action_button_text}
          </button>
        </form>
      )}
    </>
  );
};

export default CallToActionForm;
