import Card from "./Card";
import SidebarLink from "./SidebarLink";
import SignoutButton from "./SignoutButton";

const links = [
  {
    label: "Home",
    icon: "Grid",
    link: "/home"
  },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  {
    label: "Profile",
    icon: "User",
    link: "/profile"
  },

];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap p-3">
      {links.map((link) => (
        <SidebarLink key={link.link} link={link} />
      ))}
      <SignoutButton />
    </Card>
  );
};

export default Sidebar;
