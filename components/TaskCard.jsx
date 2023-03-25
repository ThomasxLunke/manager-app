import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import DeleteProject from "./DeleteProject";
import Task from "./Task";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: true,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TaskCard = async ({ title, tasks, projectId }) => {
  const data = tasks || (await getData());


  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-3xl text-gray-600 font-bold">{title}</span>
        </div>
        <div className="flex">
          <Button intent="text" className="text-violet-600">
            + Create new task
          </Button>
          <DeleteProject projectId={projectId} />

        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <Task id={task.id} name={task.name} description={task.description} key={task.id} />
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;