import React from 'react';
import { LucideIcon } from "lucide-react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  bgColor: string;
  description: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  className,
  trend,
}) => {
  return (
    <Card className={className} sx={{ overflow: "hidden" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Icon size={18} color="#6b7280" /> {/* Tailwind's text-gray-500 equivalent */}
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
        {trend && (
          <Box display="flex" alignItems="center" mt={1}>
            <Typography
              variant="caption"
              color={trend.isPositive ? "green" : "error"}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </Typography>
            <Typography variant="caption" color="text.secondary" ml={1}>
              from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
