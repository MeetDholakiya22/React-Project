
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../pages/Dashboard";
import Leads from "../../pages/Leads";

function AppLayout() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Leads":
        return <Leads />;

      default:
        return (
          <div className="placeholder-page">
            <h1>{activePage}</h1>
            <p>
              This module will be developed in upcoming phases.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="main-content">

        <Header
          pageTitle={activePage}
          onMenuClick={() => setMobileOpen(true)}
        />

        <div className="page-content">
          {renderPage()}
        </div>

      </main>
    </div>
  );
}

export default AppLayout;
