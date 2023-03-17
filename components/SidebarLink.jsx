"use client"; //for client component
import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

//you can't pass a component as a property (everything not serializable(generally something including logic ),
// not static data ), from a server component to client component

//here, this client component is rendered inside a server component (Sidebar)
//so here an object (that is serializable)

//think that there is a redline between server component and client component
//to pass props accross this redline, you need your props to be serializable data (string, int, object, ...)
const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }) => {
    const pathname = usePathname();
    let isActive = false;

    if (pathname === link.link) {
        isActive = true;
    }

    const Icon = icons[link.icon];
    //here, Icon is replaced by Settings, User, Grid or Calendar, and use react-feather

    return (
        <Link href={link.link} className="w-full flex justify-center items-center">
            <Icon
                size={40}
                className={clsx(
                    "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
                    isActive && "stroke-violet-600"
                )}
            />
        </Link>
    );
};

export default SidebarLink;