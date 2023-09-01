import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import Image from "next/image";
import {apiTransport} from "@/helper/helper";

export default function Detail(props) {

    const type  = props.type
    const uuid  = props.uuid
    const title = props.title
    const defaultPic = props.defaultPic

    const [data, setData] = useState({})

    useEffect(() => {
        if(props.isOpen) {
            getData()
        }
    }, [props.isOpen]);

    async function getData() {
        let path;
        if(type === "employee") path = `employee/${uuid}`
        if(type === "user") path = `user/${uuid}`

        const [body, ok] = await apiTransport("GET", path)
        if (!ok) {
            return
        }

        setData(body["data"]["result"])
    }

    function getGender(gender) {
        if (gender === "L") return "Laki-laki"
        else return "Perempuan"
    }

    function formatImage( buffer ) {
        let binary = '';
        const bytes = new Uint8Array( buffer );
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }

        const image = "data:image/png;base64, " + window.btoa(binary)
        console.log(image)

        return image
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
                            <div className={"w-100"}>
                                <div className={"d-flex justify-content-center"}>
                                    <Image className={"my-3 rounded-circle"}
                                           src={data?.photo?.data.length === 0 ? defaultPic : formatImage(data?.photo?.data)}
                                           height={"100"} width={"100"} alt={'profile'}></Image>
                                </div>
                                <div>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Nama</td>
                                            <td>: {data?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>: {data?.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis Kelamin</td>
                                            <td>: {data ? getGender(data["gender"]) : ""}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                        {type === "user" &&
                            <div className={"w-100"}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td>: {data ? data["username"] : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Super User</td>
                                        <td>: {data ? data["su"] : ""}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </Modal>
    );

}