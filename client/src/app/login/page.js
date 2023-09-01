"use client"

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { apiTransport } from "@/helper/helper";

export default function Login() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect(function(){
        const token = localStorage.getItem("token")
        if (token) router.push("/")
    }, [])

    async function submit(e)  {
        e.preventDefault()

        const payload = { username, password }
        const [body, ok] = await apiTransport("POST", "/auth/login", payload)
        if (!ok) {
            setMessage(body["msg"])
            return
        }

        const token = body["data"]["token"]
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)

        router.push("/")
    }

    return (
        <main
            className={"d-flex w-100 min-vw-100 min-vh-100 justify-content-center align-items-center position-relative"}>
            <div className={"w-25 border p-3 rounded-2"}>
                <div className={"lead fs-4 mt-2"}>Selamat Datang!</div>
                <div className={"fs-6 fw-light"}>Silahkan masuk untuk menggunakan aplikasi</div>

                {
                    message.length !== 0 &&
                    <div className={"mt-3 bg-danger p-2 rounded"}>Oops, { message.toLowerCase() }</div>
                }

                <form className={"mb-3 mt-4"} onSubmit={submit}>
                    <input
                        type={"text"}
                        value={username}
                        placeholder={"Nama Pengguna"}
                        className={"form-control mb-3 fs-6 p-2"}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type={"password"}
                        value={password}
                        placeholder={"Kata Sandi"}
                        className={"form-control mb-4 p-2 fs-6"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type={"submit"} className={"btn btn-info p-2 fw-bold mt-3 w-100"}>Masuk</button>
                </form>
            </div>
        </main>
    );
    
}