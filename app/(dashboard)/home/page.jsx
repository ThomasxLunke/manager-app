import Greeting from "@/components/Greeting";
import GreetingSkeleton from "@/components/GreetingSkeleton";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import NewProject from "@/components/NewProject";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
    //await delay(2000);
    const user = await getUserFromCookie(cookies());
    const projects = await db.project.findMany({
        where: {
            ownerId: user?.id,
            deleted: false
        },
        include: {
            tasks: {
                where: {
                    deleted: false
                }
            },
        },
    });

    return { projects };
};
export default async function Page() {

    //1st : THIS LOAD BEFORE RENDER THE JSX BECAUSE 
    // THE DATA IS LOADED INSIDE THIS COMPONENT (getData())
    // IT'S A SERVER COMPONENT SO THE DATA FETCH IS SERVER-SIDE 
    // (the datas are fetched when the component is rendered)
    const { projects } = await getData();

    //2nd : THEN THE JSX LOAD
    return (
        <div className="h-full pl-3 w-full overflow-x-hidden">
            <div className=" h-full items-stretch justify-center min-h-[content] mr-6">
                <div className="flex-1 grow flex">
                    {/* 3th : THIS LOAD */}
                    <Suspense fallback={<GreetingSkeleton />}>
                        <Greeting />
                    </Suspense>
                </div>
                <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
                    {
                        projects.map((project) => (
                            <div className="w-1/3 p-3" key={project.id}>
                                <Link href={`/project/${project.id}`}>
                                    <ProjectCard project={project} />
                                </Link>
                            </div>
                        ))
                    }
                    <div className="w-1/3 p-3"> <NewProject/> </div>
                </div>
            </div>
        </div>
    );
}