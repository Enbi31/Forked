import { Router, Route, Switch } from 'wouter';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
