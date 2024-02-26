import React, { useEffect, useState } from 'react';
import style from './pagination.module.scss'
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {

useEffect(() => {
  setScrollAnchor(document.getElementById('scrollAnchor'));
}, []);
const [scrollAnchor, setScrollAnchor] = useState(null)
const totalPages = Math.ceil(totalItems / itemsPerPage)
const buttons = Array.from(

  { length: totalPages},
  (_, index) => index + 1,
);

const setPage = (page) => {
  onPageChange(page);
}

const buttonHandler = (el) => {
  setPage(el);
  scrollAnchor?.scrollIntoView({ behavior: 'smooth' });
};

const prevButtonHandler = () => {
  setPage(currentPage - 1);
  scrollAnchor?.scrollIntoView({ behavior: 'smooth' });
};

const nextButtonHandler = () => {
  setPage(currentPage + 1);
  scrollAnchor?.scrollIntoView({ behavior: 'smooth' });
};

if (buttons.length > 1 && buttons.length <= 10) {
  return (
    <div className={style.pagination}>
      {currentPage > 1 ? (
        <button
          onClick={prevButtonHandler}
          className={style.pagination__prev}
        ></button>
      ) : (
        <span className={style.pagination__prev}></span>
      )}

      {buttons.map((el) => (
        <button
          key={el}
          onClick={() => buttonHandler(el)}
          className={
            el === currentPage
              ? style.pagination__page_active
              : style.pagination__page
          }
        >
          {el}
        </button>
      ))}
      {currentPage === totalPages ? (
        <span className={style.pagination__next}></span>
      ) : (
        <button
          onClick={nextButtonHandler}
          className={style.pagination__next}
        ></button>
      )}
    </div>
  );
}
if (buttons.length > 10) {
  if (
    (currentPage <= 4) ||
    currentPage === 1
  ) {
    return (
      <div className={style.pagination}>
        {currentPage > 1 ? (
          <button
            onClick={prevButtonHandler}
            className={style.pagination__prev}
          ></button>
        ) : (
          <span className={style.pagination__prev}></span>
        )}

        {[1, 2, 3, 4, 5].map((el) => (
          <button
            key={el}
            onClick={() => buttonHandler(el)}
            className={
              el === currentPage
                ? style.pagination__page_active
                : style.pagination__page
            }
          >
            {el}
          </button>
        ))}

        <span className={style.pagination__page}>...</span>

        <button
          onClick={() => buttonHandler(totalPages)}
          className={style.pagination__page}
        >
          {totalPages}
        </button>

        <button
          onClick={nextButtonHandler}
          className={style.pagination__next}
        ></button>
      </div>
    );
  }
  if (
    currentPage > totalPages - 4
  ) {
    return (
      <div className={style.pagination}>
        <button
          onClick={prevButtonHandler}
          className={style.pagination__prev}
        ></button>

        <button onClick={() => buttonHandler(1)} className={style.pagination__page}>
          {1}
        </button>

        <span className={style.pagination__page}>...</span>

        {Array.from(
          { length: 5 },
          (_, index) => totalPages - index,
        )
          .reverse()
          .map((el) => (
            <button
              key={el}
              onClick={() => buttonHandler(el)}
              className={
                el === currentPage
                  ? style.pagination__page_active
                  : style.pagination__page
              }
            >
              {el}
            </button>
          ))}

        {currentPage === totalPages ? (
          <span className={style.pagination__next}></span>
        ) : (
          <button
            onClick={nextButtonHandler}
            className={style.pagination__next}
          ></button>
        )}
      </div>
    );
  } else {
    return (
      <div className={style.pagination}>
        {currentPage > 1 ? (
          <button
            onClick={prevButtonHandler}
            className={style.pagination__prev}
          ></button>
        ) : (
          <span className={style.pagination__prev}></span>
        )}

        <button onClick={() => buttonHandler(1)} className={style.pagination__page}>
          {1}
        </button>

        {(currentPage >= 5) && (
          <span className={style.pagination__page}>...</span>
        )}

        {[
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
        ].map((el) => (
          <button
            key={el}
            onClick={() => buttonHandler(el)}
            className={
              el === currentPage
                ? style.pagination__page_active
                : style.pagination__page
            }
          >
            {el}
          </button>
        ))}
        <span className={style.pagination__page}>...</span>

        <button
          onClick={() => buttonHandler(totalPages)}
          className={style.pagination__page}
        >
          {totalPages}
        </button>

        {currentPage === totalPages ? (
          <span className={style.pagination__next}></span>
        ) : (
          <button
            onClick={nextButtonHandler}
            className={style.pagination__next}
          ></button>
        )}
      </div>
    );
  }
} else return null;



};

export default Pagination;