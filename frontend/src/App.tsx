import { ReactLenis } from 'lenis/react';
import { Router, Route } from 'wouter';
import Home from './pages/home';
import ForkApp from './pages/fork-app';

export default function App() {
  return (
    <ReactLenis root>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/app" component={ForkApp} />
      </Router>
    </ReactLenis>
  );
}
