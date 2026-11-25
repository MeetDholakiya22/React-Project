
import {
  Home20Regular,
  People20Regular,
  Person20Regular,
  Briefcase20Regular,
  CheckmarkCircle20Regular,
  Calendar20Regular,
  DocumentBulletList20Regular,
  ChartMultiple20Regular,
  Settings20Regular,
  PeopleTeam20Regular,
  Dismiss20Regular
} from "@fluentui/react-icons";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: Home20Regular },
  { label: "Leads", icon: People20Regular },
  { label: "Customers", icon: Person20Regular },
  { label: "Projects", icon: Briefcase20Regular },
  { label: "Tasks", icon: CheckmarkCircle20Regular },
  { label: "Employees", icon: PeopleTeam20Regular },
  { label: "Meetings", icon: Calendar20Regular },
  { label: "Invoices", icon: DocumentBulletList20Regular },
  { label: "Reports", icon: ChartMultiple20Regular }
];

function Sidebar({
  activePage,
  setActivePage,
  mobileOpen,
  onClose
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">W</div>

          <div className="brand-text">
            <strong>WorkFlow Pro</strong>
            <span>Business Management</span>
          </div>

          <button className="mobile-close" onClick={onClose}>
            <Dismiss20Regular />
          </button>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`nav-item ${
                  activePage === item.label ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.label);
                  onClose();
                }}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-label">PREFERENCES</div>

          <button
            className={`nav-item ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("Settings");
              onClose();
            }}
          >
            <Settings20Regular />
            <span>Settings</span>
          </button>

          <div className="sidebar-upgrade">
            <strong>Work smarter!</strong>
            <p>Manage your entire business from one place.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
