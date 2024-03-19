"use client";
import { createTheme } from "@/styles/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import {
  StyledEngineProvider,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();
  
  return (
    <StyledEngineProvider>
      <CssVarsProvider theme={theme} >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}
