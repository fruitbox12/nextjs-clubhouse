import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './WelcomeStep.module.scss';

export const WelcomeStep: React.FC = () => {
  const { onNextStep } = React.useContext(MainContext)
  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <img className={styles.img} />
        Welcome to Clubhouse!
      </h3>
      <p>lorem</p>
      <div>
        <Button onClick={onNextStep}>
          Get your username
          <img className='d-ib ml-10' />
        </Button>
      </div>
      <div className="link mt-15 cup d-ip">Have an invite text? Sign in</div>
    </WhiteBlock>
  );
};
