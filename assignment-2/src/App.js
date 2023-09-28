import "./App.css";
import { useTheme } from "../src/theme/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import appTheme from "classnames";

function App() {
  const { isDarkTheme } = useTheme();
  return (
    <div className={appTheme("App", { darkTheme: isDarkTheme })}>
      <MainLayout />
    </div>
  );
}

export default App;
