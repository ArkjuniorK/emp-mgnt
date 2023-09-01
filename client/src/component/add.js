
import React, {useState} from "react";
import Modal from 'react-modal';

export default function Add(props) {
    const type = props.type
    const title = props.title
    const data = props.data

    function setEmployeeDataValue(field, value) {
        console.log(field, value)
        props.setDataValue((val) => ({
            ...val,
            [field]: value,
        }))
    }

    function setUserDataValue(field, value) {
        props.setDataValue((val) => ({
            ...val,
            [field]: value,
        }))
    }

    function selectImage(e) {
        const fr = new FileReader()
        const img = e.target.files[0]

        fr.readAsArrayBuffer(img)
        fr.onload = async function () {
            const blob = new Blob([fr.result])
            const data = await blob.text()
            setEmployeeDataValue("photo", data)
        }
    }

    return (
        <Modal
            isOpen={props.isOpen}
            className={"bg-secondary p-3 w-25 my-5 mx-auto top-100 rounded-2"}
            overlayClassName={"bg-black bg-opacity-50 position-fixed w-100 top-0 bottom-0"}
            ariaHideApp={false}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" onClick={() => {
                            props.toggle()
                        }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mt-2">

                        {type === "employee" &&
                            <form className={"mb-3 mt-4"} onSubmit={(e) => props.onSubmit(e)}>
                                <input
                                    type={"text"}
                                    value={data?.name}
                                    placeholder={"Nama Pegawai"}
                                    className={"form-control mb-3 fs-6 p-2"}
                                    onChange={(e) => {
                                        setEmployeeDataValue("name", e.target.value)
                                    }}
                                />
                                <input
                                    type={"email"}
                                    value={data?.email}
                                    placeholder={"Email"}
                                    className={"form-control mb-3 p-2 fs-6"}
                                    onChange={(e) => {
                                        setEmployeeDataValue("email", e.target.value)
                                    }}
                                />
                                <select
                                    className="form-select mb-3" defaultValue={"L"} value={data?.gender}
                                    onChange={(e) => {
                                        setEmployeeDataValue("gender", e.target.value)
                                    }}>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                <input
                                    id="formFile"
                                    type="file"
                                    accept={"image/jpeg"}
                                    className="form-control mb-3"
                                    onChange={selectImage}
                                />
                                <button type={"submit"} className={"btn btn-light p-2 fw-bold w-100"}>Tambah</button>
                            </form>
                        }

                        {type === "user" &&
                            <form className={"mb-3 mt-4"} onSubmit={(e) => props.onSubmit(e)}>
                                <input
                                    type={"text"}
                                    value={data?.username}
                                    placeholder={"Nama Pengguna"}
                                    className={"form-control mb-3 fs-6 p-2"}
                                    onChange={(e) => {
                                        setUserDataValue("username", e.target.value)
                                    }}
                                />
                                <input
                                    type={"password"}
                                    value={data?.password}
                                    placeholder={"Kata Sandi"}
                                    className={"form-control mb-3 p-2 fs-6"}
                                    onChange={(e) => {
                                        setUserDataValue("password", e.target.value)
                                    }}
                                />
                                <input
                                    type="checkbox"
                                    value={data?.su}
                                    id="flexCheckDefault"
                                    className="form-check-input"
                                    onChange={(e) => {
                                        setUserDataValue("su", e.target.value)
                                    }}
                                />
                                <button type={"submit"} className={"btn btn-light p-2 fw-bold w-100"}>Tambah</button>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </Modal>
    );
}