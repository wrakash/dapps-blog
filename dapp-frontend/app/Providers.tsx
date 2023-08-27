"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { StoreProvider } from "easy-peasy";
import { store } from "../store/easy-peasy";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../custom-react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer />
        </QueryClientProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default Providers;
