import clsx from 'clsx';
import styles from './Avatar.module.scss';

export const Avatar = ({ src, width, height, className, isVoice }) => {
  return (
    <div
      styles={{ width, height, backgroundImage: `url(${src})` }}
      className={clsx(styles.avatar, isVoice ? styles.avatarBorder : '')}></div>
  );
};
