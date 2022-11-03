import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

declare global {
  interface Console {
    tron: any;
  }
}

if (process.env.NODE_ENV === "development") {
  const tron = Reactotron.configure({
    name: "Star Library",
    host: "127.0.0.1",
    port: 10000,
  })
    .use(reactotronRedux())
    .connect();

  if (tron.clear) {
    tron.clear();
  }

  // eslint-disable-next-line no-console
  console.tron = tron;
}
