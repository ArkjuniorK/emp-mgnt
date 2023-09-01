import React from 'react'
import Image from "next/image";


export default function Empty(props) {
    const image         = props.image
    const description   = props.description

    return (
        <section className={"mt-2 p-5 border border-1 rounded-2"}>
            <div className={"text-center"}>
                <Image src={image} alt={"Empty data"} width={"200"} height={"200"}></Image>
                <div className={"fw-light mt-2"}> {description} </div>
            </div>
        </section>
    )
}