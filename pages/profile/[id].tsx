import { useRouter } from "next/router"
import { Header } from "../../components/Header"
import { Profile } from "../../components/Profile"
import { wrapper } from "../../redux/store"
import { checkAuth } from "../../utils/checkAuth"

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


export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    try {
        const user = await checkAuthuth(ctx)
        if (!user) {
            return {
                props: {},
                redirect: {
                    permanent: false,
                    destination: '/'
                }
            }
        }
    } catch (error) {

    }
})