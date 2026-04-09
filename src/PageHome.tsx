import { Link, useLocation } from "react-router";
import { ThemeButton } from "./ThemeButton";
import talo from "/talo-sm.png";
import { IconImportContacts } from "./IconImportContacts";
import { IconSearch } from "./IconSearch";
import { IconInfo } from "./IconInfo";

export function PageHome() {
  const location = useLocation();
  return (
    <div className="bg-(--bg-secondary) min-h-dvh">
      <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
        <div className="flex justify-between w-full">
          <div className="flex p-8 items-center gap-1">
            <img className="w-12" src={talo} />
            <div className="lexend-500 text-5xl">moana</div>
          </div>

          <div className="p-4">
            <ThemeButton />
          </div>
        </div>
        <div className="p-4">
          <div className="p-4 text-(--text-hl) underline text-2xl">
            <Link className="flex gap-2" to={`/search${location.search}`}>
              <IconSearch className="w-8" />
              search
            </Link>
          </div>
          <div className="p-4 text-(--text-hl) underline text-2xl">
            <Link className="flex gap-2" to={`/list${location.search}`}>
              <IconImportContacts className="w-8" />
              list
            </Link>
          </div>
          <div className="p-4 text-(--text-hl) underline text-2xl">
            <Link className="flex gap-2" to={`/info${location.search}`}>
              <IconInfo className="w-8" />
              info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
