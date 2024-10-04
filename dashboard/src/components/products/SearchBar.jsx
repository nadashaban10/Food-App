import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch, setQuery } from "../../redux/reducers/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearchChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input) {
      dispatch(setQuery(input));
      console.log("Dispatching fetchSearch with input:", input);
      dispatch(fetchSearch(input));
    }
  }, [dispatch, input]);

  console.log("results", results);
  console.log("input", input);

  return (
    <div>
      <label htmlFor="input">Search</label>
      <input
        className="border-1 bg-white p-4 rounded-sm  text-slate-500 outline-none px-3 h-full"
        name="input"
        value={input}
        onChange={handleSearchChange}
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default SearchBar;
