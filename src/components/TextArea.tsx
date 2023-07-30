import React from "react";
import classNames from "classnames";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  name: string;
  className?: string;
}

export default function TextArea({
  name,
  register,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={classNames(
        "w-full h-auto resize-none pt-4 border focus:outline-none text-gray-200 border-primary rounded-lg pl-3 pr-5",
        className
      )}
      {...register(name)}
      {...rest}
    />
  );
}
