import { useEffect, useRef, useState } from "react";
import "./App.css";
import ProductTable from "./components/item/productTable";
import { getIds, getItems } from "./services/api";
import Pagination from "./components/pagination/pagination";

function App() {
  const [idArray, setIdArray] = useState();
  const [items, setItems] = useState([]);
  const [isLoaderShow, setIsLoaderShow] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentIds = idArray?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setIsLoaderShow(true);
    getIds()
      .then((res) => {
        setIdArray(res);
      })
      .catch((error) => {
        console.error("Произошла ошибка в getIds при получении данных:", error);
      });
    setIsLoaderShow(false);
  }, []);

  const prevIdsRef = useRef(currentIds);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoaderShow(true);
      try {
        const res = await getItems(currentIds);
        if (res && Array.isArray(res)) {
          const uniqueItems = res.reduce((acc, current) => {
            const x = acc.find((item) => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          setItems(uniqueItems);
        }
      } catch (error) {
        console.error("Ошибка в getItems при получении данных:", error);
      } finally {
        setIsLoaderShow(false);
      }
    };

    if (!Array.isArray(currentIds) || currentIds.length === 0) {
      return;
    }

    if (!arraysAreEqual(prevIdsRef.current, currentIds)) {
      fetchItems();
      prevIdsRef.current = currentIds;
    }
  }, [currentIds]);

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1?.length !== arr2?.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
  };
  return (
    <div className="App">
      <div className="container" id="scrollAnchor">
        <ProductTable
          isLoaderShow={isLoaderShow}
          products={items}
          setIdArray={setIdArray}
          setIsLoaderShow={setIsLoaderShow}
          idArray={idArray}
          getIds={getIds}
          setCurrentPage={setCurrentPage}
        />
        {!isLoaderShow && (
          <Pagination
            currentPage={currentPage}
            totalItems={idArray?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
