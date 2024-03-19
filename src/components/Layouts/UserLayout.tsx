"use client";
import { Box, Container, GlobalStyles, Toolbar, styled } from "@mui/material";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { useState } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <SideBar open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
          }}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Header open={isOpen} />
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
