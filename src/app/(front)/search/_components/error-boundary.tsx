"use client";

import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorComponentProps {
  error: Error;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => (
  <div className="flex flex-col items-center justify-center p-4">
    <h2 className="text-xl font-bold">Something went wrong</h2>
    <p className="text-muted-foreground">{error.message}</p>
  </div>
);

interface SearchErrorBoundaryProps {
  children: ReactNode;
}

export const SearchErrorBoundary = ({ children }: SearchErrorBoundaryProps) => (
  <ReactErrorBoundary
    FallbackComponent={ErrorComponent}
    onError={(error: Error) => {
      // Log error to your error tracking service
      console.error("Search error:", error);
    }}
  >
    {children}
  </ReactErrorBoundary>
);
