import React from "react";
import style from "./productTable.module.scss";
import { Loader } from "../loader/loader";
import Header from "../header/header";

const ProductTable = ({
  isLoaderShow,
  products,
  setIdArray,
  setIsLoaderShow,
  idArray,
  getIds,
  setCurrentPage,
}) => {
  const getQntyDeclination = (count, words) => {
    return words[
      count % 100 > 4 && count % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][count % 10 < 5 ? Math.abs(count) % 10 : 5]
    ];
  };

  return (
    <div className={style.product_table}>
      <Header
        setIdArray={setIdArray}
        setIsLoaderShow={setIsLoaderShow}
        getIds={getIds}
        setCurrentPage={setCurrentPage}
      />
      {isLoaderShow ? (
        <>
          {Boolean(idArray?.length) && (
            <span>
              {`Найдено ${idArray?.length} ${getQntyDeclination(
                idArray?.length,
                ["товар", "товара", "товаров"]
              )}`}{" "}
            </span>
          )}
          <Loader />
        </>
      ) : !products.length && Boolean(!idArray?.length) ? (
        <h2>По вашему запросу ничего не найдено.Попробуйти изменить запрос</h2>
      ) : (
        products.map((product) => (
          <div key={product.id} className={style.product_row}>
            <div className={style.product_cell}>{product.id}</div>
            <div className={style.product_cell}>{product.product}</div>
            <div className={style.product_cell}>{product.price}</div>
            <div className={style.product_cell}>{product.brand}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductTable;
