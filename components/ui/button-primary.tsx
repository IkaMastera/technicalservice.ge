export function ButtonPrimary({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button-primary ${className}`} {...rest}>
      {children}
    </button>
  );
}