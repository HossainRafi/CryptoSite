import React from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { useRef } from "react";

const Filters = () => {
  let { setCurrency } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  // =========== Currency submit function ===========
  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  return (
    <div className="w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative">
      <Search />

      <div className="flex mr-7">
        <form
          className="relative flex items-center font-nunito mr-12"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2 font-bold"
          >
            currency
          </label>
          <input
            type="text"
            name="currency"
            placeholder="usd"
            ref={currencyRef}
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={submitIcon} alt="submit" className="w-full h-auto" />
          </button>
        </form>
      </div>
      <label>
        <span>sort by:</span>
        <select name="sortby">
          <option value="market_cap_desc">market cap desc</option>
          <option value="market_cap_asc">market cap asc</option>
          <option value="volume_desc">volume desc</option>
          <option value="volume_asc">volume asc</option>
          <option value="id_desc">id desc</option>
          <option value="id_asc">id asc</option>
          <option value="gecko_desc">gecko desc</option>
          <option value="gecko_asc">gecko asc</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
