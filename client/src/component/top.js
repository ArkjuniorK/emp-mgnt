import React from 'react'


export default function Top(props) {
    const title     = props.title

    return (
        <section className={"mt-4 p-2  d-flex justify-content-between align-items-center"}>
            <span className={"fw-medium"}> {title} </span>
            <button onClick={() => {props.action()}} className={"btn btn-secondary flex-shrink-0"}>
                <i className={"bi-plus-lg"}></i>
                <span className={"ms-1"}> Tambah </span>
            </button>
        </section>
    )
}