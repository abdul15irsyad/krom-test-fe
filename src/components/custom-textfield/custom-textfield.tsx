import { useTheme } from '@mui/material';
import styles from './custom-textfield.module.css';

export const CustomTextField = ({
  id,
  type = 'text',
  label,
  value,
  placeholder,
}: {
  id: string;
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
}) => {
  const theme = useTheme();
  return (
    <div
      className={styles.container}
      style={{
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
