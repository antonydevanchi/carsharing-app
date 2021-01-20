import React, { useEffect, useState } from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./Pagination.scss";

function Pagination({ pages, handleClick, activeIndex, goRight, goLeft }) {
  const [pageNums, setPageNums] = useState([]);

  const createCn = (element, modifier) =>
    createClassName("pagination", element, modifier);

  const goToNextPage = () => {
    if (activeIndex < pages - 1) {
      goRight();
      handleClick(activeIndex + 1);
    }
  };
  const goToPrevPage = () => {
    if (activeIndex >= 1) {
      goLeft();
      handleClick(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (pages >= 0 && pages < 6) {
      const numbers = [];
      for (let i = 1; i <= pages; i++) {
        numbers.push(i);
      }
      setPageNums(numbers);
    } else if (pages > 5 && activeIndex <= 2) {
      setPageNums(["1", "2", "3", "...", `${pages}`]);
    } else if (pages > 5 && activeIndex > 2 && activeIndex + 3 < pages) {
      setPageNums([
        "1",
        "...",
        `${activeIndex}`,
        `${activeIndex + 1}`,
        `${activeIndex + 2}`,
        "...",
        `${pages}`,
      ]);
    } else {
      for (let i = 0; i <= 3; i++) {
        if (pages > 5 && activeIndex > 2 && activeIndex + i === pages) {
          setPageNums([
            "1",
            "...",
            `${activeIndex + i - 3}`,
            `${activeIndex + i - 2}`,
            `${activeIndex + i - 1}`,
            `${pages}`,
          ]);
        }
      }
    }
  }, [activeIndex, pages]);

  return (
    <div className={createCn()}>
      <button
        className={createCn("button", { type: "prev" })}
        onClick={goToPrevPage}
      />
      {pageNums &&
        pageNums.map((num, i) => (
          <span
            key={i}
            className={
              +num === activeIndex + 1
                ? createCn("item", { type: "active" })
                : createCn("item")
            }
          >
            {num}
          </span>
        ))}

      <button
        className={createCn("button", { type: "next" })}
        onClick={goToNextPage}
      />
    </div>
  );
}

export default Pagination;
