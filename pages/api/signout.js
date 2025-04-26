import { serialize } from "cookie";

export default async function signout(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME, "", {
      httpOnly: true,
      path: "/",
      expires: new Date(1998, 28),
    })
  );
  res.status(201);
  res.end();
}