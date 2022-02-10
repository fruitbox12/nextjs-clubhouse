import styles from './StartRoomModal.module.scss'
import React from 'react'

interface StartRoomModalProps {
    onClose: () => void;
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
    const [roomType, setRoomType] = React.useState('open')

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <img
                    width="24px"
                    height="24px"
                    alt="Close"
                    className={styles.closeBtn}
                    onClick={onClose}
                />
                <div className="mb-30">
                    <h3>Topic</h3>
                    <input className={styles.inputTitle} placeholder="Enter the topic to be discussed" />
                </div>
                <div className="mb-30">
                    <h3>Room type</h3>
                    <div className="d-flex justify-content-between">
                        <div
                            onClick={() => setRoomType('open')}
                            className={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'open' })}
                        >
                            <img width="70px" height="70px" alt="Room type" />
                            <h5>Open</h5>
                        </div>
                        <div
                            onClick={() => setRoomType('social')}
                            classNAme={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'social' })}
                        >
                            <img width="70px" height="70px" alt="Room type" />
                            <h5>Social</h5>
                        </div>
                        <div
                            onClick={() => setRoomType('closed')}
                            classNAme={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'closed' })}
                        >
                            <img width="70px" height="70px" alt="Room type" />
                            <h5>Closed</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.delimiter}></div>
                <div className="text-center">
                    <h3>Start a room open to everyone</h3>
                    <Button onClick={onClose} color="green">
                        <img width="18px" height="18px" alt="Celebration" />
                        Let's go
                    </Button>
                </div>
            </div>
        </div>
    )
}