import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./Home";
import Feed from "./Feed";
import Dashboard from "./Dashboard";
import UserDashboard from "./UserDashboard";
import TrackView from "./TrackView";
import ModuleView from "./ModuleView";
import Admin from "./Admin";
import Login from "./Login";
import TracksSelection from "./TracksSelection";
import TrackDetail from "./TrackDetail";
import StageDetail from "./StageDetail";
import TaskDetail from "./TaskDetail";
import TaskExecution from "./TaskExecution";
import NotFound from "./NotFound";

function Router() {
  return (
     <Switch>
      <Route path={"/"} component={UserDashboard} />
      <Route path={"/feed"} component={Feed} />
      <Route path={"/login"} component={Login} />
      <Route path={"/home"} component={Home} />
      <Route path={"/dashboard"} component={UserDashboard} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/tracks"} component={TracksSelection} />
      <Route path={"/track/:id"} component={TrackDetail} />
      <Route path={"/stage/:id"} component={StageDetail} />
      <Route path={"/task/:id"} component={TaskDetail} />
      <Route path={"/task/:id/execute"} component={TaskExecution} />
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
