import { useEffect, useState } from "react";
import CountriesCard from "./CountriesCard";
import ShimmerCountriesList from "./ShimmerCountriesList";

function CountriesList({ input }) {
  const [data, setData] = useState([]);
  console.log(data);
  console.log(input);

  async function getApiData() {
    let response = await fetch(" https://restcountries.com/v3.1/all ");
    response = await response.json();

    setData(response);
  }
  console.log(data);

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {!data.length ? (
        <ShimmerCountriesList />
      ) : (
        <div className="country_container">
          {data
            .filter(
              (country) =>
                country.name.common.toLowerCase().includes(input) ||
                country.region.includes(input)
            )
            .map((country, index) => {
              return (
                <CountriesCard
                  key={index}
                  name={country.name.common}
                  flag={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  data={country}
                />
              );
            })}
        </div>
      )}
    </>
  );
}

export default CountriesList;
