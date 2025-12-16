import { Button, Card, Loader } from '../components/ui';
import './ComponentDemo.css';

export const ComponentDemo = () => {
  return (
    <div className="demo-container">
      <h1>UI Components Demo</h1>
      
      {/* Button Variants */}
      <Card>
        <h2>Button Variants</h2>
        <div className="demo-section">
          <Button variant="default">Default Button</Button>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="accent-teal">Accent Teal</Button>
          <Button variant="accent-red">Accent Red</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Card>

      {/* Loaders */}
      <Card>
        <h2>Loaders</h2>
        <div className="demo-section">
          <div className="loader-demo">
            <Loader size="sm" color="primary" />
            <span>Small</span>
          </div>
          <div className="loader-demo">
            <Loader size="md" color="secondary" />
            <span>Medium</span>
          </div>
          <div className="loader-demo">
            <Loader size="lg" color="accent-teal" />
            <span>Large</span>
          </div>
        </div>
      </Card>

      {/* Button with Loader */}
      <Card>
        <h2>Button with Loader</h2>
        <div className="demo-section">
          <Button variant="primary" disabled>
            <Loader size="sm" color="text-primary" />
            Loading...
          </Button>
        </div>
      </Card>

      {/* Cards */}
      <div className="cards-grid">
        <Card>
          <h3>Card Example 1</h3>
          <p>This is a standard card with padding and hover effects.</p>
          <Button variant="secondary">Learn More</Button>
        </Card>
        
        <Card>
          <h3>Card Example 2</h3>
          <p>Cards automatically have consistent styling and spacing.</p>
          <Button variant="accent-teal">Take Action</Button>
        </Card>
        
        <Card>
          <h3>Card Example 3</h3>
          <p>Perfect for displaying grouped content and data.</p>
          <Button variant="primary">View Details</Button>
        </Card>
      </div>
    </div>
  );
};
