import clsx from 'clsx';
import React from 'react';

import styles from './Room.module.scss'

interface RoomProps {
    title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
    return (
        <div className={styles.wrapper}>
            <div className="d-flex align-items-center justify-content-between">
                <h2>{title}</h2>
                <div className={clsx('d-flex align-items-center', styles.actionButtons)}>
                    <Link href="/">
                        <a>
                            <Button>
                                <img width={18} height={18} alt="Hand Black" />
                                Leave quietly
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="users">

            </div>
        </div>
    );
};
