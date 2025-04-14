import { SxProps, Theme, Typography } from '@mui/material';

export const Pill = ({
  text,
  color = 'primary',
  sx,
}: {
  text: string;
  color?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Typography
      sx={{
        display: 'inline-block',
        padding: '.25rem .5rem',
        fontWeight: 600,
        borderRadius: 2,
        fontSize: '11px',
        ...(color === 'primary'
          ? {
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
            }
          : color === 'success'
            ? {
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
              }
            : color === 'error'
              ? {
                  backgroundColor: '#fdeded',
                  color: '#5f2120',
                }
              : {}),
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};
