import ReactDOM from "react-dom/client";
import Routes from "./routes";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <App>
    <Routes />
  </App>
);
