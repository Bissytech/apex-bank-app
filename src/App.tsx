import { Notifications } from "@mantine/notifications";
import { ROUTES } from "./utils/routes";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";

const { AUTH } = ROUTES;

const App = () => {
  return (
    <div>
      <Notifications position="top-right" />
      <Routes>
        <Route path={AUTH.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
