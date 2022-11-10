import "./config/Reactotron";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Router from "./routes";
import theme from "./styles/theme";
import store from "./store";
import { GlobalStyles } from "./styles";
import { PropsWithChildren } from "react";

function App({ children }: PropsWithChildren<unknown>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
