"use client"

import React, { useEffect, useState } from "react";
import { apiTransport, checkToken,} from "@/helper/helper";
import { useRouter } from "next/navigation";

import Top from "@/component/top";
import Empty from "@/component/empty";
import Header from "@/component/header";
import Delete from "@/component/delete";
import Detail from "@/component/detail";
import Add from "@/component/add";
import Edit from "@/component/edit";

export default function Employee() {
    const router = useRouter()
    const tableHeader = ["No", "Nama", "Email", "Aksi"]

    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        photo: "",
        gender: "",
    })

    const [errorMessage, setErrorMessage] = useState("")

    const [modalAdd, setModalAdd] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)

    useEffect(function(){
        checkToken(router)
        fetchEmployees()
    },[])

    function toggleModalAdd() { setModalAdd((value) => !value) }
    function toggleModalDelete() { setModalDelete((value) => !value) }
    function toggleModalDetail() { setModalDetail((value) => !value) }
    function toggleModalUpdate() { setModalUpdate((value) => !value) }

    async function fetchEmployees() {
        const [body, ok] = await apiTransport("GET", "/employee")
        if(!ok) {
            setErrorMessage(body["msg"])
            return
        }
        const data = body["data"]["result"]
        setEmployees(data)
    }

    async function getEmployee(uuid) {
        const path = `/employee/${uuid}`
        const [body, ok] = await apiTransport("GET", path)
        if (!ok) {
            setErrorMessage(body["msg"])
            return
        }

        setEmployee(body["data"]["result"])
        toggleModalUpdate()
    }

    async function deleteEmployee(uuid) {
        const path = `/employee/${uuid}`
        const [body, ok] = await apiTransport("DELETE", path)
        if (!ok) {
            toggleModalDelete()
            setErrorMessage(body["msg"])
            return
        }

        toggleModalDelete()
        await fetchEmployees()
    }

    async function addEmployee(e) {
        e.preventDefault()

        const path = "/employee"
        const [body, ok] = await apiTransport("POST", path, employee)
        if (!ok) {
            toggleModalAdd()
            setErrorMessage(body["data"]["msg"])
            return
        }

        toggleModalAdd()
        await fetchEmployees()
    }

    async function updateEmployee(e, uuid) {
        e.preventDefault()

        const path = `/employee/${uuid}`
        const [body, ok] = await apiTransport("PUT", path, employee)
        if (!ok) {
            toggleModalUpdate()
            setErrorMessage(body["data"]["msg"])
            return
        }

        toggleModalUpdate()
        await fetchEmployees()
    }

    return (
        <main className={"d-flex w-100 justify-content-center position-relative"}>
            <div className={"mt-5 w-50"}>
                <Header
                    path={"/employee"}
                    logout={() => {
                    }}
                ></Header>

                <Top
                    title={"Daftar Pengguna"}
                    action={toggleModalAdd}
                ></Top>
                <Add
                    type={"employee"}
                    title={"Tambah Pegawai"}
                    data={employee}
                    isOpen={modalAdd}
                    toggle={toggleModalAdd}
                    setDataValue={setEmployee}
                    onSubmit={(e) => addEmployee(e)}
                ></Add>

                {
                    employees.length === 0 &&
                    <Empty image={"/empty.png"} description={"Tidak ada ada pegawai"}></Empty>
                }

                {
                    employees.length !== 0 &&
                    <section className={"mt-2 border border-1 rounded-2"}>
                        <table className={"p-3 w-100 overflow-hidden"}>
                            <thead className={"bg-body-secondary"}>
                            <tr className={""}>
                                {tableHeader.map((header) =>
                                    <th key={header} scope={"col"}
                                        className={"fw-light text-center p-3"}> {header} </th>
                                )}
                            </tr>
                            </thead>
                            <tbody className={""}>
                            {
                                employees.map((v, i) =>
                                    <tr key={i}>
                                        <td className={"p-2 text-center"}>{i + 1}</td>
                                        <td className={"p-2 text-center"}>{v["name"]}</td>
                                        <td className={"p-2 text-center"}>{v["email"]}</td>
                                        <td className={"d-flex justify-content-center align-items-center p-2"}>
                                            <button onClick={toggleModalDetail} className={"btn"}>
                                                <i className={"bi-eye-fill"}></i>
                                            </button>
                                            <Detail
                                                type={"employee"}
                                                uuid={v["uuid"]}
                                                title={"Detail pegawai"}
                                                isOpen={modalDetail}
                                                toggle={toggleModalDetail}
                                                defaultPic={"/dummy.png"}
                                            ></Detail>
                                            <button
                                                onClick={async () => {
                                                    await getEmployee(v["uuid"])
                                                }}
                                                className={"btn"}>
                                                <i className={"bi-pen-fill"}></i>
                                            </button>
                                            <Edit
                                                type={"employee"}
                                                data={employee}
                                                isOpen={modalUpdate}
                                                toggle={toggleModalUpdate}
                                                title={"Update data pegawai"}
                                                onSubmit={async (e) => { await updateEmployee(e, v["uuid"]) }}
                                                setDataValue={setEmployee}
                                            ></Edit>
                                            <button onClick={toggleModalDelete} className={"btn"}>
                                                <i className={"bi-trash3-fill"}></i>
                                            </button>
                                            <Delete
                                                isOpen={modalDelete}
                                                title={"Hapus data pegawai"}
                                                toggle={toggleModalDelete}
                                                onDelete={() => {
                                                    deleteEmployee(v["uuid"])
                                                }}
                                            ></Delete>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </section>
                }

                {
                    errorMessage.length !== 0 &&
                    <section className={"bg-danger rounded-2 mt-3 p-3"}>
                        {errorMessage}
                    </section>
                }

            </div>
        </main>
    );
}
