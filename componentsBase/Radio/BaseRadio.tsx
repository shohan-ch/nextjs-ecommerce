import { FormControlLabel, FormGroup, FormLabel, Radio } from "@mui/material";
import React from "react";

type Item = { id: number; name: string };

type Props = {
  title: string;
  items: Item[] | string[] | number[];
  checkedItems: string;
  onChange: (value: string) => void;
};

const BaseRadio = ({ title = "", items, checkedItems, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  console.log(checkedItems, "ck");
  return (
    <>
      <FormLabel className="subHeading">{title}</FormLabel>

      <FormGroup>
        {items.length &&
          items.map((i: any) => {
            let label = i.name ? i.name : i;
            let key = i.id ? i.id : i;
            let selected = checkedItems.includes(String(key));
            return (
              <FormControlLabel
                key={key}
                label={label}
                control={
                  <Radio
                    value={key}
                    size="small"
                    onChange={handleChange}
                    checked={selected}
                  />
                }
              />
            );
          })}
      </FormGroup>
    </>
  );
};

export default BaseRadio;
