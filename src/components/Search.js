import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "./../context/CryptoContext";

const SearchInput = ({ handleSearch }) => {
  // ============ State Variables ============
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  // ======== Search input ctrl function ========
  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  // ======== Search btn ctrl function =========
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  // ======= Function for select a single result =======
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
      {/* ========== Search form ============ */}
      <form
        onSubmit={handleSubmit}
        className="w-96 relative flex items-center ml-7 font-nunito"
      >
        <input
          type="text"
          name="search"
          onChange={handleInput}
          value={searchText}
          placeholder="Search Here..."
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} className="w-full h-auto" alt="search" />
        </button>
      </form>

      {/* =========== Search results =========== */}
      {searchText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  onClick={() => selectCoin(coin.id)}
                  key={coin.id}
                  className="flex items-center ml-4 my-2 cursor-pointer"
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            // =============== Search Loader =============
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

// =============== Search Component ==============
const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  // ========== Function for search delay ===========
  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
