import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/lib/async";
import Image from 'next/image';

const getData = async () => {
  //await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greeting = async () => {

  let profilePic
  const user = await getData().then((value) => {
    profilePic = value.profilePic !== null ? value.profilePic : "/base-profil-pic.png"
    return value
  });



  return (
    <Card className="w-full py-4 relative flex justify-between">

      <div>
        <div className="mb-4">
          <h1 className="text-3xl text-gray-700 font-bold mb-4">
            Hello, {user.firstName}!
          </h1>
          <h4 className="text-xl text-gray-400">
            Check your daily tasks and schedule
          </h4>
        </div>
        <div>
          <Button size="large">Today's Schedule</Button>
        </div>
      </div>

      <div>
        <div className="w-40 h-40 rounded-xl overflow-hidden">
          <Image
            src={profilePic}
            className="object-cover"
            alt="Profile Picture"
            width={500}
            height={500}
          />
        </div>
      </div>

    </Card>
  );
};

export default Greeting;