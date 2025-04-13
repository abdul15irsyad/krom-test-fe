import { Box, Stack } from '@mui/system';
import { Typography } from '@mui/material';

export const LoadingIllustration = () => (
  <Stack
    component="div"
    direction="row"
    sx={{
      alignItems: 'center',
      justifyContent: 'center',
      gap: '.25rem',
      margin: '1rem auto',
    }}
  >
    <Box sx={{ width: '160px' }}>
      <img
        alt="loading illustration"
        src={`/assets/illustrations/illustrations_loading.png`}
        width={320}
        height={320}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
          padding: '1rem',
        }}
      />
    </Box>
    <Typography variant="h4" component="h2">
      Loading...
    </Typography>
  </Stack>
);
