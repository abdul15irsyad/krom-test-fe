import {
  Button,
  Card,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTable } from '../../hooks/use-table';
import { CustomTable } from '../../components/table/custom-table';
import { useApplicants } from '../../hooks/use-applicant';
import { HeadLabel } from '../../components/table/custom-table-head';
import { useDebounce } from '../../hooks/use-debounce';
import { Icon } from '@iconify/react';
import { ListApplicantToolbar } from './list-toolbar';
import { ListApplicantTableRow } from './list-row';
import { useEffect } from 'react';

const tableHead: HeadLabel[] = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'appliedRole', label: 'Applied Role' },
  { id: 'applicationStatus', label: 'Application Status' },
];

const defaultFilters = {
  search: '',
  appliedRoleId: '',
  applicationStatusId: '',
};

export const ListApplicantPage = () => {
  const {
    page,
    filters,
    rowsPerPage,
    handleFilters,
    handleResetFilters,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable<typeof defaultFilters>({
    defaultFilters,
  });
  useEffect(() => {
    console.log({ filters });
  }, [filters]);

  const searchDebounce = useDebounce(filters?.search);

  const { data: applicantResponse, isLoading } = useApplicants({
    page: page + 1,
    limit: rowsPerPage,
    search: searchDebounce,
    appliedRoleId: filters?.appliedRoleId,
    statusId: filters?.applicationStatusId,
  });

  return (
    <Container sx={{ padding: 2 }}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingBottom={2}
      >
        <Typography variant="h5" fontWeight={600}>
          List Applicants
        </Typography>
        <Button
          startIcon={<Icon icon={'mingcute:add-line'} />}
          variant="contained"
          color="primary"
          href="/add"
        >
          Add Applicant
        </Button>
      </Stack>
      <Card>
        <Stack
          spacing={2}
          padding={2}
          paddingBottom={1}
          alignItems={{ xs: 'flex-start' }}
          justifyContent="space-between"
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <ListApplicantToolbar
              defaultFilters={defaultFilters}
              filters={filters!}
              handleFilters={handleFilters}
            />
          </Stack>
          <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
            <TextField
              size="small"
              style={{ minWidth: '100px' }}
              value={filters?.search}
              onChange={(event) => handleFilters('search', event.target.value)}
              placeholder="Search"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="eva:search-fill" />
                    </InputAdornment>
                  ),
                  endAdornment: filters.search !== '' && (
                    <InputAdornment
                      position="end"
                      onClick={() => handleFilters('search', '')}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <Icon icon="mingcute:close-line" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>
        <CustomTable
          filters={filters}
          defaultFilters={defaultFilters}
          handleFilters={handleFilters}
          handleResetFilters={handleResetFilters}
          isLoading={isLoading}
          meta={{
            totalAllData: applicantResponse?.meta?.totalAllData ?? 0,
            totalPage: Math.ceil(
              (applicantResponse?.meta?.totalAllData ?? 0) / rowsPerPage,
            ),
          }}
          data={applicantResponse?.data ?? []}
          detailPath={(id: string) => `/detail/${id}`}
          handleChangePage={onChangePage}
          handleRowsPerPageChange={onChangeRowsPerPage}
          headLabel={tableHead}
          page={page + 1}
          limit={rowsPerPage}
          dataTableRow={ListApplicantTableRow}
        />
      </Card>
    </Container>
  );
};
