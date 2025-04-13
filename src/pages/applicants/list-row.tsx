import { TableCell } from '@mui/material';
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
      <Pill
        text={applicationStatus.name}
        color={
          [
            'Hired',
            'Offer Accepted',
            'Interview Done',
            'Offer Made',
            'Contacted',
          ].includes(applicationStatus.name)
            ? 'success'
            : ['Candidate Rejected', 'Offer Rejected'].includes(
                applicationStatus.name,
              )
            ? 'error'
            : undefined
        }
      />
    </TableCell>
  </>
);
