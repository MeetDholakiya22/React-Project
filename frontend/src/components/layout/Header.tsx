
import {
  Search20Regular,
  Alert20Regular,
  Navigation20Regular
} from "@fluentui/react-icons";
import { Avatar, Button, Input } from "@fluentui/react-components";

interface HeaderProps {
  onMenuClick: () => void;
  pageTitle: string;
}

function Header({ onMenuClick, pageTitle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <Button
          appearance="subtle"
          icon={<Navigation20Regular />}
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label="Open navigation"
        />

        <div>
          <h2>{pageTitle}</h2>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div className="header-right">
        <Button
          appearance="subtle"
          icon={<Alert20Regular />}
          aria-label="Notifications"
        />

        <div className="profile">
          <Avatar
            name="Meet Dholakiya"
            color="colorful"
            size={36}
          />

          <div className="profile-info">
            <strong>Meet Dholakiya</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
