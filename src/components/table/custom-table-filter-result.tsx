import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';

export const CustomTableFiltersResult = <F extends { search: string }>({
  onResetFilters,
  results,
}: {
  filters: F;
  onFilters: (key: string, value: string) => void;
  onResetFilters: () => void;
  results: number;
}) => {
  return (
    <Stack
      paddingBottom={1}
      flexGrow={1}
      spacing={1}
      direction="row"
      flexWrap="wrap"
      alignItems="center"
    >
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          result found
        </Box>
      </Box>
      <Button
        sx={{
          padding: '.25rem .75rem',
          fontWeight: 400,
        }}
        color="error"
        onClick={onResetFilters}
        startIcon={<Icon icon="solar:trash-bin-trash-bold" />}
      >
        clear filters
      </Button>
    </Stack>
  );
};
