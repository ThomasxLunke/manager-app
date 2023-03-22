"use client";
import Modal from "react-modal";
import Button from "./Button";
import { useState } from "react";
import { deleteProject } from "@/lib/api";
import { useRouter } from "next/navigation";



const DeleteProject = ({projectId}) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        deleteProject(projectId)
        closeModal();
        router.replace("/home");
    };

    return (
        <div>
            <Button intent="delete" onClick={() => openModal()}>
                Delete project
            </Button>

            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-2/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6 text-center">Do you really want to delete this project ?</h1>
                <form className="flex items-center justify-center" onSubmit={handleSubmit}>
                    <Button type="submit" intent="delete">Delete</Button>
                </form>
            </Modal>
        </div>
    )
}

export default DeleteProject
