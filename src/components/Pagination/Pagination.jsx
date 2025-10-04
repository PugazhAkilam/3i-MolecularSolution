import { useState, useMemo } from "react";

export function Pagination(data = [], rowsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, rowsPerPage]);

  const start = totalCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalCount);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const goToPrevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginatedData,
    start,
    end,
    totalCount,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
    resetPage,
  };
}
