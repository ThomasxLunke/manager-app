import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  
  await db.project.update({
    where: {
        id: req.body.id
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: { message: "ok" } });
}