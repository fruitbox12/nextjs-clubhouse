import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Button } from "../components/Button";
import { ConversationCard } from "../components/ConversationCard";
import { StartRoomModal } from "../components/StartRoomModal";
import { Header } from "../components/Header";
import { Axios } from "../core/axios";
import { checkAuth } from "../utils/checkAuth";

export default function RoomsPage({ rooms }) {
    const [visibleModal, setVisibleModal] = React.useState(false)

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Create Next App</title>
            </Head>
            <Header />
            <div className="container">
                <div className="mt-40 d-flex align-items-center justify-content-between">
                    <h1>All conversations</h1>
                    <Button onClick={() => setVisibleModal(true)} color="green">
                        + Start room
                    </Button>
                </div>
                {visibleModal && <StartRoomModal onClose={() => setVisibleModal(false)} />}
                <div className="grid mt-30">
                    {
                        rooms.map(obj => (
                            <Link key={obj.id} href={`/rooms/${obj.id}`}>
                                <a>
                                    <ConversationCard
                                        title={obj.title}
                                        guests={obj.guests}
                                        avatars={obj.avatars}
                                        guestsCount={obj.guestsCount}
                                        speakersCount={obj.speakerCount}
                                    />
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const user = await checkAuth(ctx)

        if (!user) {
            return {
                props: {},
                redirect: {
                    destination: '/'
                }
            }
        }
        const { data } = await Axios.get('/rooms.json')
        return {
            props: {
                user,
                rooms: data
            }
        }
    } catch (error) {
        return {
            props: {
                rooms: []
            }
        }
    }
}