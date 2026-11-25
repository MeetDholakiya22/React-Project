
import { Avatar } from "@fluentui/react-components";
import { activities } from "../../data/dashboardData";

function RecentActivity() {
  return (
    <div className="activity-container">
      <div className="section-heading">
        <div>
          <h3>Recent Activities</h3>
          <p>Latest updates from your team</p>
        </div>

        <button className="view-all">View all</button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <Avatar
              name={activity.name}
              initials={activity.initials}
              color="colorful"
              size={36}
            />

            <div className="activity-details">
              <p>
                <strong>{activity.name}</strong>{" "}
                {activity.action}{" "}
                <strong>{activity.target}</strong>
              </p>

              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
