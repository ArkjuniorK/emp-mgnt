import React, {useEffect} from 'react'
import Link from "next/link";

export default function Header(props) {

    const path = props.path
    const logout = props.logout()

    const links = [
        {
            path: "/employee",
            name: "Pegawai"
        },
        {
            path: "/user",
            name: "Pengguna"
        }
    ]

    return (
        <section className={"d-flex border p-3 border-1 rounded-2 align-items-center justify-content-between"}>

            <div className={"fw-bold flex-shrink-0"}>
                <i className={"bi-people-fill fs-3"}></i>
            </div>

            <div className={"flex-shrink-0"}>
                {
                    links.map((v, i) => {
                        const active = v["path"] === path

                        return (
                            <Link
                                key={i}
                                href={v["path"]}
                                className={active ? "fw-medium text-body-emphasis me-2 fw-light text-decoration-none" :  "text-body-emphasis me-2 fw-light text-decoration-none" }>
                                {v["name"]}
                            </Link>
                        );
                        }
                    )
                }
            </div>

            <div>
                <button onClick={() => logout()} className={"btn btn-danger flex-shrink-0"}>
                    <i className={"bi-box-arrow-right"}></i>
                    <span className={"ms-1"}> Keluar </span>
                </button>
            </div>

        </section>
    );
}