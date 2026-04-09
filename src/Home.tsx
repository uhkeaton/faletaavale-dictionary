import { Link } from "react-router";
import { ThemeButton } from "./ThemeButton";

export function Home() {
  return (
    <div className="flex justify-between w-full">
      <div className="p-4 text-blue-500 underline">
        <Link to="/search">/search</Link>
      </div>
      <div className="p-4">
        <ThemeButton />
      </div>
    </div>
  );
}
