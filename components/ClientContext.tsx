"use client";

import React from "react";
import { Snackbar } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import useSnackbar from "@/store/useSnackbar";
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from "next-auth/react"

/*
 * Joy 组件的字体族默认是 Roboto / Helvetica / Arial，跟 app/globals.css 里定的中文字体栈
 * 是两套 —— 按钮、输入框、弹窗里的中英文会跟正文渲染成不同字体，中英混排时尤其明显。
 * 这里把 Joy 指回同一个 :root 变量，全站字体栈只剩一份定义。
 */
const theme = extendTheme({
    fontFamily: {
        body: "var(--font-sans, sans-serif)",
        display: "var(--font-sans, sans-serif)",
        code: "var(--font-mono, monospace)",
    },
});

const ClientContext = ({ children }: { children: React.ReactNode }) => {
    const { message, openSnackbar, setOpenSnackbar } = useSnackbar();

    return (
        <ThemeProvider attribute="data-joy-color-scheme">
            <CssVarsProvider theme={theme}>
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
