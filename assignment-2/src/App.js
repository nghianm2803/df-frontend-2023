import "./App.css";
import MainHeader from "./layouts/MainHeader";
import MainFooter from "./layouts/MainFooter";
import MainBody from "./layouts/MainBody";

function App() {
  return (
    <div className="App">
      <MainHeader />
      <MainBody />
      <MainFooter />
    </div>
  );
}

export default App;
