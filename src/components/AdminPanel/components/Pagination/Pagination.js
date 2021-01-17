import React, { useEffect, useState } from "react";
import { withNaming } from "@bem-react/classname";
import "./Pagination.scss";

function Pagination({ pages, handleClick, activeIndex, setActiveIndex }) {
  const cn = withNaming({ n: "pagination", e: "__", m: "_" });
  const [pageNums, setPageNums] = useState([]);

  const goToNextPage = () => {
    if (activeIndex < pages - 1) {
      setActiveIndex(activeIndex + 1);
      handleClick(activeIndex + 1);
    }
  };
  const goToPrevPage = () => {
    if (activeIndex >= 1) {
      setActiveIndex(activeIndex - 1);
      handleClick(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (pages > 0 && pages < 6) {
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
    <div className={cn("")()}>
      <button
        className={cn("", "button")({ type: "prev" })}
        onClick={() => goToPrevPage()}
      />
      {pageNums &&
        pageNums.map((num, i) => (
          <span
            key={i}
            className={
              +num === activeIndex + 1
                ? cn("", "item")({ type: "active" })
                : cn("", "item")()
            }
          >
            {num}
          </span>
        ))}

      <button
        className={cn("", "button")({ type: "next" })}
        onClick={() => goToNextPage()}
      />
    </div>
  );
}

export default Pagination;
