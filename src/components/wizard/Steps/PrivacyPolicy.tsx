import React, { useState } from "react";
import useWizardNavigation from "../useWizardNavigation";
import { Button } from "@nextui-org/react";
import tailwindconfig from "../../../../tailwind.config";

const PrivacyPolicyPage = () => {
  const [accepted, setAccepted] = useState(false);
  const { handleNextPage } = useWizardNavigation();

  const { headerSize } = tailwindconfig;

  const handleAcceptChange = (event: any) => {
    setAccepted(event.target.checked);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{ height: `calc(100vh - ${headerSize})` }}
    >
      <h2>Privacy Policy</h2>
      <p className="text-center">
        Please read our{" "}
        <a
          href="/html/privacy_policy.html"
          style={{ textDecoration: "underline" }}
        >
          privacy policy
        </a>{" "}
        before continuing.
      </p>
      <div className="flex flex-row gap-4 mt-4">
        <input
          type="checkbox"
          id="accept"
          name="accept"
          onChange={handleAcceptChange}
          className="h-6 w-6"
        />
        <label htmlFor="accept" className="text-lg">
          I accept the Privacy Policy
        </label>
      </div>
      <div className="mt-4">
        <Button
          onClick={() =>
            handleNextPage({ nextPage: "SelectSingleOrTwoPersons" })
          }
          disabled={!accepted}
          style={{ opacity: accepted ? 1 : 0.5 }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

