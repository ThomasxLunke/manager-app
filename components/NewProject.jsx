"use client";
import { createNewProject } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

//It's a React Portal : it's rendered outside of the react tree
//look at dashboard/project/layout l 14
Modal.setAppElement("#modal");
const initial = { name: "" }

const NewProject = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const router = useRouter()
  const [formState, setFormState] = useState({ ...initial });


  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewProject(formState.name);
    closeModal();
    setFormState({ ...initial });
    router.refresh()
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/3 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6 text-center">New Project</h1>
        <form className="flex items-center flex-col" onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className="mb-6"
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;