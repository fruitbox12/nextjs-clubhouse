import clsx from 'clsx';
import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './EnterNameStep.module.scss';

export const EnterNameStep = () => {
  const { onNextStep, userData, setFieldValue } = React.useContext(MainContext)
  const [inputValue, setInputValue] = React.useState<string>(userData.fullname)

  const nextDisabled = !inputValue

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onClickNextStep = () => {
    setFieldValue('fullname', inputValue)
    onNextStep()
  }
  return (
    <div className={styles.block}>
      <StepInfo title="What's your full name?" description="People use real names" />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className="mb-30">
          <input onChange={handleChangeInput} value={inputValue} className="field" placeholder="Enter fullname" />
        </div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
          Next
          <img className="d-ib ml-10" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
