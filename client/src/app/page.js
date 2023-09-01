"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            router.push("/login")
            return
        }

        router.push("/employee")
    }, []);

    return (
        <main
            className={"d-flex w-100 min-vw-100 min-vh-100 justify-content-center align-items-center position-relative"}
        >
            <div className={"fs-4"}>
                Sedang memuat...
            </div>
        </main>
    )
}
