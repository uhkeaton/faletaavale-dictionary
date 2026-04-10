import { useEffect, useRef, useState } from "react";
import "./marquee.css";
import cx from "classnames";

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(10);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;

    function update() {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;

      const SPEED = 100; // px per second
      setDuration(width / SPEED);

      // debounce
      if (timeout) window.clearTimeout(timeout);

      // on resize start
      setPlaying(false);
      timeout = window.setTimeout(() => {
        // on resize end
        setPlaying(true);
      }, 300);
    }

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [setPlaying]);

  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden">
      <div
        ref={containerRef}
        className={cx({ visible: playing })}
        style={{
          animationName: "marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: playing ? "running" : "paused",
        }}
      >
        <img src="/bus-sm.png" className="inline-block w-24 night-filter" />
      </div>
    </div>
  );
}
