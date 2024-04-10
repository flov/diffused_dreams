import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrivacyPolicyPage from "./Steps/PrivacyPolicy";

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
  | "PrivacyPolicy";

const useWizardNavigation = () => {
  const wizardSteps = {
    CaptureWithCamera: 2,
    ChooseCampaign: 3,
    ChooseGender: 2,
    GenerateImage: 5,
    SelectCameraAndCapture: 2,
    SelectCameraAndFilter: 1,
    SelectCameraOrFile: 1,
    SelectCampaign: 4,
    SelectFile: 2,
    SelectGender: 3,
    PrivacyPolicy: 0,
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
