import {
  Dashboard,
  Person,
  Settings,
  LockPerson,
} from "@mui/icons-material";

export const links = [
  { name: "Dashboard", link: "/dashboard", icon: Dashboard },
  {
    name: "System Management",
    icon: Settings,
    children: [
      {
        name: "Users",
        link: "/dashboard/users",
        icon: Person,
      },
      { name: "Roles", link: "/dashboard/roles", icon: LockPerson },
    ],
  },
];
