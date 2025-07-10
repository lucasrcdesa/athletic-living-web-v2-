import React from "react";
import "./QuickStats.css";

interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

interface QuickStatsProps {
  stats: StatItem[];
  title?: string;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats, title }) => {
  return (
    <div className="quick-stats-container">
      {title && <h3 className="quick-stats-title">{title}</h3>}
      <div className="quick-stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="quick-stat-item"
            style={{ borderLeftColor: stat.color || "var(--primary-color)" }}
          >
            {stat.icon && <span className="stat-icon">{stat.icon}</span>}
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
