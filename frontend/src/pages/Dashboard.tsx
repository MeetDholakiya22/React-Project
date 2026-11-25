
import { Button } from "@fluentui/react-components";
import { Add20Regular } from "@fluentui/react-icons";

import { stats } from "../data/dashboardData";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Monitor your business performance and activities.</p>
        </div>

        <Button
          appearance="primary"
          icon={<Add20Regular />}
        >
          Create New
        </Button>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <div className="dashboard-grid">
        <SalesChart />
        <RecentActivity />
      </div>

      <div className="welcome-banner">
        <div>
          <h3>Welcome to WorkFlow Pro!</h3>
          <p>
            Your business workspace is ready. Start managing
            your leads, customers, projects and tasks.
          </p>
        </div>

        <span className="welcome-icon">✦</span>
      </div>
    </div>
  );
}

export default Dashboard;
