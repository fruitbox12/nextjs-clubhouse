import clsx from 'clsx';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './EnterNameStep.module.scss';

export const EnterNameStep = () => {
  return (
    <div className={styles.block}>
      <StepInfo title="What's your full name?" description="People use real names" />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className="mb-30">
          <input className="field" placeholder="Enter fullname" />
        </div>
        <Button>
          Next
          <img className="d-ib ml-10" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
