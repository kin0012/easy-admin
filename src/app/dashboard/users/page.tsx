"use client";
import { getUsers } from "@/data/user";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
];

export default function Page() {
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    async function fetchProducts() {
      const users = await getUsers();
      setRows(users);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">Customers</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button color="inherit">Import</Button>
              <Button color="inherit">Export</Button>
            </Stack>
          </Stack>
          <div>
            <Button variant="contained">Add</Button>
          </div>
        </Stack>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </Stack>
    </>
  );
}
