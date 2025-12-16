import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LineChart.css';

export const LineChart = ({ 
  data, 
  lines = [], 
  xKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
}) => {
  const defaultColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="line-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
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
              iconType="line"
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || defaultColors[index % defaultColors.length]}
              strokeWidth={2}
              dot={{ fill: line.color || defaultColors[index % defaultColors.length], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
