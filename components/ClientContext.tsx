"use client";

import React from "react";
import { Snackbar } from "@mui/joy";
import useSnackbar from "@/store/useSnackbar";
import { ThemeProvider } from 'next-themes'
import { CssVarsProvider } from '@mui/joy/styles';
import { SessionProvider } from "next-auth/react"

const ClientContext = ({ children }: { children: React.ReactNode }) => {
    const { message, openSnackbar, setOpenSnackbar } = useSnackbar();

    return (
        <ThemeProvider attribute="data-joy-color-scheme">
            <CssVarsProvider>
                <SessionProvider>
                    {children}
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => { setOpenSnackbar(false, ""); }}
                        className="top-32"
                    >
                        {message}
                    </Snackbar>
                </SessionProvider>
            </CssVarsProvider>
        </ThemeProvider>
    );
};

export default ClientContext;
