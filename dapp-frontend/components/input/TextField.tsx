import React, { ChangeEventHandler } from "react";

interface TextFieldProps {
  placeholder?: string;
  type?: string;
  value: string;
  children?: any;
  name?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  class?: string;
}

export function TextField({ children, ...rest }: TextFieldProps) {
  return (
    <div className="w-full space-y-1">
      {children}
      <input
        className={` ${rest.class}`}
        {...rest}
      />
    </div>
  );
}
