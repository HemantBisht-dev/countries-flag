import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CardDetails.css";
import ShimmerCardDetails from "./ShimmerCardDetails";
import { useTheme } from "../Custom Hooks/UseTheme";

function CardDetails() {
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isDark] = useTheme();

  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;

  async function updateCountryData(data) {
    setCountryData({
      flag: data.flags.svg,
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      topleveldomain: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(","),
      languages: Object.values(data.languages || {}).join(","),
      borders: [],
    });

    if (data.borders) {
      const borderNames = await Promise.all(
        data.borders.map(async (border) => {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}`
          );
          const [borderCountry] = await response.json();
          return borderCountry.name.common;
        })
      );
      setTimeout(() =>
        setCountryData((prev) => ({ ...prev, borders: borderNames }))
      );
    }
  }

  async function getAPIData() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const [data] = await response.json();

      const countryDetails = {
        flag: data.flags.svg,
        name: data.name.common || data.name,
        nativeName: Object.values(data.name.nativeName || {})[0]?.common,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        topleveldomain: data.tld,
        currencies: Object.values(data.currencies || {})
          .map((currency) => currency.name)
          .join(","),
        languages: Object.values(data.languages || {}).join(","),
        borders: [],
      };

      if (data.borders) {
        const borderNames = await Promise.all(
          data.borders.map(async (border) => {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${border}`
            );
            const [borderCountry] = await response.json();
            return borderCountry.name.common;
          })
        );
        countryDetails.borders = borderNames;
      }

      setCountryData(countryDetails);
    } catch (error) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }

    getAPIData();
  }, [countryName]);

  if (notFound) {
    return <div>Country Not Found</div>;
  }

  return countryData === null ? (
    <ShimmerCardDetails />
  ) : (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        <div className="country-details">
          <img src={countryData.flag} alt="flag_image" />

          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>
                  Native Name: {countryData.nativeName || countryData.name}{" "}
                </b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>Population: {countryData.population}</b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region} </b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.topleveldomain}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>

            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link
                    className={`${isDark ? "dark" : ""}`}
                    key={border}
                    to={`/${border}`}
                  >
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CardDetails;
