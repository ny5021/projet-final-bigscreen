import { Outlet } from "react-router-dom";
import "../../../assets/css/admin.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { Helmet } from "react-helmet";

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Bigscreen - administration</title>
        <meta
          name="description"
          content="Application sondage Bigscreen partie administration"
        />
      </Helmet>
      <AdminSidebar />
      <div className="main">
        <AdminNavbar />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
