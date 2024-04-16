import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrivacyPolicyPage from "./Steps/PrivacyPolicy";
import { SelectWorkflow } from "../form/SelectWorkflow";

export type Step =
  | "CaptureWithCamera"
  | "ChooseCampaign"
  | "ChooseGender"
  | "GenerateImage"
  | "SelectCameraAndCapture"
  | "SelectCameraAndFilter"
  | "SelectCameraOrFile"
  | "SelectCampaign"
  | "SelectFile"
  | "SelectGender"
  | "SelectSingleOrTwoPersons"
  | "PrivacyPolicy";

const useWizardNavigation = () => {
  const wizardSteps = {
    CaptureWithCamera: 3,
    ChooseCampaign: 4,
    ChooseGender: 3,
    GenerateImage: 6,
    SelectCameraAndCapture: 3,
    SelectCameraAndFilter: 2,
    SelectCameraOrFile: 2,
    SelectCampaign: 5,
    SelectFile: 3,
    SelectGender: 4,
    PrivacyPolicy: 0,
    SelectSingleOrTwoPersons: 1,
  };

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleNextPage = ({
    nextPage,
    lastPage,
  }: {
    nextPage: Step;
    lastPage?: Step;
  }) => {
    const nextStep = wizardSteps[nextPage];
    const params = new URLSearchParams(searchParams);
    params.set("step", String(nextStep));
    params.set("name", nextPage);
    if (lastPage) params.set("back", lastPage);
    replace(`${pathname}?${params.toString()}`);
  };

  return { handleNextPage };
};

export default useWizardNavigation;
