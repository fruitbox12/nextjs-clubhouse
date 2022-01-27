import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({ children, disabled, color, onClick, className }) => {
  const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(className, styles.button, colors[color])}
      disabled={disabled}>
      {children}
    </button>
  );
};
