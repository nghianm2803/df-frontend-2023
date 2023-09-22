import React from "react";
import { useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../theme/pagination.css"

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount * 2 + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
      Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + siblingCount * 2;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = (props) => {
  const {
    onChangePage,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 items in the pagination range, we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    console.log("Pagination component not rendering due to conditions");
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage === lastPage) {
      console.log("Next button clicked, but already on the last page");
      return;
    }
    onChangePage(currentPage + 1);
    console.log("Next button clicked");
  };

  const onPrevious = () => {
    if (currentPage === 1) {
      console.log("Previous button clicked, but already on the first page");
      return;
    }
    onChangePage(currentPage - 1);
    console.log("Previous button clicked");
  };

  console.log("Pagination component rendering");

  return (
    <ul className="pagination">
      {/* Left navigation arrow */}
      <li
        className={`pagination-item ` + (currentPage === 1 ? "disabled" : "")}
        onClick={onPrevious}
        key="on_prev_pagination"
      >
        <span className="arrow-left">
          <AiOutlineArrowLeft />
        </span>
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={`dots_${index}`}>
              <a>&#8230;</a>
            </li>
          );
        }

        let randomKey = pageNumber + "_nPageKey";

        // Render our Page Pills
        return (
          <li
            className={
              `pagination-item ` + (pageNumber === currentPage ? "active" : "")
            }
            onClick={() => onChangePage(pageNumber)}
            key={randomKey}
          >
            <a>{pageNumber}</a>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={
          `pagination-item ` + (currentPage === lastPage ? "disabled" : "")
        }
        onClick={onNext}
        key="on_next_pagination"
      >
        <span className="arrow-right">
          <AiOutlineArrowRight />
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
