import BaseCheckbox from "@/componentsBase/Checkbox/BaseCheckbox";
import BaseColorRadio from "@/componentsBase/Radio/BaseColorRadio";
import BaseRadio from "@/componentsBase/Radio/BaseRadio";
import BaseSizeRadio from "@/componentsBase/Radio/BaseSizeRadio";
import BaseRangeSlider from "@/componentsBase/RangeSlider/BaseRangeSlider";
import { Box } from "@mui/material";
import React from "react";

type CheckBoxFieldKeys = "categoryIds" | "brandIds";

export type IFilter = {
  categoryIds: string[];
  brandIds: string[];
  priceRange: number[];
  size: string;
  colorId: string;
  sortBy: string;
  gender: string;
};

type Props = {
  data: {
    categories: any[];
    sizes: any[];
    colors: any[];
    genders: any[];
  };
  filterData: IFilter;
  setFilterData: React.Dispatch<React.SetStateAction<IFilter>>;
};

const FilterOptionList = ({ data, filterData, setFilterData }: Props) => {
  const handleCheckboxChange =
    (field: CheckBoxFieldKeys) => (value: string, isChecked: boolean) => {
      if (isChecked && !filterData[field].includes(value)) {
        setFilterData((prev) => ({
          ...prev,
          [field]: [...prev[field], value],
        }));
      } else {
        const filterUnchecked = filterData[field].filter((f) => f !== value);
        setFilterData((prev) => ({ ...prev, [field]: filterUnchecked }));
      }
    };

  const handelRangeChange = (e: Event, newValue: number[]) => {
    setFilterData((prev) => ({ ...prev, priceRange: newValue }));
  };

  return (
    <>
      <BaseCheckbox
        items={data.categories}
        title="Category"
        handleChange={handleCheckboxChange("categoryIds")}
        checkedItems={filterData.categoryIds}
      />
      <Box className="pr-4 pt-6">
        <BaseRangeSlider
          values={filterData.priceRange}
          handleChange={handelRangeChange}
        />
      </Box>

      <Box className="pt-6">
        <BaseRadio
          items={data.genders}
          title="Gender"
          checkedItems={filterData.gender}
          onChange={(value: string) =>
            setFilterData((prev) => ({ ...prev, gender: value }))
          }
        />
      </Box>
      <Box className="pt-6">
        <BaseSizeRadio
          title="Size"
          items={data.sizes}
          onChange={(value: string) =>
            setFilterData((prev) => ({ ...prev, size: value }))
          }
          checkedItem={filterData.size}
        />
      </Box>

      <Box className="pt-6">
        <BaseColorRadio
          title="Color"
          items={data.colors}
          onChange={(value: string) =>
            setFilterData((prev) => ({ ...prev, colorId: value }))
          }
          checkedItem={filterData.colorId}
        />
      </Box>
    </>
  );
};

export default FilterOptionList;
