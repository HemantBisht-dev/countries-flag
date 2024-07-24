import { Link } from "react-router-dom";
import { useTheme } from "../Custom Hooks/UseTheme";
import "../App.css";

function CountriesCard({ name, flag, population, region, capital, data }) {
  const [isDark] = useTheme();
  return (
    <>
      <Link className="country-card" to={`/${name}`} state={data}>
        <div className="country-image">
          <img src={flag} />
        </div>
        <div className={`card-text ${isDark ? "dark" : ""}`}>
          <h1 className="card-title">{name}</h1>
          <p>
            <b>Population: </b>
            {population.toLocaleString("en-IN")}
          </p>
          <p>
            <b>Region: </b>
            {region}
          </p>
          <p>
            <b>Capital: </b>
            {capital}
          </p>
        </div>
      </Link>
    </>
  );
}

export default CountriesCard;
