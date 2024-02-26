import React, { useState } from "react";
import style from "../item/productTable.module.scss";
import { filterItems } from "../../services/api";

import FilterCell from "../filterCell";

const Header = ({ setIdArray, setIsLoaderShow, getIds, setCurrentPage }) => {
  const [inputData, setInputData] = useState({
    name: "",
    price: "",
    brand: "",
  });
  const [inputError, setInputError] = useState({
    product: false,
    price: false,
    brand: false,
  });

  const searchHandler = (params) => {
    if (!!Object.values(params)[0] === false) {
      setInputError((prev) => ({ ...prev, [Object.keys(params)[0]]: true }));
      return;
    }
    setIsLoaderShow(true);
    filterItems(params)
      .then((res) => {
        if (res) {
          setIdArray(res);
          setCurrentPage(1);
        } else {
          console.error("Ошибка: пустой результат");
        }
      })
      .catch((error) => {
        console.error("Ошибка при фильтрации элементов:", error);
      })
      .finally(() => {
        setIsLoaderShow(false);
      });
  };

  const handleKeyDown = (option, e) => {
    setInputError((prev) => ({ ...prev, [Object.keys(option)[0]]: false }));
    if (e.key === "Enter" && option) {
      e.preventDefault();
      searchHandler(option);
    }
  };

  const handleClick = async () => {
    setIsLoaderShow(true);
    setInputData({
      name: "",
      price: "",
      brand: "",
    });
    try {
      const res = await getIds();
      setIdArray(res);
      setCurrentPage(1);
      setInputError({
        product: false,
        price: false,
        brand: false,
      })
    } catch (error) {
      console.error("Ошибка при сбрасывании фильтров:", error);
    } finally {
      setIsLoaderShow(false);
    }
  };

  return (
    <div className={style.header}>
      <div className={style.product_cell_Id}>
        <div>ID</div>
        <button
          onClick={() => {
            handleClick();
          }}
          style={{ width: "fit-content", height: "30px", borderRadius: "45px" }}
        >
          сбросить фильтры
        </button>
      </div>

      <FilterCell
        label="name"
        title="Название"
        type="text"
        inputData={inputData}
        setInputData={setInputData}
        searchHandler={searchHandler}
        handleKeyDown={handleKeyDown}
        option={{ product: inputData.name }}
        inputError={inputError}
        setInputError={setInputError}
      />
      <FilterCell
        label="price"
        title="Цена"
        type="number"
        inputData={inputData}
        setInputData={setInputData}
        searchHandler={searchHandler}
        handleKeyDown={handleKeyDown}
        option={{ price: +inputData.price }}
        inputError={inputError}
        setInputError={setInputError}
      />
      <FilterCell
        label="brand"
        title="Бренд"
        type="text"
        inputData={inputData}
        setInputData={setInputData}
        searchHandler={searchHandler}
        handleKeyDown={handleKeyDown}
        option={{ brand: inputData.brand }}
        inputError={inputError}
        setInputError={setInputError}
      />
    </div>
  );
};

export default Header;
