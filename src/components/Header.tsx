import { useGlobal } from "context";
import { dates } from "parsedData";
import React, { useState } from "react";
import "styles/Header.css";

// Innovation Graph publishes a quarter about four months after it ends, so the
// newest quarter is normally under seven months old. Past this, an update was
// probably missed (for example, the scheduled workflow was disabled).
const staleAfterMonths = 9;
const latestQuarter = dates[dates.length - 1];

function monthsSinceQuarterEnd(quarter: string, now: Date): number {
  const [year, q] = quarter.split("Q").map(Number);
  // Month index right after the quarter ends (Q4 rolls into next January).
  const endMonth = year * 12 + q * 3;
  return now.getUTCFullYear() * 12 + now.getUTCMonth() - endMonth;
}

const isStale =
  monthsSinceQuarterEnd(latestQuarter, new Date()) >= staleAfterMonths;

const Header = () => {
  const global = useGlobal();
  const [showMessage, setShowMessage] = useState(false);

  const copyLink = () => {
    const params = new URLSearchParams();
    const names = [...global.selectedLangs].map((name) => name.toLowerCase());
    if (global.scale !== "linear") {
      params.append("yscale", global.scale);
    }
    params.append("names", names.join(","));

    const url = new URL(window.location.href);
    url.hash = String(params);
    window.location.hash = url.hash;

    // using legacy way of copying because safari doesnt implement the new one
    var textarea = document.createElement("textarea");
    textarea.textContent = String(url);
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  };

  return (
    <div className="header">
      <div>
        <a
          href="https://github.com/thanks2music/languish"
          className="github-corner"
          title="View source and project info"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 250 250"
            fill="#fff"
            color="#333"
            style={{
              position: "absolute",
              top: 0,
              border: 0,
              left: 0,
              transform: "scale(-1, 1)",
            }}
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style={{ transformOrigin: "130px 106px" }}
              className="octo-arm"
            ></path>
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            ></path>
          </svg>
        </a>
      </div>
      <h1>
        <a href=".">Languish</a>
      </h1>
      <h2>
        <div title="Developers pushing to repositories in each language, from GitHub Innovation Graph">
          Programming Language Trends
        </div>
        <div>
          Fork of{" "}
          <a href="https://github.com/tjpalmer/languish">
            Languish by tjpalmer
          </a>{" "}
          · data:{" "}
          <a href="https://github.com/github/innovationgraph">
            GitHub Innovation Graph
          </a>{" "}
          (through {latestQuarter})
          {isStale && (
            <span
              className="stale"
              title="Newer quarters may be available. The scheduled data update may have stopped."
            >
              {" "}
              · may be out of date
            </span>
          )}
        </div>
      </h2>
      <div className="spread"></div>
      {showMessage && <div>Copied!</div>}
      <div className="linkBox">
        <a
          className="icolink link"
          href="."
          onClick={(e) => {
            e.preventDefault();
            copyLink();
          }}
          title="Permalink selections"
        >
          <span className="icon-link-2"></span>
        </a>
      </div>
    </div>
  );
};

export default Header;
