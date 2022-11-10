import "./config/Reactotron";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import store from "./store";
import { GlobalStyles } from "./styles";
import { PropsWithChildren } from "react";

function App({ children }: PropsWithChildren<unknown>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
