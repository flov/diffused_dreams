import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Step =
  | "SelectCameraOrFile"
  | "SelectCamera"
  | "SelectFile"
  | "SelectGender"
  | "SelectCampaign"
  | "GenerateImage";

const useWizardNavigation = () => {
  const wizardSteps = {
    SelectCameraOrFile: 1,
    SelectCamera: 2,
    SelectFile: 2,
    SelectGender: 3,
    SelectCampaign: 4,
    GenerateImage: 5,
  };

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleNextPage = (nextPage: Step) => {
    const nextStep = wizardSteps[nextPage];
    const params = new URLSearchParams(searchParams);
    params.set("step", String(nextStep));
    params.set("name", nextPage);
    replace(`${pathname}?${params.toString()}`);
  };

  return { handleNextPage };
};

export default useWizardNavigation;
