import { useRouter } from "next/router"
import { Header } from "../../components/Header"
import { Profile } from "../../components/Profile"

export default function ProfilePage() {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <Header />
            <div className="container mt-30">
                <Profile fullname="" username="" avatarUrl="" about="" />
            </div>
        </>
    )
}