"use client"

import { Edit, Trash2 } from "react-feather"
import clsx from "clsx";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { deleteTask, updateTask } from "@/lib/api";
import TextArea from "./TextArea";
import Select from "./Select";



const initial = { name: "", description: "", status: "" };

const Task = ({ task }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter();
    const [formState, setFormState] = useState({ ...initial });

    const [taskStatus, setTaskStatus] = useState(task.status)
    const styleStatus = {
        COMPLETED: "bg-green-500 text-white",
        STARTED: "bg-orange-500",
        NOT_STARTED: "bg-gray-500"
    }

    useEffect(() => {
        setFormState(({ ...formState, description: task.description, name: task.name, status:task.status }))
    }, [])



    const handleSubmit = useCallback(

        async (e) => {
            e.preventDefault();
            if (typeModal === "edit") {
                try {
                    await updateTask(formState.name, formState.description, formState.status, task.id)
                    setTaskStatus(formState.status)
                    closeModal();
                    router.refresh();
                }
                catch (e) {
                    closeModal();
                    setError(`Could not edit`);
                } finally {
                    closeModal();
                }
            }
            else {
                closeModal();
                try {
                    await deleteTask(task.id)
                    router.refresh();
                }
                catch (e) {
                    setError(`Could not edit`);
                }
            }
        },
        [
            formState.name,
            formState.description,
            formState.status,
            typeModal
        ]
    );



    return (
        <div>
            <div className="hover:shadow-inner p-4 hover:rounded-lg flex items-center justify-between group" key={task.id}>
                <div>
                    <div>
                        <span className="text-gray-800">{task.name} </span>
                        <span
                            className={`${taskStatus === "COMPLETED" ? 'bg-green-500' : taskStatus === "STARTED" ? "bg-orange-500" : "bg-red-500"} text-white px-2 `} >{task.status}</span>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm">
                            {task.description}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Edit
                        size={20}
                        className={clsx(
                            "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out hidden group-hover:block",
                        )}
                        onClick={() => { setTypeModal("edit"); openModal() }}
                    />
                    <Trash2
                        size={20}
                        className={clsx(
                            "stroke-gray-400 hover:stroke-red-600 transition duration-200 ease-in-out hidden group-hover:block",
                        )}
                        onClick={() => { setTypeModal("delete"); openModal() }}
                    />
                </div>
            </div>

            {typeModal === "edit" ? (
                <Modal
                    ariaHideApp={false}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                    className="w-2/4 bg-white rounded-xl p-8"
                >
                    <h1 className="text-3xl mb-6 text-center">Edit pannel</h1>
                    <form className="flex justify-center items-center flex-col gap-2" onSubmit={handleSubmit}>
                        <Input
                            required
                            placeholder="Task name"
                            id="input-name"
                            value={formState.name}
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e) =>
                                setFormState((s) => ({ ...s, name: e.target.value }))
                            }
                        />
                        
                        <Select
                            required
                            placeholder="State"
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e) =>
                                setFormState((s) => ({ ...s, status: e.target.value }))
                            }
                            defaultValue={taskStatus}
                        >
                            <option value="NOT_STARTED" >NOT_STARTED</option>
                            <option value="STARTED">STARTED</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </Select>
                        <TextArea
                            required
                            placeholder="Description"
                            value={formState.description}
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e) =>
                                setFormState((s) => ({ ...s, description: e.target.value }))
                            }
                        />

                        <div className="flex gap-12">
                            <Button type="submit" intent="primary">Update</Button>
                            <Button intent="cancel" onClick={() => closeModal()}>Cancel</Button>
                        </div>

                    </form>
                </Modal>) : (

                <Modal
                    ariaHideApp={false}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                    className="w-2/4 bg-white rounded-xl p-8"
                >
                    <h1 className="text-3xl mb-6 text-center">Do you really want to delete this project ?</h1>
                    <form className="flex items-center justify-center gap-12 " onSubmit={handleSubmit}>
                        <Button type="submit" intent="delete">Delete</Button>
                        <Button intent="cancel" onClick={() => closeModal()}>Cancel</Button>
                    </form>
                </Modal>
            )
            }
        </div >

    )
}

export default Task
