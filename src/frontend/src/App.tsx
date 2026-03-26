import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import AssessPage from "./pages/AssessPage";
import DashboardPage from "./pages/DashboardPage";
import JobDetailPage from "./pages/JobDetailPage";
import LandingPage from "./pages/LandingPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const assessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assess",
  component: AssessPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/job/$title",
  component: JobDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  assessRoute,
  dashboardRoute,
  jobDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
