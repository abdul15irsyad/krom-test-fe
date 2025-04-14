import { useState, useCallback, useEffect } from 'react';

export const useTable = <F>({
  defaultCurrentPage,
  defaultRowsPerPage,
  defaultFilters,
}: {
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  defaultFilters: F;
}) => {
  const [page, setPage] = useState(defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 10);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    setPage(0);
  }, [filters, rowsPerPage]);

  const onChangeRowsPerPage = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const onChangePage = useCallback<
    (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
  >((_, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleFilters = useCallback(
    <T>(key: string, value: T) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters],
  );

  const handleResetFilters = useCallback(
    () => setFilters(defaultFilters),
    [setFilters, defaultFilters],
  );

  return {
    page,
    filters,
    rowsPerPage,
    defaultRowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    setPage,
    setRowsPerPage,
    handleFilters,
    handleResetFilters,
  };
};
