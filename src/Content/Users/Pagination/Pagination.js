import React, { useEffect, useState } from "react";
import s from "./Pagination.module.css";

const Pagination = ({ requestUsers, ...props }) => {
  const checkWidth = () => {
    if (window.innerWidth <= 350) {
      return 3;
    } else if (window.innerWidth <= 500) {
      return 5;
    } else {
      return 10;
    }
  };

  const [amount, amountSet] = useState(checkWidth());
  const [activeItem, setActiveItem] = useState(1);
  let pageNum = window.location.href.match(/(?<==)\d*/g) || [activeItem];
  pageNum = pageNum.map((num) => +num);

  const [countClicked, countClickedSet] = useState(
    Math.ceil(pageNum[0] / amount)
  );

  useEffect(() => {
    let checkForResize = () => {
      amountSet(checkWidth());
    };
    window.addEventListener("resize", checkForResize);

    return () => {
      window.removeEventListener("resize", checkForResize);
    };
  }, []);

  const leftLimit = (countClicked - 1) * amount + 1;
  const rightLimit = countClicked * amount;

  useEffect(() => {
    requestUsers(pageNum[0]);
    setActiveItem(pageNum[0]);
  }, []);

  const linkClicked = (id) => {
    setActiveItem(id);
    requestUsers(id);
    window.history.pushState({ id }, "", `?page=${id}`);
  };

  const increaseNumb = (e) => {
    countClickedSet(countClicked + 1);
    linkClicked(leftLimit + amount);
  };

  const decreaseNumb = (e) => {
    countClickedSet(countClicked - 1);
    linkClicked(leftLimit - amount);
  };

  const createPagination = () => {
    let pags = [];
    for (let i = 1; i <= props.pageCount; i++) {
      if (i >= leftLimit && i <= rightLimit) {
        pags.push(
          <li
            key={i}
            className={
              s.pag__item + " " + (activeItem === i && s.pag__item_active)
            }
            onClick={(e) => {
              linkClicked(i);
            }}
          >
            {i}
          </li>
        );
      } else {
        continue;
      }
    }
    return pags;
  };
  return (
    <ul className={s.pag}>
      {countClicked > 1 && (
        <li onClick={decreaseNumb} className={s.pag__item + " " + s.pag__arr}>
          &#8592;
        </li>
      )}
      {createPagination()}
      {countClicked < Math.ceil(props.pageCount / amount) && (
        <li onClick={increaseNumb} className={s.pag__item + " " + s.pag__arr}>
          &#8594;
        </li>
      )}
    </ul>
  );
};

export default Pagination;
