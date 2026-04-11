export function Plants({
  show,
}: {
  show: (
    | "maia-bg"
    | "maia-fg"
    | "ginger-bg"
    | "ginger-fg"
    | "plant-fg"
    | "plant-bg"
    | "palm-bg"
  )[];
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden pointer-events-none">
      <div className="max-w-3xl m-auto flex justify-between items-end">
        {/* Left Side */}
        <div className="flex items-end pl-2">
          {show.includes("maia-fg") && (
            <img
              src="/maia-1.png"
              className="night-filter inline-block w-24 ml-2"
            />
          )}
          {show.includes("maia-bg") && (
            <img
              src="/maia-1.png"
              className="night-filter inline-block w-14 ml-24"
            />
          )}
        </div>
        {/* Right Side */}
        <div className="flex items-end pr-28">
          {show.includes("ginger-fg") && (
            <>
              <img
                src="/ginger-1.png"
                className="night-filter inline-block w-4 mr-3 -scale-x-100"
              />
              <img
                src="/ginger-1.png"
                className="night-filter inline-block w-3 mr-1"
              />
            </>
          )}
          {show.includes("ginger-bg") && (
            <>
              <img
                src="/ginger-1.png"
                className="night-filter inline-block w-6 mr-2 -scale-x-100"
              />
              <img
                src="/ginger-1.png"
                className="night-filter inline-block w-5 mr-4"
              />
            </>
          )}
          {show.includes("plant-fg") && (
            <>
              <img
                src="/plant-1.png"
                className="night-filter inline-block w-24 mr-30 -scale-x-100"
              />
              <img
                src="/plant-1.png"
                className="night-filter inline-block w-24  translate-y-4 translate-x-0"
              />

              {/* <img
                src="/plant-1.png"
                className="night-filter inline-block w-26 -mr-12 -scale-x-100 translate-y-8"
              /> */}
            </>
          )}
          {show.includes("plant-bg") && (
            <>
              {/* <img
                src="/plant-1.png"
                className="night-filter inline-block w-36 -mr-6 -scale-x-100 translate-y-7"
              /> */}

              <img
                src="/plant-2.png"
                className="night-filter inline-block w-30 mr-30  -scale-x-100"
              />
            </>
          )}
          {show.includes("palm-bg") && (
            <>
              {/* <img
                src="/plant-1.png"
                className="night-filter inline-block w-36 -mr-6 -scale-x-100 translate-y-7"
              /> */}

              <img
                src="/palm-1.png"
                className="night-filter inline-block w-24 translate-x-24"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


