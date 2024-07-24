import SearchBar from "./SearchBar";
import CountriesList from "./CountriesList";
import { useTheme } from "../Custom Hooks/UseTheme";
import { useState } from "react";
import Dropdown from "./Dropdown";

function Home() {
  const [input, setInput] = useState("");
  const [isDark] = useTheme();

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search_container">
        <div className="search_wrapper">
          <SearchBar setInput={setInput} />
          <Dropdown setInput={setInput} />
        </div>
      </div>

      <CountriesList input={input} />
    </main>
  );
}

export default Home;
