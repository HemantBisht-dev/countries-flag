function SearchBar({ setInput }) {
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={(e) => setInput(e.target.value.toLowerCase())}
          />
          <button type="submit" className="searchButton">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
