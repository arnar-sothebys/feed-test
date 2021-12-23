import React from "react";
import { v4 as uuidv4 } from "uuid";

let outerContainer = {
  height: "300px",
  border: "1px solid pink",
  overflow: "auto",
};

let innerContainer = {
  overflowY: "auto",
  flex: "1 1 auto",
  height: "100%",
};

function Feed2() {
  let [feed, setFeed] = React.useState([]);

  let interval = React.useRef(undefined);

  let stop = React.useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  let start = React.useCallback(() => {
    stop();
    interval.current = setInterval(() => {
      let n = uuidv4();
      setFeed((feed) => [...feed, n]);
    }, 1000);
  }, [stop]);

  let innerEl: React.MutableRefObject<HTMLDivElement> = React.useRef(null);

  let [showHint, setShowHint] = React.useState(false);
  let scrollToBottom = React.useCallback(
    (_) => {
      if (innerEl.current) {
        innerEl.current.scrollTop = innerEl.current.scrollHeight;
        setShowHint(false);
      }
    },
    [setShowHint]
  );

  React.useEffect(() => {
    if (innerEl.current) {
      innerEl.current.addEventListener("DOMNodeInserted", (event) => {
        let scrollEl = event.currentTarget;
        // check if scroll position is near the bottom.
        let margin = event.target.clientHeight - 10;
        if (
          scrollEl.scrollHeight - scrollEl.scrollTop <=
          scrollEl.clientHeight + event.target.clientHeight + margin
        ) {
          let newEl = event.target;
          newEl.scrollIntoView();
          setShowHint(false);
        } else {
          setShowHint(true);
        }
      });
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "400px" }}>
      {showHint ? (
        <button onClick={scrollToBottom}>Scroll to bottom</button>
      ) : null}
      <button onClick={() => start()}>Start</button>
      <button onClick={() => setFeed([])}>Clear</button>
      <button onClick={() => stop()}>Stop</button>
      <div style={outerContainer}>
        <div
          style={innerContainer}
          ref={(r) => {
            innerEl.current = r;
          }}
        >
          {feed.map((f) => (
            <div key={f}>{f.substring(0, 13)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed2;
