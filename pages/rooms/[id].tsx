import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { BackButton } from "../../components/BackButton"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Profile } from "../../components/Profile"
import { Room } from "../../components/Room"

export default function ProfilePage() {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <Header />
            <div className="container mt-40">
                <BackButton title="All rooms" href="/rooms" />
            </div>
            <Room />
        </>
    )
}