"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: ReactNode;
}

const RtkProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default RtkProvider;
