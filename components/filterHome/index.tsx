import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import filterSearch from "@/utils/filterInvoice";
import SearchIcon from "../../public/search";
import { getData } from "@/utils/service";
import { DataContext } from "@/utils/store/golobalState";

const Filter = ({ state, keySort }: any) => {
  const { dispatch }: any = useContext(DataContext);
  const [keyWord, setKeyWord] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [_ordering, setOrdering] = useState({});
  const router = useRouter();

  const handleOdering = (e: any) => {
    setOrdering(e.target.value);
    filterSearch({ router, ordering: e.target.value });
  };

  const handlePageSize = (e: any) => {
    setCategory(e.target.value);
    filterSearch({ router, pageSize: e.target.value });
  };

  const handleSort = (e: any) => {
    setSortBy(e.target.value);
    filterSearch({ router, sortBy: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, keyword: keyWord.toLocaleLowerCase()});
  }, [keyWord]);

  const handleSearch = () => {
    const convertParams = Object.keys(router?.query).map((key: any) => key + "=" + router?.query[key]).join("&");
    getData(`invoice-service/1.0.0/invoices?${convertParams}`,state?.auth?.token).then((res: any) =>
      dispatch({
        type: "LISTINVOICE",
        payload: res,
      })
    );
  };

  return (
    <div style={{minHeight: '4rem !importent'}} className="input-group row mb-5 mx-4" >
      <div className="input-group-prepend col-md-3 px-0 mb-4">
        <select
          className="select rounded-pill w-75"
          value={category}
          onChange={handlePageSize}
        >
          <option value="all">Page size</option>

          {[10, 20, 30, 40, 50].map((item: any, idx: number) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group-prepend col-md-2 px-0 mb-4">
        <select
          className="select rounded-pill w-75"
          value={sortBy}
          onChange={handleSort}
        >
          <option value="all">Sort By</option>
          {keySort?.map((item: any, idx: number) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group-prepend col-md-3 px-0 w-75 mr-5 mb-4">
        {["ASCENDING", "DESCENDING"]?.map((item: any, idx: number) => (
          <div className="form-check form-check-inline mr-5" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="ordering"
              value={item}
              onChange={handleOdering}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              {item}
            </label>
          </div>
        ))}
      </div>

      <form
        autoComplete="off"
        className="input-group-prepend col-md-3 px-0"
      >
        <input
          type="text"
          className="form-control mr-4 rounded-pill w-100"
          list="title_product"
          value={keyWord.toLowerCase()}
          placeholder="Input keyworks..."
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <div onClick={handleSearch}>
          <SearchIcon />
        </div>
      </form>
    </div>
  );
};

export default Filter;
