import "../App.css";
import { useTheme } from "../Custom Hooks/UseTheme";
function Header() {
  const [isDark, setIsDark] = useTheme();
  return (
    <>
      <header className={`container ${isDark ? "dark" : ""}`}>
        <div className="wrapper">
          <div className="left">
            <h2>Where in the world?</h2>
          </div>

          {/* using local storage for storing dark so during page refresh it won't change back to light mode */}
          <div
            className="right"
            onClick={() => {
              setIsDark(!isDark);
              localStorage.setItem("isDarkMode", !isDark);
            }}
          >
            <span className="material-symbols-outlined icon">{`${
              isDark ? "light" : "dark"
            }_mode`}</span>
            <p className="icon_name">{`${
              isDark ? "Light Mode" : "Dark Mode"
            }`}</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
