import React from 'react';
import { LucideIcon } from "lucide-react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
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
  iconColor,
  description,
  className,
  trend,
}) => {
  return (
    <Card className={className} sx={{ overflow: "hidden" }}>
      <CardContent className='bg-[#0b102c] text-white'>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text-white fornt-bold">
            {title}
          </Typography>
          <Icon size={24} color={iconColor || "#0d6efd"} /> 
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        {description && (
          <Typography variant="caption" color="text-gray-900">
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
            <Typography variant="caption" color="text-gray-900" ml={1}>
              from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
