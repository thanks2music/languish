import { useGlobal, Scale } from "context";
import { clx, objectEntries } from "helpers";
import React from "react";

const metricLabel = "GitHub Pushers";
const metricInfo =
  "Each language's share of the quarter's summed pusher counts. A developer is counted once per language they pushed to (GitHub Innovation Graph).";

const Metric = () => {
  const global = useGlobal();

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
          <span className="yLabelText" title={metricInfo}>
            {global.scale === "log" ? "Log " : ""}
            {metricLabel}
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
