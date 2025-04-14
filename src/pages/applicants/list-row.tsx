import { SxProps, TableCell, Theme } from '@mui/material';
import { Applicant } from '../../hooks/use-applicant';
import { Pill } from '../../components/pill/pill';

export const ListApplicantTableRow = ({
  name,
  email,
  appliedRole,
  applicationStatus,
}: Applicant) => (
  <>
    <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
    <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
    <TableCell sx={{ whiteSpace: 'nowrap' }}>{appliedRole.name}</TableCell>
    <TableCell sx={{ whiteSpace: 'nowrap' }}>
      <PillStatus name={applicationStatus.name} />
    </TableCell>
  </>
);

export const PillStatus = ({
  name,
  sx,
}: {
  name: string;
  sx?: SxProps<Theme>;
}) => (
  <Pill
    sx={sx}
    text={name}
    color={
      [
        'Hired',
        'Offer Accepted',
        'Interview Done',
        'Offer Made',
        'Contacted',
      ].includes(name)
        ? 'success'
        : ['Candidate Rejected', 'Offer Rejected'].includes(name)
        ? 'error'
        : undefined
    }
  />
);
