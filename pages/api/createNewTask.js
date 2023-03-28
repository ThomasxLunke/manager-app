import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  let status
  if(req.body.status === "COMPLETED")
    status = TASK_STATUS.COMPLETED
  else if(req.body.status === "STARTED")
    status = TASK_STATUS.STARTED
  else if(req.body.status === "NOT_STARTED")
    status = TASK_STATUS.NOT_STARTED

  await db.task.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      status: status,
      ownerId: user.id,
      projectId: req.body.projectId
    },
  });

  res.json({ data: { message: "ok" } });
}