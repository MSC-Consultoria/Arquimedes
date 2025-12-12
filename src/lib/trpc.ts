import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import React, { PropsWithChildren, useMemo } from "react";
import type { AppRouter } from "../../routers";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://localhost:3000";
  }

  return "";
};

export function TRPCProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const client = useMemo(
    () =>
      trpc.createClient({
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
          }),
        ],
      }),
    []
  );

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
