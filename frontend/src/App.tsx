import { Router, Route } from 'wouter';
import ForkApp from './pages/fork-app';

function App() {
  return (
    <Router>
      <Route path="/" component={ForkApp} />
    </Router>
  );
}

export default App;
