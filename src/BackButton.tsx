import { Link, useLocation } from "react-router";

export function IconArrowBack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
  );
}

export function BackButton({
  to,
  text,
}: {
  to: "/" | "/search";
  text?: string;
}) {
  const location = useLocation();
  return (
    <Link
      className={
        "cursor-pointer flex-0 opacity-50 hover:opacity-100 flex gap-2 group items-center"
      }
      to={`${to}${location.search}`}
    >
      <IconArrowBack className="w-8" />
      {text && (
        <div className="lexend-500 text-2xl">
          {text}
        </div>
      )}
    </Link>
  );
}
