import { useTheme } from "../Custom Hooks/UseTheme";
import "./ShimmerCardDetails.css";

function ShimmerCardDetails() {
  const [isDark] = useTheme();
  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <div className="back_button"></div>

        <div className="country-details">
          <div className="image-div"></div>
          <div className="details-textContainer">
            {Array.from({ length: 6 }).map((el, i) => (
              <div key={i} className="shimmer-text"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShimmerCardDetails;
