import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import { useListRoles } from '../../hooks/use-role';
import { useListStatuses } from '../../hooks/use-status';

export const ListApplicantToolbar = ({
  defaultFilters,
  filters,
  handleFilters,
}: {
  defaultFilters: {
    search: string;
    appliedRoleId: string;
    applicationStatusId: string;
  };
  filters: {
    search: string;
    appliedRoleId: string;
    applicationStatusId: string;
  };
  handleFilters: <T>(key: string, value: T) => void;
}) => {
  const { data: rolesResponse } = useListRoles();
  const { data: statusesResponse } = useListStatuses();

  return (
    <>
      <FormControl
        size="small"
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>Applied Role</InputLabel>

        <Select
          value={filters.appliedRoleId}
          input={<OutlinedInput label="Applied Role" />}
          onChange={(event) =>
            handleFilters('appliedRoleId', event?.target.value)
          }
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240 },
            },
          }}
        >
          <MenuItem value={defaultFilters.appliedRoleId}>
            -- Show All --
          </MenuItem>
          {rolesResponse?.data?.map((role) => (
            <MenuItem key={role?.id} value={role.id}>
              {role?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>Status</InputLabel>

        <Select
          value={filters.applicationStatusId}
          onChange={(event) =>
            handleFilters('applicationStatusId', event.target.value)
          }
          input={<OutlinedInput label="Status" />}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240 },
            },
          }}
        >
          <MenuItem value={defaultFilters.applicationStatusId}>
            -- Show All --
          </MenuItem>
          {statusesResponse?.data?.map((status) => (
            <MenuItem key={status?.id} value={status?.id}>
              {status?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
