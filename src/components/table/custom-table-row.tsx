import { TableRow, TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CustomTableRow = <T extends { id: string; _index?: number }>({
  row,
  onDetailRow,
  dataTableRow,
}: {
  row: T;
  onDetailRow: () => string;
  dataTableRow: (...props: any) => React.JSX.Element;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <TableRow
        onClick={() => navigate(onDetailRow())}
        hover
        sx={{
          cursor: 'pointer',
          backgroundColor: (row._index ?? 0) % 2 === 0 ? '#fafafa' : '#FFFFFF',
          '&:hover': {
            backgroundColor: '#d1ffe1 !important', // Light gray
          },
        }}
      >
        <TableCell style={{ color: 'gray' }}>{row._index}</TableCell>

        {dataTableRow?.(row)}
      </TableRow>
    </>
  );
};
