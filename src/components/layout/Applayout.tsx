
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../pages/Dashboard";

function AppLayout() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {activePage === "Dashboard" ? (
            <Dashboard />
          ) : (
            <div className="placeholder-page">
              <h1>{activePage}</h1>
              <p>
                The {activePage} module will be developed in
                the upcoming phases.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
