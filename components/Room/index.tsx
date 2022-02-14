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
import { useSocket } from '../../hooks/useSocket';

interface RoomProps {
    title: string;
}

let peers = []

export const Room: React.FC<RoomProps> = ({ title }) => {
    const router = useRouter()
    const roomId = router.query.id
    const user = useSelector(selectUserData)
    const [users, setUsers] = React.useState<UserData[]>([])
    const socket = useSocket()
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {
                socket.emit('CLIENT@ROOMS:JOIN', {
                    user,
                    roomId
                })

                socket.on('SERVER@ROOMS:JOIN', (allUsers: UserData[]) => {
                    setUsers(allUsers)

                    allUsers.forEach((speaker) => {
                        if (user.id !== speaker.id && peers.find((obj) => obj.id !== speaker.id)) {
                            const peerIncome = new Peer({
                                initiator: true,
                                trickle: false,
                                stream
                            })

                            peerIncome.on('signal', (signal) => {
                                socket.emit('CLIENT@ROOMS:CALL', {
                                    targetUserId: speaker.id,
                                    callerUserId: user.id,
                                    roomId,
                                    signal
                                })
                                peers.push({
                                    peer: peerIncome,
                                    id: speaker.id
                                })
                            })

                            socket.on('SERVER@ROOMS:CALL', ({ targetUserId, callerUserId, signal: callerSignal }) => {
                                const peerOutcome = new Peer({
                                    initiator: false,
                                    trickle: false,
                                    stream
                                })
                                peerOutcome.signal(callerSignal)
                                peerOutcome.on('stream', (stream) => {
                                    document.querySelector('audio').srcObject = stream
                                    document.querySelector('audio').play()
                                }).on('signal', (signal) => {
                                    socket.emit('CLIENT@ROOMS:ANSWER', {
                                        targetUserId: callerUserId,
                                        callerUserId: targetUserId,
                                        roomId,
                                        signal
                                    })
                                })
                                socket.on('SERVER@ROOMS:ANSWER', ({ callerUserId, signal }) => {
                                    const obj = peers.find((obj) => Number(obj.id) === Number(callerUserId))
                                    if (obj.peer) {
                                        obj.peer.signal(signal)
                                    }
                                })
                            })
                        }
                    })
                })
            }).catch((err) => {
                console.log(err);

            })

            socket.on('SERVER@ROOMS:LEAVE', (leaveUser: UserData) => {
                setUsers(prev => prev.filter(prevUser => {
                    const peerUser = peers.find((obj) => Number(obj.id) === Number(leaveUser.id))
                    if (peerUser) {
                        peerUser.destroy()
                    }
                    return prevUser.id !== leaveUser.id
                }))
            })
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <audio controls />
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

