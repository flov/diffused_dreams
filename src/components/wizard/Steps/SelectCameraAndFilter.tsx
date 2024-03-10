import React, { Dispatch, FC, SetStateAction, useState } from "react";
import useWizardNavigation, { Step } from "../useWizardNavigation";
import { Button } from "@nextui-org/react";
import { FiltersCheckboxGroup } from "@/components/form/FiltersCheckboxGroup";
import { SelectCameraDevice } from "@/components/form/SelectCameraDevice";

interface SelectCameraAndFilterProps {
  setFilters: Dispatch<SetStateAction<string[]>>;
  filters: string[];
  selectedDevice: string;
  setSelectedDevice: Dispatch<SetStateAction<string>>;
}

export const SelectCameraAndFilter: FC<SelectCameraAndFilterProps> = ({
  setFilters,
  filters,
  selectedDevice,
  setSelectedDevice,
}) => {
  const { handleNextPage } = useWizardNavigation();

  return (
    <>
      <h2>Select your Camera</h2>
      <SelectCameraDevice
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <h2>Select your AI-Filters</h2>
      <div className="my-4">
        <FiltersCheckboxGroup filters={filters} setFilters={setFilters} />
      </div>

      <div className="w-full flex justify-center">
        <Button
          isDisabled={filters.length === 0}
          color="primary"
          size="lg"
          onClick={() => handleNextPage({ nextPage: "ChooseGender" })}
          className="my-4"
        >
          Next
        </Button>
      </div>
    </>
  );
};
