import React from "react";
import IconButton from "@mui/material/IconButton";
import { WbSunny, DarkMode } from "@mui/icons-material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css"; // Import your CSS file here
import {
  CustomThemeProvider,
  useThemeContext,
} from "./components/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigation from "./pages/Navigation";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

// console.log(process.env.REACT_APP_BACKEND_URL);
// console.log(process.env.REACT_APP_FILE_BACKEND_URL);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CustomThemeProvider>
          <QueryClientProvider client={queryClient}>
            <MainComponent />
            <ToastContainer />
          </QueryClientProvider>
        </CustomThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

const MainComponent: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <div className="App">
      <Navigation />
      <SwitchTransition>
        <CSSTransition key={mode} classNames="icon" timeout={300}>
          <IconButton
            className="toggle-button"
            color="primary"
            onClick={toggleTheme}
            sx={{
              backgroundColor: "#222",
              ":hover": {
                backgroundColor: "#333",
              },
            }}
          >
            {mode === "light" ? (
              <WbSunny fontSize="large" />
            ) : (
              <DarkMode fontSize="large" />
            )}
          </IconButton>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default App;
