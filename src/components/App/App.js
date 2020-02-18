import React, { useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import moment from "moment";
import { useDebounce } from "use-debounce";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";
import { Header } from "./../Header";
import { Search } from "./../Search";
import { Licenses } from "./../Licenses";
import { Pagination } from "./../Pagination";

import "./App.css";

const PER_PAGE = 20;

const BASE_URL = "https://api.github.com/search/repositories";

const initialState = {
  data: [],
  isLoading: false,
  hasError: false,
  nameSearch: "",
  license: {},
  currentPage: 1,
  total: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_PENDING":
      return {
        ...state,
        isLoading: true,
        hasError: false,
        data: [],
        total: 0
      };
    case "FETCH_DATA_SUCCESS":
      const { data, total } = action.payload;
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data,
        total
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        isLoading: false,
        hasError: true,
        data: [],
        total: 0
      };
    case "SET_CURRENT_PAGE":
      const { currentPage } = action.payload;
      return {
        ...state,
        currentPage
      };
    case "SET_NAME_SEARCH":
      const { nameSearch } = action.payload;
      return {
        ...state,
        nameSearch,
        currentPage: 1
      };
    case "SET_lICENSE":
      const { license } = action.payload;
      return {
        ...state,
        license,
        currentPage: 1
      };
    default:
      throw new Error();
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    data,
    isLoading,
    hasError,
    nameSearch,
    license,
    currentPage,
    total
  } = state;
  const [debouncedNameSearch] = useDebounce(nameSearch, 500);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_DATA_PENDING" });

    try {
      const prevMonth = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");

      const licenseKey = (license && license.key) || "";

      const url = `${BASE_URL}?q=${debouncedNameSearch}+in:name+language:javascript+created:>=${prevMonth}${
        licenseKey ? `+license:${licenseKey}` : ""
      }&sort=stars&order=desc&page=${currentPage}&per_page=${PER_PAGE}`;

      const response = await axios(url);
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: {
          data: response.data.items,
          total: response.data.total_count
        }
      });
    } catch (error) {
      dispatch({
        type: "FETCH_DATA_ERROR"
      });
    }
  }, [license, debouncedNameSearch, currentPage]);

  useEffect(() => {
    fetchData();
  }, [license, debouncedNameSearch, currentPage, fetchData]);

  const handleLicenseChange = value => {
    dispatch({
      type: "SET_lICENSE",
      payload: {
        license: value
      }
    });
  };

  const handleNameSearchChange = value => {
    dispatch({
      type: "SET_NAME_SEARCH",
      payload: {
        nameSearch: value
      }
    });
  };

  const handlePageChange = value => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: {
        currentPage: value
      }
    });
  };

  return (
    <Layout>
      <Header>
        <Search
          handleNameSearchChange={handleNameSearchChange}
          nameSearch={nameSearch}
        />
        <Licenses license={license} handleLicenseChange={handleLicenseChange} />
      </Header>

      <main>
        {hasError && <div>Что-то пошло не так...</div>}

        {isLoading && <Loader />}

        {data && !isLoading && !hasError && (
          <>
            <List data={data} />
            <Pagination
              currentPage={currentPage}
              total={total}
              itemsPerPage={PER_PAGE}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </Layout>
  );
};
