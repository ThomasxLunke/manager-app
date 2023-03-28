import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import DeleteProject from "./DeleteProject";
import Task from "./Task";
import EditProjectName from "./EditProjectName";
import CreateTask from "./CreateTask";

const TaskCard = async ({ title, tasks, projectId }) => {

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <EditProjectName title={title} projectId={projectId} />
        <div className="flex gap-6">
          <CreateTask projectId={projectId} />
          <DeleteProject projectId={projectId} />
        </div>
      </div>
      <div>
        {tasks && tasks.length ? (
          <div>
            {tasks.map((task) => (
              <Task task={task} key={task.id} />
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