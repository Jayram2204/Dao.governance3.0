import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui/Card/Card';
import { Loader } from '../ui/Loader/Loader';
import { useGetTreasuryBalances } from '../../hooks/useDAO';
import './TreasuryOverview.css';

const CHART_COLORS = [
  '#3B82F6', // brand-blue
  '#8B5CF6', // brand-violet
  '#10B981', // accent-teal
  '#F59E0B', // orange
  '#EF4444', // accent-red
  '#06B6D4', // cyan
];

export const TreasuryOverview = () => {
  const { treasuryBalances: data, isLoading, error } = useGetTreasuryBalances();

  const isDataEmpty = !data || data.length === 0 || data.every(item => item.value === 0);
  const chartData = isDataEmpty ? [{ name: 'No Data', value: 1, symbol: '' }] : data;
  const chartColors = isDataEmpty ? ['#444'] : CHART_COLORS;

  if (isLoading) {
    return (
      <Card className="treasury-overview-card">
        <h3 className="card-title">Treasury Allocation</h3>
        <div className="chart-loading-placeholder">
          <Loader size="lg" color="primary" />
          <p className="text-secondary" style={{ marginTop: '1rem' }}>Loading Treasury Data...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="treasury-overview-card">
        <h3 className="card-title">Treasury Allocation</h3>
        <p style={{ color: 'var(--accent-red)' }}>Error loading treasury: {error.message}</p>
      </Card>
    );
  }

  return (
    <Card className="treasury-overview-card">
      <h3 className="card-title">Treasury Allocation</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => isDataEmpty ? '' : `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>

            {!isDataEmpty && (
              <Tooltip
                formatter={(value, name, props) => [`$${value.toLocaleString()} ${props.payload.symbol}`, name]}
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
            )}
            {!isDataEmpty && (
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {isDataEmpty && <p className="text-secondary" style={{ textAlign: 'center' }}>No treasury data available.</p>}
    </Card>
  );
};
