# 📊 Charts Documentation

## Available Chart Components

All charts are built on top of Recharts and styled for the DAO 2.0 dark theme.

### 1. LineChart

**Purpose:** Show trends over time

**Usage:**
```jsx
import { LineChart } from '../components/charts';

<LineChart
  data={votingData}
  xKey="month"
  height={300}
  lines={[
    { dataKey: 'participation', name: 'Participation %', color: '#8B5CF6' },
    { dataKey: 'proposals', name: 'Proposals', color: '#3B82F6' },
  ]}
  showGrid={true}
  showLegend={true}
  showTooltip={true}
/>
```

**Props:**
- `data` (array) - Chart data
- `lines` (array) - Array of line configurations
- `xKey` (string) - Key for X-axis (default: 'name')
- `height` (number) - Chart height (default: 300)
- `showGrid` (boolean) - Show grid lines (default: true)
- `showLegend` (boolean) - Show legend (default: true)
- `showTooltip` (boolean) - Show tooltip (default: true)

---

### 2. BarChart

**Purpose:** Compare values across categories

**Usage:**
```jsx
import { BarChart } from '../components/charts';

<BarChart
  data={votingData}
  xKey="month"
  height={300}
  bars={[
    { dataKey: 'proposals', name: 'Proposals', color: '#8B5CF6' },
    { dataKey: 'votes', name: 'Votes', color: '#3B82F6' },
  ]}
  stacked={false}
/>
```

**Props:**
- `data` (array) - Chart data
- `bars` (array) - Array of bar configurations
- `xKey` (string) - Key for X-axis (default: 'name')
- `height` (number) - Chart height (default: 300)
- `showGrid` (boolean) - Show grid lines (default: true)
- `showLegend` (boolean) - Show legend (default: true)
- `showTooltip` (boolean) - Show tooltip (default: true)
- `stacked` (boolean) - Stack bars (default: false)

---

### 3. PieChart

**Purpose:** Show proportions of a whole

**Usage:**
```jsx
import { PieChart } from '../components/charts';

<PieChart
  data={membershipData}
  dataKey="value"
  nameKey="name"
  height={300}
  showLabels={true}
  colors={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']}
/>
```

**Props:**
- `data` (array) - Chart data
- `dataKey` (string) - Key for values (default: 'value')
- `nameKey` (string) - Key for names (default: 'name')
- `height` (number) - Chart height (default: 300)
- `showLegend` (boolean) - Show legend (default: true)
- `showTooltip` (boolean) - Show tooltip (default: true)
- `showLabels` (boolean) - Show labels on slices (default: true)
- `innerRadius` (number) - Inner radius for donut effect (default: 0)
- `colors` (array) - Array of colors

---

### 4. DonutChart

**Purpose:** Show proportions with center text

**Usage:**
```jsx
import { DonutChart } from '../components/charts';

<DonutChart
  data={membershipData}
  height={300}
  centerText="5,504"
  centerSubtext="Total Members"
  showCenter={true}
/>
```

**Props:**
- `data` (array) - Chart data
- `dataKey` (string) - Key for values (default: 'value')
- `nameKey` (string) - Key for names (default: 'name')
- `height` (number) - Chart height (default: 300)
- `showLegend` (boolean) - Show legend (default: true)
- `showTooltip` (boolean) - Show tooltip (default: true)
- `showCenter` (boolean) - Show center text (default: true)
- `centerText` (string) - Main center text
- `centerSubtext` (string) - Subtitle center text
- `colors` (array) - Array of colors

---

### 5. AreaChart

**Purpose:** Show trends with filled areas

**Usage:**
```jsx
import { AreaChart } from '../components/charts';

<AreaChart
  data={treasuryData}
  xKey="month"
  height={300}
  areas={[
    { dataKey: 'treasury', name: 'Treasury Value', color: '#10B981' },
  ]}
  stacked={false}
/>
```

**Props:**
- `data` (array) - Chart data
- `areas` (array) - Array of area configurations
- `xKey` (string) - Key for X-axis (default: 'name')
- `height` (number) - Chart height (default: 300)
- `showGrid` (boolean) - Show grid lines (default: true)
- `showLegend` (boolean) - Show legend (default: true)
- `showTooltip` (boolean) - Show tooltip (default: true)
- `stacked` (boolean) - Stack areas (default: false)

---

## Data Format

### Basic Format
```javascript
const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 200 },
];
```

### Multiple Series
```javascript
const data = [
  { month: 'Jan', proposals: 12, votes: 450, participation: 65 },
  { month: 'Feb', proposals: 18, votes: 680, participation: 72 },
  { month: 'Mar', proposals: 15, votes: 520, participation: 68 },
];
```

### Pie/Donut Format
```javascript
const data = [
  { name: 'Category A', value: 400, color: '#8B5CF6' },
  { name: 'Category B', value: 300, color: '#3B82F6' },
  { name: 'Category C', value: 200, color: '#10B981' },
];
```

---

## Styling

All charts use the DAO 2.0 dark theme:
- Background: `#161B22`
- Text: `#F8F8F8`
- Secondary text: `#8D96A0`
- Grid lines: `rgba(255, 255, 255, 0.1)`
- Border: `#30363d`

### Default Colors
```javascript
const colors = [
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#06B6D4', // Cyan
];
```

---

## Examples

### Treasury Overview
```jsx
<Card>
  <h3>Treasury Growth</h3>
  <AreaChart
    data={treasuryData}
    xKey="month"
    height={300}
    areas={[
      { dataKey: 'balance', name: 'Balance', color: '#10B981' },
    ]}
  />
</Card>
```

### Voting Participation
```jsx
<Card>
  <h3>Voting Trends</h3>
  <LineChart
    data={votingData}
    xKey="month"
    height={300}
    lines={[
      { dataKey: 'participation', name: 'Participation %', color: '#8B5CF6' },
    ]}
  />
</Card>
```

### Member Distribution
```jsx
<Card>
  <h3>Members</h3>
  <DonutChart
    data={memberData}
    height={300}
    centerText={totalMembers.toString()}
    centerSubtext="Total Members"
  />
</Card>
```

### Proposal Types
```jsx
<Card>
  <h3>Proposal Categories</h3>
  <PieChart
    data={proposalTypes}
    height={300}
    showLabels={true}
  />
</Card>
```

### Monthly Activity
```jsx
<Card>
  <h3>Activity</h3>
  <BarChart
    data={activityData}
    xKey="month"
    height={300}
    bars={[
      { dataKey: 'proposals', name: 'Proposals', color: '#8B5CF6' },
      { dataKey: 'votes', name: 'Votes', color: '#3B82F6' },
    ]}
  />
</Card>
```

---

## Responsive Design

All charts are responsive and will adapt to container width:
- Desktop: Full width with all features
- Tablet: Adjusted font sizes
- Mobile: Simplified labels, smaller legends

---

## Performance Tips

1. **Limit data points** - Keep datasets under 100 points for smooth rendering
2. **Use memoization** - Wrap chart data in `useMemo` to prevent re-renders
3. **Lazy load** - Load charts only when visible
4. **Optimize tooltips** - Disable tooltips for large datasets

---

## Customization

### Custom Colors
```jsx
<PieChart
  data={data}
  colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']}
/>
```

### Custom Height
```jsx
<LineChart
  data={data}
  height={400}
/>
```

### Stacked Charts
```jsx
<BarChart
  data={data}
  bars={[...]}
  stacked={true}
/>
```

### Hide Elements
```jsx
<LineChart
  data={data}
  showGrid={false}
  showLegend={false}
  showTooltip={false}
/>
```

---

## Integration with Real Data

### With Wagmi Hooks
```jsx
import { useGetTreasuryBalances } from '../hooks/useDAO';
import { DonutChart } from '../components/charts';

function TreasuryChart() {
  const { treasuryBalances, isLoading } = useGetTreasuryBalances();
  
  if (isLoading) return <Loader />;
  
  return (
    <DonutChart
      data={treasuryBalances}
      dataKey="value"
      nameKey="name"
      height={300}
    />
  );
}
```

### With State Management
```jsx
import { useDAOStore } from '../store/useDAOStore';
import { LineChart } from '../components/charts';

function VotingTrends() {
  const { proposals } = useDAOStore();
  
  const chartData = proposals.map(p => ({
    date: p.date,
    votes: p.totalVotes,
  }));
  
  return (
    <LineChart
      data={chartData}
      xKey="date"
      lines={[
        { dataKey: 'votes', name: 'Total Votes', color: '#8B5CF6' },
      ]}
    />
  );
}
```

---

**Status:** ✅ Complete chart library  
**Components:** 5 chart types  
**Fully styled:** Dark theme compatible  
**Ready for:** Production use
