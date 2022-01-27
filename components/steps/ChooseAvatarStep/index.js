import clsx from 'clsx';
import React from 'react';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './ChooseAvatarStep.module.scss';

export const ChooseAvatarStep = () => {
  const inputFileRef = React.useRef();

  const handleChangeImage = (e) => {
    console.log(e.target.files);
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
          <Avatar width="120px" height="120px" />
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
