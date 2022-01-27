import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'
import styles from './EnterCodeStep.module.scss'

export const EnterCodeStep = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [codes, setCodes] = React.useState(['', '', '', ''])
    const nextDisabled = codes.some((v) => !v)
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.getAttribute('id')) - 1
        const value = event.target.value
        setCodes((prev) => {
            const newArr = [...prev]
            newArr[index] = value
            return newArr
        })
        if (event.target.nextSibling) {
            (event.target.nextSibling as HTMLInputElement).focus()
        }
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            await Axios.get('/')
            router.push('/rooms')
        } catch (error) {
            alert(error)
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.block}>
            {isLoading ? (
                <>
                    <StepInfo title="Enter your activate code" />
                    <WhiteBlock className={clsx('mb-30', styles.codeInput)}>
                        <div className={clsx('mb-30', styles.codeInput)}>
                            <input
                                type="tel"
                                placeholder='X'
                                maxLength={1}
                                id='1'
                                onChange={handleChangeInput}
                                value={codes[0]}
                            />
                            <input
                                type="tel"
                                placeholder='X'
                                maxLength={1}
                                id='2'
                                onChange={handleChangeInput}
                                value={codes[1]}
                            />
                            <input
                                type="tel"
                                placeholder='X'
                                maxLength={1}
                                id='3'
                                onChange={handleChangeInput}
                                value={codes[2]}
                            />
                            <input
                                type="tel"
                                placeholder='X'
                                maxLength={1}
                                id='4'
                                onChange={handleChangeInput}
                                value={codes[3]}
                            />
                        </div>
                        <Button onClick={onSubmit} disabled={nextDisabled}>
                            Next
                            <img className="d-ib ml-10" />
                        </Button>
                    </WhiteBlock>
                </>
            ) : (
                <div className='text-center'>
                    <div className='loader'></div>
                    <h3 className='mt-5'>Activation in progress ... </h3>
                </div>
            )}
        </div>

    )
}