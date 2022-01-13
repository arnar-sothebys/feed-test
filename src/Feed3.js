import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Feed3.css";

let entry = {
  position: "relative",
};

function Feed3() {
  let [feed, setFeed] = React.useState([]);
  let [translateY, setTranslateY] = React.useState(0);

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
      console.table(
        preScrollHeight,
        preScrollTop,
        scrollEl.current?.clientHeight,
        preScrollHeight - preScrollTop
      );
      if (preScrollHeight - preScrollTop <= scrollEl.current?.clientHeight) {
        scrollEl.current?.classList.add("anim");
      }
      setFeed((feed) => [n, ...feed]);
      let postScrollTop = scrollEl.current?.scrollTop;

      // check if we need to manually scroll so user stays on the same location
      if (preScrollTop && postScrollTop && preScrollTop === postScrollTop) {
        let postScrollHeight = scrollEl.current?.scrollHeight;
        let deltaHeight = postScrollHeight - preScrollHeight;

        scrollEl.current.scrollTop = postScrollTop - deltaHeight;
        console.warn("Scrolling by", deltaHeight, "px");
      }
      scrollEl?.current.addEventListener("animationend", () => {
        scrollEl?.current.classList.remove("anim");
      });

      return () => {
        scrollEl.current?.removeEventListener("animationend");
      };
    },
    [setFeed]
  );

  let start = React.useCallback(() => {
    stop();
    interval.current = setInterval(() => {
      addEntry(uuidv4());
    }, 800);
  }, [stop, addEntry]);

  React.useEffect(() => {
    if (scrollEl.current) {
      scrollEl.current.addEventListener("DOMNodeInserted", (event) => {
        let scrollEl = event.currentTarget;
        // check if scroll position is near the bottom.
        let margin = event.target.clientHeight - 10;
        if (
          scrollEl.scrollHeight - scrollEl.scrollTop <=
          scrollEl.clientHeight + event.target.clientHeight + margin
        ) {
          // setTranslateY(25);
          // setTimeout(() => {
          //   setTranslateY(0);
          // }, 50);
        } else {
        }
      });
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "400px", marginRight: "10px" }}>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => setFeed([])}>Clear</button>
      <button onClick={() => stop()}>Stop</button>
      <div className="feedList">
        <div className="outerContainer" style={{ height: feed.length * 23 }}>
          <div
            className="innerContainer"
            style={{ transform: `translateY(${translateY}px)` }}
            ref={(r) => {
              scrollEl.current = r;
            }}
          >
            {/* <div style={{ display: "block", flexGrow: 1 }}></div> */}
            {feed.map((f) => (
              <div key={f} style={entry}>
                {f.substring(0, 13)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed3;
