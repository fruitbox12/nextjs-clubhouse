import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/selectors';
import { Button } from '../Button';
import { Socket } from 'socket.io-client'
import { Speaker, SpeakerProps } from '../Speaker';

import styles from './Room.module.scss'
import { UserData } from '../../pages';

interface RoomProps {
    title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
    const router = useRouter()
    const roomId = router.query.id
    const user = useSelector(selectUserData)
    const [users, setUsers] = React.useState<UserData[]>([])
    const socketRef = React.useRef<Socket>()
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            socketRef.current = io('http://localhost:3001')
            socketRef.current.emit('CLIENT@ROOMS:JOIN', {
                user,
                roomId
            })
            socketRef.current.on('SERVER@ROOMS:JOIN', users => {
                setUsers(users)
            })
            socketRef.current.on('SERVER@ROOMS:LEAVE', (user: UserData) => {
                setUsers(prev => prev.filter(obj => obj.id !== user.id))
            })

            setUsers(prev => [...prev, user])
        }
        return () => {
            socketRef.current.disconnect()
        }
    }, [])

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
                        <Speaker key={obj.fullname} {...obj} />
                    ))
                }
            </div>
        </div>
    );
};
function useRouter() {
    throw new Error('Function not implemented.');
}

function io(arg0: string): Socket {
    throw new Error('Function not implemented.');
}

