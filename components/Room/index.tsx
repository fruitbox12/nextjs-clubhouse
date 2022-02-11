import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { Button } from '../Button';
import { Speaker, SpeakerProps } from '../Speaker';

import styles from './Room.module.scss'

interface RoomProps {
    title: string;
}



export const Room: React.FC<RoomProps> = ({ title }) => {
    const [users, setUsers] = React.useState<SpeakerProps[]>([])
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
                {
                    users.map((obj) => (
                        <Speaker {...obj} />
                    ))
                }
            </div>
        </div>
    );
};
