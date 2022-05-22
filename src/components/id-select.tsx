import { Raw } from "../types";
import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface IDSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认
 * 当选择默认类型时，onChange会回调undefined
 * @constructor
 * @param props
 */
export const IDSelect = (props: IDSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
const toNumber = (val: unknown) => (isNaN(Number(val)) ? 0 : Number(val));
