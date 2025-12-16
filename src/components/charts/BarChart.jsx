import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';

export const BarChart = ({ 
  data, 
  bars = [], 
  xKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
}) => {
  const defaultColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="bar-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
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
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
          )}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
          )}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={bar.color || defaultColors[index % defaultColors.length]}
              radius={[8, 8, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
