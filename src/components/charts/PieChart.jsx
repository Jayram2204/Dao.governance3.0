import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PieChart.css';

export const PieChart = ({ 
  data, 
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  showLegend = true,
  showTooltip = true,
  showLabels = true,
  innerRadius = 0,
  colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'],
}) => {
  const renderLabel = (entry) => {
    if (!showLabels) return null;
    const percent = ((entry.value / data.reduce((sum, item) => sum + item[dataKey], 0)) * 100).toFixed(0);
    return `${entry[nameKey]} ${percent}%`;
  };

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={showLabels}
            label={renderLabel}
            outerRadius={100}
            innerRadius={innerRadius}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors[index % colors.length]} 
              />
            ))}
          </Pie>
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
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span style={{ color: '#8D96A0' }}>{value}</span>}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
