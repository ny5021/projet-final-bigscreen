import React, { Suspense, useEffect } from "react";
import SimpleBar from "simplebar";
const AdminNavbar = () => {
  const LogoutBtn = React.lazy(() =>
    import("../../../components/LogoutBtn/LogoutBtn")
  );

  const initializeSimplebar = () => {
    const simplebarElement = document.getElementsByClassName("js-simplebar")[0];

    if (simplebarElement) {
      const simplebarInstance = new SimpleBar(
        document.getElementsByClassName("js-simplebar")[0]
      );

      /* Recalculate simplebar on sidebar dropdown toggle */
      const sidebarDropdowns = document.querySelectorAll(
        ".js-sidebar [data-bs-parent]"
      );

      sidebarDropdowns.forEach((link) => {
        link.addEventListener("shown.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
        link.addEventListener("hidden.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
      });
    }
  };

  const initializeSidebarCollapse = () => {
    const sidebarElement = document.getElementsByClassName("js-sidebar")[0];
    const sidebarToggleElement =
      document.getElementsByClassName("js-sidebar-toggle")[0];

    if (sidebarElement && sidebarToggleElement) {
      sidebarToggleElement.addEventListener("click", () => {
        sidebarElement.classList.toggle("collapsed");

        sidebarElement.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    }
  };

  useEffect(() => {
    const initialize = () => {
      initializeSimplebar();
      initializeSidebarCollapse();
    };

    initialize();

    return () => {};
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <span className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </span>
      <div className="d-flex justify-content-end w-100">
        <Suspense>
          <LogoutBtn />
        </Suspense>
      </div>
    </nav>
  );
};

export default AdminNavbar;
