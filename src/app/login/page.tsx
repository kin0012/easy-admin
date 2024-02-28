"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
} from "@mui/material";
import { authenticate } from "../actions/login";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState<string | undefined, FormData>(
    authenticate,
    undefined
  );

  return (
    <Container maxWidth="xs" className="flex flex-col">
      <Box className="items-center justify-center flex flex-row min-h-screen">
        <Card className="shadow-2xl rounded-md">
          <CardContent>
            <Box component="form" action={dispatch} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                aria-disabled={pending}
              >
                Sign In
              </Button>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
