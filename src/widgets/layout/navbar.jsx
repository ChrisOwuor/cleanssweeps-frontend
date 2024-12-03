import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../../contexts/authContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import EventModel from "../cards/EventModel";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, loading, name, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const HandleEventModal = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden gap-2 lg:flex">
          {open && <EventModel open={open} setOpen={setOpen} />}
          {user && user.type === "organization" && (
            <Button
              variant="gradient"
              size="sm"
              fullWidths
              onClick={HandleEventModal}
            >
              Create Event
            </Button>
          )}

          {user && user.type === "volunteer" && (
            <Link to="/events">
              <Button variant="gradient" size="sm" fullWidth>
                Events
              </Button>
            </Link>
          )}

          {!user && (
            <Link to="/sign-in">
              <Button variant="text" size="sm" color="white" fullWidth>
                Login
              </Button>
            </Link>
          )}
          {!user && (
            <Link to="/sign-up">
              <Button variant="text" size="sm" color="white" fullWidth>
                Sign Up
              </Button>
            </Link>
          )}

          {user && user.type === "organization" && (
            <Link to={`/organization/${user.id}`}>
              <Button variant="text" size="sm" color="white" fullWidth>
                Profile
              </Button>
            </Link>
          )}
          {user && user.type === "volunteer" && (
            <Link to={`/user/${user.id}`}>
              <Button variant="text" size="sm" color="white" fullWidth>
                Profile
              </Button>
            </Link>
          )}
          {user && user && (
            <p>
              <Button variant="gradient" size="sm" fullWidth onClick={logout}>
                Logout
              </Button>
            </p>
          )}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto space-y-10 text-blue-gray-900">
          {user && user.type === "organization" && (
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              onClick={HandleEventModal}
            >
              Create Event
            </Button>
          )}

          {user && user.type === "volunteer" && (
            <Link to="/events" className="my-4">
              <Button variant="gradient" size="sm" fullWidth>
                Events
              </Button>
            </Link>
          )}

          {!user && (
            <Link to="/sign-in" className="my-4">
              <Button variant="text" size="sm" fullWidth>
                Login
              </Button>
            </Link>
          )}
          {!user && (
            <Link to="/sign-up" className="my-4">
              <Button variant="text" size="sm" fullWidth>
                Sign Up
              </Button>
            </Link>
          )}

          {user && user.type === "organization" && (
            <Link to={`/organization/${user.id}`} className="my-4">
              <Button variant="text" size="sm" fullWidth>
                Profile
              </Button>
            </Link>
          )}
          {user && user.type === "volunteer" && (
            <Link to={`/user/${user.id}`} className="my-4">
              <Button variant="text" size="sm" fullWidth>
                Profile
              </Button>
            </Link>
          )}
          {user && user && (
            <p>
              <Button variant="gradient" size="sm" fullWidth onClick={logout}>
                Logout
              </Button>
            </p>
          )}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Clean Sweeps",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-kit-react"
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        free download
      </Button>
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
