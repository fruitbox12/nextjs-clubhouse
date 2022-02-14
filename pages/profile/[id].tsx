import { NextPage } from "next"
import { useRouter } from "next/router"
import { UserData } from ".."
import { Api } from "../../api"
import { Header } from "../../components/Header"
import { Profile } from "../../components/Profile"
import { wrapper } from "../../redux/store"
import { checkAuth } from "../../utils/checkAuth"

interface ProfilePageProps {
    profileData: UserData | null;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profileData }) => {
    return (
        <>
            <Header />
            <div className="container mt-30">
                <Profile fullname={profileData.fullname} username={profileData.username} avatarUrl={profileData.avatarUrl} about="" />
            </div>
        </>
    )
}

export default ProfilePage

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    try {
        const user = await checkAuth(ctx)
        const userId = ctx.query.id
        const profileData = await Api(ctx).getUserInfo(Number(userId))
        if (!user) {
            return {
                props: {
                    profileData: null
                },
                redirect: {
                    permanent: false,
                    destination: '/'
                }
            }
        } else {
            return {
                props: {
                    profileData
                },
            }
        }
    } catch (error) {
        return {
            props: {
                profileData: null
            }
        }
    }
})