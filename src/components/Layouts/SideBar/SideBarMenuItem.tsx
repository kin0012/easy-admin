import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import {
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ElementType, useState } from "react";

type MenuItemPropTypes = {
  name: string;
  link: string;
  icon?: ElementType<any>;
  children?: MenuItemPropTypes[];
};

type MenuItemProps = {
  drawerOpen: boolean;
  menuItem: MenuItemPropTypes;
};

export default function SideBarMenuItem({
  menuItem,
  drawerOpen,
}: MenuItemProps) {
  const { name, icon, link, children } = menuItem;
  const isExpandable = children && children.length > 0;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const MenuItemRoot = (
    <ListItem
      key={name}
      disablePadding
      sx={{ display: "block" }}
      onClick={handleClick}
    >
      <ListItemButton
        LinkComponent={Link}
        href={link}
        sx={{
          minHeight: 48,
          justifyContent: drawerOpen ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: drawerOpen ? 1 : "auto",
            justifyContent: "center",
          }}
        >
          {icon && <Icon component={icon} />}
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: drawerOpen ? 1 : 0 }} />
        {drawerOpen && isExpandable && open && <ExpandLess />}
        {drawerOpen && isExpandable && !open && <ExpandMore />}
      </ListItemButton>
    </ListItem>
  );

  const MenuItemChildren =
    isExpandable && drawerOpen ? (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List sx={{ paddingLeft: "24px" }}>
          {children.map((item, index) => (
            <SideBarMenuItem
              menuItem={item}
              drawerOpen={drawerOpen}
              key={index}
            />
          ))}
        </List>
      </Collapse>
    ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
}
