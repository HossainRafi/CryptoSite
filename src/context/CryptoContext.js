import { createContext, useLayoutEffect, useState } from "react";

// ============= Create context object ============
export const CryptoContext = createContext({});

// ============= Create provider component =============
export const CryptoProvider = ({ children }) => {
  // ================ State Variables ====================
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(5);

  // ========== Error State ==========
  const [error, setError] = useState({ data: "", coinData: "", search: "" }); // =========== Can catch THREE (3) errors and send them as prop value ============

  // ================ Get crypto data ===============
  const getCryptoData = async () => {
    setError({ ...error, data: "" });
    setCryptoData();
    setTotalPages(13220);

    try {
      // ============= Fetch data from URL =============
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          let errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });
          throw new Error(errorResponse.error);
        })
        .then((json) => json);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============== Function for get coin data ================
  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // =============== Get search data ================
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  // ============= Function for reset data =============
  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData,
        error,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
