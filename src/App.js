import Feed from "./Feed";
import Feed2 from "./Feed2";
import Feed3 from "./Feed3";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ flexDirection: "row", display: "flex" }}>
          <Feed />
          <Feed2 />
          <Feed3 />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
