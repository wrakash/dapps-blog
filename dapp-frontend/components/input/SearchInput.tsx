import React, { useState } from "react";

interface SearchComponentProps {
  query: string[];
  setQuery: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  query,
  setQuery,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setQuery([...query, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveQuery = (index: number) => {
    const updatedQueries = query.filter((_, i) => i !== index);
    setQuery(updatedQueries);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="border border-gray-200 rounded-md p-1 ">
        <div className="flex flex-wrap gap-2">
          {query.map((queryItem, index) => (
            <span
              key={index}
              className="px-2 bg-gray-100 rounded-lg flex items-center space-x-1"
            >
              {queryItem}
              <button
                onClick={() => handleRemoveQuery(index)}
                className="text-red-500 ml-1"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="flex-grow w-full px-2 py-1 focus:outline-none"
            placeholder="Enter search words..."
          />
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (inputValue.trim() !== "") {
                  setQuery([...query, inputValue.trim()]);
                  setInputValue("");
                }
              }}
              className="focus:outline-none rounded-full active:bg-gray-100 active:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
