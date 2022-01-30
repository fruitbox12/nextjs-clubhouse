import clsx from 'clsx'
import styles from './ConversationCard.module.scss'
import WhiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss'
import { Avatar } from '../Avatar'


interface ConversationCardProps {
    title: string;
    users: string[]
    avatars: string[];
    guestsCount: number;
    speakersCount: number;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({ title, users = [], avatars = [], guestsCount, speakersCount }) => {
    return (
        <div className={clsx(WhiteBlockStyles.block, styles.card, 'mb-30')}>
            <h4 className={styles.title}>{title}</h4>
            <div className={clsx('d-flex mt-10', styles.content)}>
                <div className={styles.avatars}>
                    {avatars.map((url, i) => (
                        <Avatar width="55px" height='55px' src={url} key={url} className={i === avatars.length - 1 ? 'lastAvatar' : ''} />
                    ))}
                </div>
                <div className={clsx(styles.info, 'ml-10')}>
                    <ul className={styles.users}>
                        {
                            users.map(name => (
                                <li key={name}>
                                    {name}
                                </li>
                            ))
                        }
                    </ul>
                    <ul className={styles.details}>
                        <li >
                            {guestsCount} <img alt='Users count' width={12} height={12} />
                        </li>
                        <li >
                            {speakersCount}
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