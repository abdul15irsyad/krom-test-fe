import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { HeadLabel, CustomTableHead } from './custom-table-head';
import { CustomTableRow } from './custom-table-row';
import { LoadingIllustration } from '../loading-illustration/loading-illustration';
import { CustomTableFiltersResult } from './custom-table-filter-result';
import { isEqual } from 'lodash';

export const CustomTable = <
  T extends { id: string; _index?: number },
  F extends { search: string },
>({
  headLabel,
  data,
  page,
  limit,
  filters,
  defaultFilters,
  meta,
  isLoading,
  dataTableRow,
  handleChangePage,
  handleRowsPerPageChange,
  handleFilters,
  handleResetFilters,
  detailPath,
}: {
  headLabel: HeadLabel[];
  data: T[];
  page: number;
  limit: number;
  filters: F;
  defaultFilters: F;
  meta: {
    totalPage: number;
    totalAllData: number;
  };
  isLoading: boolean;
  dataTableRow: (...props: any) => React.JSX.Element;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  handleRowsPerPageChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleFilters: <T>(key: string, value: T) => void;
  handleResetFilters: () => void;
  detailPath: (id: string) => string;
}) => {
  const canReset = !isEqual(defaultFilters, filters);
  return (
    <>
      {canReset && (
        <CustomTableFiltersResult
          filters={filters}
          onFilters={handleFilters}
          onResetFilters={handleResetFilters}
          results={meta?.totalAllData}
        />
      )}
      <TableContainer
        sx={{
          position: 'relative',
          overflow: 'unset',
        }}
      >
        <Table size={'small'}>
          <CustomTableHead headLabel={headLabel} />
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={100} style={{ padding: '2rem 0' }}>
                  <LoadingIllustration />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data?.map((row, index) => {
                row._index = index + 1 + (page - 1) * limit;
                return (
                  <CustomTableRow
                    key={index}
                    row={row}
                    onDetailRow={() => detailPath(row.id)}
                    dataTableRow={dataTableRow}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {meta && meta?.totalAllData > 0 && (
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            count={meta.totalAllData}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowsPerPageChange}
            align="center"
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            page={page - 1}
            sx={{
              '& .MuiTablePagination-toolbar': {
                justifyContent: 'center',
              },
              borderTopColor: 'transparent',
            }}
          />
        </Box>
      )}
    </>
  );
};
