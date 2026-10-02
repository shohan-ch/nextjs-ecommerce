import BaseCheckbox from "@/componentsBase/Checkbox/BaseCheckbox";
import BaseColorRadio from "@/componentsBase/Radio/BaseColorRadio";
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
};

type Props = {
  data: {
    categories: any[];
    sizes: any[];
    colors: any[];
  };
  filterData: IFilter;
  setFilterData: React.Dispatch<React.SetStateAction<IFilter>>;
};

const FilterOptionList = ({ data, filterData, setFilterData }: Props) => {
  const handleCheckboxChange =
    (field: CheckBoxFieldKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (e.target.checked && !filterData[field].includes(value)) {
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
        <BaseSizeRadio
          title="Size"
          items={data.sizes}
          onChange={(size: string) =>
            setFilterData((prev) => ({ ...prev, size: size }))
          }
          checkedItem={filterData.size}
        />
      </Box>
      <Box className="pt-6">
        <BaseColorRadio
          title="Color"
          items={data.colors}
          onChange={(color: string) =>
            setFilterData((prev) => ({ ...prev, colorId: color }))
          }
          checkedItem={filterData.colorId}
        />
      </Box>
    </>
  );
};

export default FilterOptionList;
