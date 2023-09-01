import React from 'react'
import Modal from 'react-modal';
import {apiTransport} from "@/helper/helper";

export default function Delete(props) {
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
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" onClick={() => {props.toggle()}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Apakah anda yakin untuk menghapus data ini?<br/>Tindakan ini tidak dapat dikembalikan.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => {props.toggle()}} className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                        <button type="button" onClick={() => {props.onDelete()}} className="btn btn-danger">Hapus</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}