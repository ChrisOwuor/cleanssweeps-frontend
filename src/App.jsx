import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import PrivateRoute from "./utils/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import OrganizationProfile from "./pages/OrganizationProfile";
import { AuthProvider } from "./contexts/authContext";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <AuthProvider>
        {!(pathname == "/sign-in" || pathname == "/sign-up") && (
          <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
            <Navbar routes={routes} />
          </div>
        )}
        <Routes>
          {routes.map(
            ({ path, element }, key) =>
              element && <Route key={key} exact path={path} element={element} />
          )}
          <Route element={<PrivateRoute />}>
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route
              path="/organization/:orgId"
              element={<OrganizationProfile />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
