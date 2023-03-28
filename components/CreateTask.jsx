"use client"
import Button from "./Button"
import Modal from "react-modal";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { createNewTask } from "@/lib/api";


const initial = { name: "", description: "", status: "" };

const CreateTask = ({projectId}) => {

    const [formState, setFormState] = useState({ ...initial });
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter()

    const handleSubmit = useCallback(
        
        async (e) => {
            e.preventDefault();
            try {
                await createNewTask(formState.name, formState.description, formState.status, projectId)
                closeModal();
                router.refresh();
            }
            catch (e) {
                closeModal();
                setError(`Could not edit`);
            } finally {
                closeModal();
                setFormState({ ...initial });
            }
        },
        [
            formState.name,
            formState.description,
            formState.status,
        ]
    );
    
    return (
        <div>
            <Button intent="text" className="text-violet-600" onClick={() => { openModal() }}>
                + Create new task
            </Button>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-2/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6 text-center">Create new task</h1>
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
                        <Button type="submit" intent="primary">Create</Button>
                        <Button intent="cancel" onClick={() => closeModal()}>Cancel</Button>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default CreateTask
