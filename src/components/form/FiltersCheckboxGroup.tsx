import React, { Dispatch, FC, SetStateAction } from "react";
import { CheckboxGroup, cn } from "@nextui-org/react";
import { prompts } from "@/config/prompts";
import { FilterCheckbox } from "./FilterCheckbox";

interface FiltersCheckboxGroupProps {
  setFilters: Dispatch<SetStateAction<string[]>>;
  filters: any;
}

export const FiltersCheckboxGroup: FC<FiltersCheckboxGroupProps> = ({
  filters,
  setFilters,
}) => {
  return (
    <CheckboxGroup
      label="Select filters"
      value={filters}
      // @ts-ignore
      onChange={setFilters}
      classNames={{
        wrapper: cn("grid gap-4 mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3"),
      }}
    >
      {prompts("man").map((prompt) => (
        <FilterCheckbox
          key={prompt.label}
          image={prompt.image}
          prompt={prompt.label}
        />
      ))}
    </CheckboxGroup>
  );
};
