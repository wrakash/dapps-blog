import React, { ChangeEventHandler } from "react";

interface TextFieldProps {
  placeholder?: string;
  type?: string;
  value: string;
  children?: any;
  name?: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>; // Use HTMLTextAreaElement here
}

export function TextArea({ children, ...rest }: TextFieldProps) {
 
  return (
    <div className={"w-full space-y-1"}>
      {children}
      <textarea
        className={`${rest.className}`}
        {...rest}
      />
    </div>
  );
}
