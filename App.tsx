import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import TrackView from "./pages/TrackView";
import ModuleView from "./pages/ModuleView";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import TracksSelection from "./pages/TracksSelection";
import TrackDetail from "./pages/TrackDetail";
import StageDetail from "./pages/StageDetail";
import TaskDetail from "./pages/TaskDetail";

function Router() {
  return (
     <Switch>
      <Route path={"/"} component={Feed} />
      <Route path={"/feed"} component={Feed} />
      <Route path={"/login"} component={Login} />
      <Route path={"/home"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/tracks"} component={TracksSelection} />
      <Route path={"/track/:id"} component={TrackDetail} />
      <Route path={"/stage/:id"} component={StageDetail} />
      <Route path={"/task/:id"} component={TaskDetail} />
      <Route path={"/track-old/:id"} component={TrackView} />
      <Route path={"/module/:id"} component={ModuleView} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
