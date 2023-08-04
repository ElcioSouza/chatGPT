import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  className?: string;
}

export function Button({ children, className, variant, ...rest }: ButtonProps) {
  const buttonStyle = {
    primary: "bg-primary",
    secondary: "bg-secondary",
  }[variant];

  return (
    <button
      className={classNames(
        `${buttonStyle} disabled:opacity-50 flex sm:text-xl text-base items-center hover:opacity-80 transition-opacity justify-center px-5 py-2 text-white font-semibold rounded-[11px]`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
