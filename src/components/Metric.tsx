import { useGlobal, Scale } from "context";
import { clx, objectEntries } from "helpers";
import { Metrics } from "parsedData";
import React from "react";

type MetricItem = {
  info?: string;
  label: string;
};

const Metric = () => {
  const global = useGlobal();

  const items: { [k in keyof Metrics]: MetricItem } = {
    pushers: {
      label: "GitHub Pushers",
      info: "Each language's share of the quarter's summed pusher counts. A developer is counted once per language they pushed to (GitHub Innovation Graph).",
    },
  };

  // map of available scales to human readable strings
  const scales: { [k in Scale]: string } = {
    linear: "Linear",
    log: "Log",
  };

  return (
    <>
      <div className="yAxis">
        <div
          className="yLabel interactive"
          title="Change y axis options"
          onClick={global.toggleMetricsAreExpanded}
        >
          <span className="yLabelArrow"></span>{" "}
          <span className="yLabelText" title={items[global.metric].info}>
            {global.scale === "log" ? "Log " : ""}
            {items[global.metric].label}
          </span>{" "}
          <span className="yLabelArrow"></span>
        </div>
      </div>
      <div className="yOptions">
        <div className="yOptionsBox">
          <h3>Scale</h3>
          <ul className="yScaleList">
            {objectEntries(scales).map(([real, display]) => (
              <li
                onClick={() => global.changeScale(real)}
                className={clx(
                  "interactive",
                  real,
                  global.scale === real && "active"
                )}
              >
                {display}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Metric;
