export const Pill = ({
  text,
  color = 'primary',
}: {
  text: string;
  color?: string;
}) => {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '.25rem .5rem',
        fontWeight: 600,
        borderRadius: 5,
        fontSize: '90%',
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
      }}
    >
      {text}
    </div>
  );
};
