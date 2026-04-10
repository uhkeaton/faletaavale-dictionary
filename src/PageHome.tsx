import { Link, useLocation } from "react-router";
import { ThemeButton } from "./ThemeButton";
import { IconImportContacts } from "./IconImportContacts";
import { IconSearch } from "./IconSearch";
import { IconInfo } from "./IconInfo";
import { Hero } from "./Hero";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";
import { Plants } from "./Plants";

export function PageHome() {
  const location = useLocation();
  return (
    <Hero>
      <div className="min-h-dvh">
        <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
          <div className="flex justify-between w-full">
            <div className="flex p-8 items-center gap-1">
              <Logo />
              {/* <img className="w-12" src={talo} /> */}
              {/* <img className="w-24" src={bus} /> */}
              {/* <div className="lexend-500 text-4xl">faletaavale</div> */}
            </div>

            <div className="p-4">
              <ThemeButton />
            </div>
          </div>
          <div className="p-4">
            <Link
              className="rounded cursor-pointer hover:bg-neutral-300/20 p-4 text-(--text-hl) underline text-2xl flex gap-2"
              to={`/search${location.search}`}
            >
              <IconSearch className="w-8" />
              search
            </Link>
            <Link
              className="rounded cursor-pointer hover:bg-neutral-300/20 p-4 text-(--text-hl) underline text-2xl flex gap-2"
              to={`/list${location.search}`}
            >
              <IconImportContacts className="w-8" />
              list
            </Link>
            <Link
              className="rounded cursor-pointer hover:bg-neutral-300/20 p-4 text-(--text-hl) underline text-2xl flex gap-2"
              to={`/info${location.search}`}
            >
              <IconInfo className="w-8" />
              info
            </Link>
          </div>
        </div>
      </div>
      <Plants show={["palm-bg"]} />
      <Plants show={["plant-bg"]} />
      <Plants show={["maia-bg", "ginger-bg"]} />
      <Marquee />
      <Plants show={["maia-fg", "ginger-fg"]} />
      <Plants show={["plant-fg"]} />
    </Hero>
  );
}
