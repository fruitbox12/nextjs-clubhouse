import clsx from 'clsx'
import Link from 'next/link'
import { Avatar } from '../Avatar'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className='container d-flex align-items-center justify-content-between'>
                <Link href="/rooms">
                    <div className={clsx(styles.headerLogo, 'd-flex align-items-center')}>
                        <img alt="logo" className='' />
                        <h4>Clubhouse</h4>
                    </div>
                </Link>
                <Link href="/profile/1">
                    <div className='d-flex align-items-center cup'>
                        <b className='mr-5'>CoolSheff</b>
                        <Avatar
                            src=''
                            width='50px'
                            height='50px'
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}