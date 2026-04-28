import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import Trainings from "./pages/Trainings";
import Opportunities from "./pages/Opportunities";
import Admin from "./pages/Admin";
import { useAuth } from "./_core/hooks/useAuth";
import MainLayout from "./components/MainLayout";

function Router() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/programs"} component={Programs} />
      <Route path={"/trainings"} component={Trainings} />
      <Route path={"/opportunities"} component={Opportunities} />
      
      {/* Protected routes */}
      {isAuthenticated && <Route path={"/dashboard"} component={Dashboard} />}
      {isAuthenticated && <Route path={"/admin"} component={Admin} />}
      
      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <MainLayout>
            <Router />
          </MainLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
