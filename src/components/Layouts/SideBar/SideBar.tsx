import { Box, CSSObject, Divider, List, Stack, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { ChevronLeft, Menu } from "@mui/icons-material";
import SideBarMenuItem from "./SideBarMenuItem";
import { links } from "@/lib/routes";

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type DrawerType = {
  onToggle?: () => void;
  open: boolean;
};

export default function SideBar({ open, onToggle }: DrawerType) {
  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "var(--mui-palette-neutral-950)",
        //     color: "var(--mui-palette-common-white)",
        //   },
        // }}
      >
        <DrawerHeader>
          <IconButton onClick={onToggle}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Divider />
        </DrawerHeader>
        <List>
          {links.map((menu: any, index: any) => (
            <SideBarMenuItem menuItem={menu} drawerOpen={open} key={index} />
          ))}
        </List>
      </Drawer>
    </>
  );
}
