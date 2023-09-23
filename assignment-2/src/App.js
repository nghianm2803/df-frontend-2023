import "./App.css";
import { useTheme } from "../src/theme/ThemeContext";
import MainLayout from "./layouts/MainLayout";

function App() {
  const { isDarkTheme } = useTheme();
  console.log("isDarkTheme:", isDarkTheme);
  return (
    <div className={`App ${isDarkTheme ? "darkTheme" : ""}`}>
      <MainLayout />
    </div>
  );
}

export default App;
