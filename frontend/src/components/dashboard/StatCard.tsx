
import { Card, Text } from "@fluentui/react-components";
import {
  ArrowTrending20Regular,
  ArrowTrendingDown20Regular
} from "@fluentui/react-icons";
import type { StatItem } from "../../types/index";

interface StatCardProps {
  item: StatItem;
}

function StatCard({ item }: StatCardProps) {
  const isUp = item.trend === "up";

  return (
    <Card className="stat-card">
      <div className="stat-top">
        <Text weight="medium" size={300}>
          {item.title}
        </Text>

        <span className={`trend ${isUp ? "trend-up" : "trend-down"}`}>
          {isUp ? (
            <ArrowTrending20Regular />
          ) : (
            <ArrowTrendingDown20Regular />
          )}
          {item.change}
        </span>
      </div>

      <h2 className="stat-value">{item.value}</h2>

      <Text className="stat-description" size={200}>
        {item.description}
      </Text>
    </Card>
  );
}

export default StatCard;
