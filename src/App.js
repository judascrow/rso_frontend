import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import Routes from "./routing/Routes";
import store from "./store/store";
import { loadUser } from "./store/actions/auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#1e88e5",
      dark: "#1565c0",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#388e3c",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: ["Roboto", "Sarabun", "sans-serif"].join(",")
  }
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route component={Routes} />
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
