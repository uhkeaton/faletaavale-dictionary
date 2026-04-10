import logoLight from "/faletaavale-light.svg";
import logoDark from "/faletaavale-dark.svg";

export function Logo() {
  return (
    <>
      <img
        style={{ width: 300 }}
        className="visible-light mb-2 w-40 pointer-events-none"
        src={logoLight}
      />
      <img
        style={{ width: 300 }}
        className="visible-dark mb-2 w-40 pointer-events-none"
        src={logoDark}
      />
    </>
  );
}
