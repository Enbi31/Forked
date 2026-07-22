import { Router, Route, Switch } from 'wouter';
import ForkApp from './pages/fork-app';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ForkApp} />
      </Switch>
    </Router>
  );
}

export default App;
