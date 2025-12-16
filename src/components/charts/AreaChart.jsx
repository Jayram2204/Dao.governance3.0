import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AreaChart.css';

export const AreaChart = ({ 
  data, 
  areas = [], 
  xKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
}) => {
  const defaultColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="area-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.1)" 
            />
          )}
          <XAxis 
            dataKey={xKey} 
            stroke="#8D96A0"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis 
            stroke="#8D96A0"
            style={{ fontSize: '0.875rem' }}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#F8F8F8',
              }}
              itemStyle={{ color: '#F8F8F8' }}
            />
          )}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
          )}
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name || area.dataKey}
              stroke={area.color || defaultColors[index % defaultColors.length]}
              fill={area.color || defaultColors[index % defaultColors.length]}
              fillOpacity={0.3}
              strokeWidth={2}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
