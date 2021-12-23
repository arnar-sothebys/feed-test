import React from "react";
import { v4 as uuidv4 } from "uuid";

let outerContainer = {
  height: "300px",
  border: "1px solid pink",
  overflow: "auto",
  flex: 1,
  display: "flex",
  alignItems: "flex-end",
};

let innerContainer = {
  display: "flex",
  flexDirection: "column-reverse",
  overflowY: "auto",
  flex: "1 1 auto",
  height: "100%",
};

function Feed() {
  let [feed, setFeed] = React.useState([]);

  let interval = React.useRef(undefined);

  let stop = React.useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  let scrollEl = React.useRef(null);

  let addEntry = React.useCallback(
    (n) => {
      let preScrollHeight = scrollEl.current?.scrollHeight;
      let preScrollTop = scrollEl.current?.scrollTop;
      setFeed((feed) => [n, ...feed]);
      let postScrollTop = scrollEl.current?.scrollTop;

      // check if we need to manually scroll so user stays on the same location
      if (preScrollTop && postScrollTop && preScrollTop === postScrollTop) {
        let postScrollHeight = scrollEl.current?.scrollHeight;
        let deltaHeight = postScrollHeight - preScrollHeight;

        scrollEl.current.scrollTop = postScrollTop - deltaHeight;
        console.warn("Scrolling by", deltaHeight, "px");
      }
    },
    [setFeed]
  );

  let start = React.useCallback(() => {
    stop();
    interval.current = setInterval(() => {
      addEntry(uuidv4());
    }, 1000);
  }, [stop, addEntry]);

  return (
    <div style={{ position: "relative", width: "400px", marginRight: "10px" }}>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => setFeed([])}>Clear</button>
      <button onClick={() => stop()}>Stop</button>
      <div style={outerContainer}>
        <div
          style={innerContainer}
          ref={(r) => {
            scrollEl.current = r;
          }}
        >
          {/* <div style={{ display: "block", flexGrow: 1 }}></div> */}
          {feed.map((f) => (
            <div key={f}>{f.substring(0, 13)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
