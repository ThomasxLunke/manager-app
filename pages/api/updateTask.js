import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  await db.task.update({
    where: {
        id: req.body.id
    },
    data: {
      name: req.body.name,
      description: req.body.description
    },
  });

  res.json({ data: { message: "ok" } });
}