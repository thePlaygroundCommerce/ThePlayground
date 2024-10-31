"use client";
// @ts-ignore
import { useFormState } from "react-dom";
import { callToActionCreateForm } from "api/customerApi";
import Button from "components/Button";

const NewsletterForm = ({
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
  const submitForm = (previousState: any, formData: FormData) => {
    callToActionCreateForm(previousState, formData);
    return { isSubmitted: true };
  };
  const [{ isSubmitted }, formAction] = useFormState(submitForm, {
    isSubmitted: false,
  });

  return (
    <>
      <h6 className="mb-4 text-white">
        {(isSubmitted &&
          "Thanks for joining the grounds. Check up on your email for any updates!") ||
          description}
      </h6>
      {isSubmitted || (
        <form className="text-black" action={formAction}>
          {variation !== "onlyButton" && (
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="p-2 rounded w-64 border"
              placeholder={placeholder?.toString()}
            />
          )}
          <Button type="submit" className="text-white p-2 bg-slate-700">
            {primary?.action_Button_text ?? "Join Now"}
          </Button>
        </form>
      )}
    </>
  );
};

export default NewsletterForm;
