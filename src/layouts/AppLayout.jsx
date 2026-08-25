import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function AppLayout() {
  return (
    <>
      <Sidebar />

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;