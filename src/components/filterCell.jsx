import React, { useState, useRef } from "react";
import style from "./item/productTable.module.scss";
import SearchIcon from "../icons/searchIcon";
import CloseIcon from "../icons/closeIcon";

const FilterCell = ({
  label,
  title,
  type,
  inputData,
  setInputData,
  searchHandler,
  handleKeyDown,
  option,
  inputError,
  setInputError
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  return (
    <div className={style.product_cell}>
      <div>
        <div style={{ display: "flex", gap: "4px" }}>
          {title}
          {showSearch ? (
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => setShowSearch(false)}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                Скрыть поиск
              </span>
            </button>
          ) : (
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => {
                setShowSearch(true);
                focusInput();
              }}
            >
              <SearchIcon />
            </button>
          )}
        </div>
      </div>
      {showSearch && (
        <>
       
        <div className={inputError[label] || (inputError.product === true && label === 'name') ? style.inputWrapperError :  style.inputWrapper}>
          <input
            type={type}
            ref={inputRef}
            placeholder={`Введите ${title === "Цена" ? "только числа" : title.toLowerCase()} для фильтрации`}
            value={inputData[label.toLowerCase()]}
            onSubmit={() => searchHandler(option)}
            onKeyDown={(e) => handleKeyDown(option, e)}
            onChange={(e) =>
              setInputData((prev) => ({
                ...prev,
                [label.toLowerCase()]: e.target.value,
              }))
            }
          />
          
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => {
                setInputData((prev) => ({
                  ...prev,
                  [label.toLowerCase()]: "",
                }));
                inputRef.current?.focus();
                setInputError((prev) => ({
                  product: false,
                  price: false,
                  brand: false,
                }))
              }}
            >
              <CloseIcon />
            </button>

            <button
              style={{ border: "none", cursor: "pointer", borderRadius: "50%" }}
              onClick={() => searchHandler(option)}
            >
              <SearchIcon />
            </button>

          </div>
        </div>

        {(inputError[label] 
        || (inputError.product === true && label === 'name'))
         && <p>Заполни поле для поиска</p>}
        </>
      )}
    </div>
  );
};

export default FilterCell;
