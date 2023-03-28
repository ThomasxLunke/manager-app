import TaskCard from "@/components/TaskCard"
import { getUserFromCookie } from "@/lib/auth"
import { db } from "@/lib/db"
import { cookies } from "next/headers"

export const revalidate = 100

const getData = async (id) => {
    const user = await getUserFromCookie(cookies())

    const project = await db.project.findFirst({
        where: {
            id,
            ownerId: user?.id
        },
        select: {
            tasks: {
                where: {
                    deleted: false
                }
            },
            name: true,
            id: true
        }
    })
    return project
}


export default async function ProjectPage({ params }) {
    const order = { COMPLETED: 1, STARTED: 2, NOT_STARTED: 3 };
    const project = await getData(params.id).then((value) => {
        const tasks = value.tasks
        tasks.sort(function (a, b) {
            return order[a.status] - order[b.status]
        })
        return value
    });

    return (
        <div className="h-full overflow-y-auto w-full pl-4">
            <TaskCard tasks={project.tasks} title={project.name} projectId={project.id} />
        </div>
    )
}