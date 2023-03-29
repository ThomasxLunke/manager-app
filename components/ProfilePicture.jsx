"use client"
import React, { useState } from "react"
import Avatar from "react-avatar-edit"
import ReactDOM from 'react-dom'
import Image from "next/image"
import Modal from "react-modal";
import Button from "./Button"
import { updateUseProfilPic } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Edit } from "react-feather"
import clsx from "clsx"

// <img src={preview} alt="preview" />

const ProfilePicture = ({ profilePic, userId }) => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter()

    const onClose = () => {
        setPreview(null)
    }

    const onCrop = view => {
        setPreview(view)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUseProfilPic(preview, userId)
        closeModal();
        router.refresh()
    }


    return (
        <div className="h-40 w-40 overflow-hidden rounded-full relative">
            <Image
                src={profilePic}
                className="object-cover"
                alt="Profile Picture"
                width={500}
                height={500}
                priority={true}
                
            />
            <div    
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center hover:bg-violet-600 rounded px-4 py-2 gap-2 group flex cursor-pointer items-center text-white"
                onClick={() => { setIsEdit(true); openModal() }}
            >
                <Edit
                    size={20}
                    className={clsx(
                        " stroke-white invisible group-hover:visible",
                    )}
                    onClick={() => {}}
                />
                <p className="font-bold invisible group-hover:visible">Edit</p>
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-2/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6 text-center">Create new task</h1>
                <form className="flex justify-center items-center flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <Avatar
                            width={300}
                            height={300}
                            src={image}
                            onCrop={onCrop}
                            onClose={onClose}
                            cropRadius={6}
                        />
                    </div>
                    <div className="flex gap-12">
                        <Button type="submit" intent="primary">Update</Button>
                        <Button intent="cancel" onClick={() => closeModal()}>Cancel</Button>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default ProfilePicture
