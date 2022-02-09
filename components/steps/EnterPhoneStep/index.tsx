import clsx from 'clsx';
import React from 'react'
import NumberFormat from 'react-number-format';
import { Axios } from '../../../core/axios';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { WhiteBlock } from '../../WhiteBlock';

import styles from './EnterPhoneStep.module.scss'

type InputValueState = {
  formattedValue: string;
  value: string;
}

export const EnterPhoneStep = () => {
  const [inputValue, setInputValue] = React.useState<InputValueState>({} as InputValueState)
  const [isLoading, setIsLoading] = React.useState(false)
  const { onNextStep } = React.useContext(MainContext)

  const nextDisabled = !inputValue.formattedValue || inputValue.formattedValue.includes('_')

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await Axios.get('/auth/sms')
      onNextStep()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.block}>
      <StepInfo
        title="Enter your phone"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
        <div className={clsx('mb-30', styles.input)}>
          <img alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 333-22-11"
            value={inputValue.value}
            onValueChange={({ formattedValue, value }) => setInputValue({ formattedValue, value })}
          />
        </div>
        <Button disabled={isLoading || nextDisabled} onClick={onNextStep}>
          {isLoading ? 'Loading...' : <>
            Next
            <img className='d-ib ml-10' />
          </>}
        </Button>
        <p className={clsx(styles.policyText, 'mt-30')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptate nostrum cupiditate, aperiam tenetur magnam, ratione itaque sequi possimus quod quas exercitationem aspernatur ea iste obcaecati, dolor temporibus maxime aut.
        </p>
      </WhiteBlock>

    </div>);
};
