import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
