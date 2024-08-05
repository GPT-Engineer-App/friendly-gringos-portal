import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import NotFound from "./pages/NotFound";
import { SupabaseAuthProvider } from "./integrations/supabase/auth";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

const ErrorFallback = ({ error }) => (
  <div className="text-red-500 p-4">
    <h2>Oops! Something went wrong.</h2>
    <pre>{error.message}</pre>
  </div>
);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;
