import clsx from 'clsx';
import React from 'react';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './ChooseAvatarStep.module.scss';

export const ChooseAvatarStep: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>('')
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarUrl(imageUrl)
    }
  };
  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo title="Okay, " description="How's this photo" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar width="120px" height="120px" src={avatarUrl} />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button>
          Next
          <img className="d-ib ml-10" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
