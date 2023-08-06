import { useContext, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";


interface User {
    loggedIn: boolean;
}
const UserContext = createContext<User | null>(null);

const useAuth = (): boolean => {
  const user = useContext(UserContext);
  // return user && user.loggedIn;
  return user?.loggedIn ?? false;
};

export function ProtectedRoutes() {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" replace state={{from: location}} />;
}



// const useAuth = (): boolean => {
//     // const user = {loggedIn: false};
//     const { user } = useContext();
//     return user && user.loggedIn;
// }

// export function ProtectedRoutes() {
//     const location = useLocation()
//         const isAuth = useAuth();
//     return isAuth ? <Outlet></Outlet> : <Navigate to="/" />
// }