import cx from "classnames";

export function StyledButton({
  onClick,
  children,
  size,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  size?: "sm";
}) {
  return (
    <button
      className={cx(
        "rounded-full relative flex justify-center items-center cursor-pointer",
        {
          "max-w-12 min-w-12 min-h-12 max-h-12": size != "sm",
          "max-w-10 min-w-10 min-h-10 max-h-10": size == "sm",
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
