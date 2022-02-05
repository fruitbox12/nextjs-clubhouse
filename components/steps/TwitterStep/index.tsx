import clsx from 'clsx';
import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './TwitterStep.module.scss';

export const TwitterStep: React.FC = () => {

  const { onNextStep } = React.useContext(MainContext)

  const onClickAuth = () => {
    const win = window.open('http://localhost:3001/auth/github', 'Auth', 'width=600,height=500,status=yes,toolbar=no,menubar=no,location=no')

    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer)
        onNextStep()
      }

    }, 1000)
  }
  React.useEffect(() => {
    window.addEventListener('message', (data) => {
      console.log(data);

    })
  }, [])

  return (
    <div className={styles.block}>
      <StepInfo title="Do you want import info from Twitter?" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>AD</b>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path fill="#e0e0e0" stroke="#d6d6d6" />
          </svg>
        </div>
        <h2 className="mb-40">Archakov Dennis</h2>
        <Button onClick={onClickAuth}>
          <img alt="Twitter logo" />
          Import from Twitter
          <img className="d-ib ml-10" alt="Twitter logo" />
        </Button>
        <div className="link mt-20 cup d-ib">Enter my info manually</div>
      </WhiteBlock>
    </div>
  );
};
