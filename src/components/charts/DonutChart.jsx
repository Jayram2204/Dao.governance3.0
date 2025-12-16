import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DonutChart.css';

export const DonutChart = ({ 
  data, 
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  showLegend = true,
  showTooltip = true,
  showCenter = true,
  centerText = '',
  centerSubtext = '',
  colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'],
}) => {
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);

  return (
    <div className="donut-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey={dataKey}
            nameKey={nameKey}
            label={false}
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
      {showCenter && (
        <div className="donut-center">
          <div className="donut-center-text">{centerText || total.toLocaleString()}</div>
          {centerSubtext && <div className="donut-center-subtext">{centerSubtext}</div>}
        </div>
      )}
    </div>
  );
};
