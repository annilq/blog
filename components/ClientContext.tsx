"use client";

import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/joy";
import useSnackbar from "@/store/useSnackbar";

const ClientContext = ({ children }: { children: React.ReactNode }) => {
    const { message, openSnackbar, setOpenSnackbar } = useSnackbar();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // 页面挂载完成
        return () => {
            setIsMounted(false); // 页面卸载
        };
    }, []);

    if (!isMounted) {
        return false;
    }

    return (
        isMounted ? (
            <>
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
            </>
        ) : <div>isMounting</div>
    );
};

export default ClientContext;
