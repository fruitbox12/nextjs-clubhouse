import clsx from 'clsx'
import styles from './ConversationCard.module.scss'
import WhiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss'
import { Avatar } from '../Avatar'
import { UserData } from '../../pages'


interface ConversationCardProps {
    title: string;
    speakers: UserData[]
    listenersCount: number;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({ title, speakers = [], avatars = [], listenersCount }) => {
    return (
        <div className={clsx(WhiteBlockStyles.block, styles.card, 'mb-30')}>
            <h4 className={styles.title}>{title}</h4>
            <div className={clsx('d-flex mt-10', styles.content)}>
                <div className={styles.avatars}>
                    {speakers.map((user, i) => (
                        <Avatar width="55px" height='55px' src={user.avatarUrl} key={user.avatarUrl} className={speakers.length > 1 && i === speakers.length - 1 ? 'lastAvatar' : ''} />
                    ))}
                </div>
                <div className={clsx(styles.info, 'ml-10')}>
                    <ul className={styles.users}>
                        {
                            speakers.map((user, i) => (
                                <li key={user.id}>
                                    {user.fullname} <img src={user.avatarUrl} alt="cloud" width={14} height={14} />
                                </li>
                            ))
                        }
                    </ul>
                    <ul className={styles.details}>
                        <li >
                            {listenersCount} <img alt='Users count' width={12} height={12} />
                        </li>
                        <li >
                            {speakers.length}
                            <img
                                className='ml-5'
                                alt="SpeakersCount"
                                width={12}
                                height={12}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}