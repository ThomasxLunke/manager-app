"use client"
import { Edit, Check } from "react-feather"
import clsx from "clsx"
import { useState } from "react"
import Input from "./Input"
import { updateProjectName } from "@/lib/api"
import { useRouter } from "next/navigation"



const EditProjectName = ({ title, projectId }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [projectName, setProjectName] = useState(title)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            await updateProjectName(projectName, projectId)
            router.refresh();
        }
        catch (e) {
            setError(`Could not edit`);
        }
        
    };

    return (
        <div>
            <div className="text-3xl text-gray-600 font-bold">
                {isEditing ? (
                    <div className="flex items-center gap-6">
                        <input 
                            type="text" 
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="text-2xl text-gray-600 font-bold w-full p-0"
                            autoFocus
                        />
                        <Check
                            size={25}
                            className={clsx(
                                "stroke-green-600 transition duration-200 ease-in-out",
                            )}
                            onClick={() => { setIsEditing(false); handleSubmit() }}
                        />
                    </div>

                ) : (
                    <div className="flex items-center gap-4">
                        <p>{title}</p>
                        <Edit
                            size={25}
                            className={clsx(
                                "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
                            )}
                            onClick={() => { setIsEditing(true) }}
                        />
                    </div>
                )
                }
            </div>

        </div>
    )
}

export default EditProjectName
