import { Home, Profile, SignIn, SignUp } from "@/pages";
import Events from "./pages/Events";
import SingleEvent from "./pages/singleEvent";
import OrganizationProfile from "./pages/OrganizationProfile";
import UserProfile from "./pages/UserProfile";

export const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Events",
    path: "/events",
    element: <Events />,
  },
  {
    name: "Single Event",
    path: "/events/:eventId", // Dynamic route for single event
    element: <SingleEvent />, // Single event component
  },

];


export default routes;
