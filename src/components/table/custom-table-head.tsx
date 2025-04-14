import { TableCell, TableHead, TableRow } from '@mui/material';

export interface HeadLabel {
  id: string;
  label: string;
}

export const CustomTableHead = ({ headLabel }: { headLabel: HeadLabel[] }) => {
  return (
    <TableHead sx={{ backgroundColor: '#dfdfdf' }}>
      <TableRow>
        <TableCell sx={{ width: '1px', fontWeight: 800 }}>No</TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            style={{ textWrap: 'nowrap', fontWeight: 800 }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
