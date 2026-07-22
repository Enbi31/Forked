import { ReactLenis } from 'lenis/react';
import { Router, Route, Switch } from 'wouter';
import Home from './pages/home';
import ForkApp from './pages/fork-app';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070B] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-white/50 text-lg mb-8">This page doesn't exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-semibold rounded-xl glow-button transition-all duration-300 hover:scale-[1.02]"
      >
        Go Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/app" component={ForkApp} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ReactLenis>
  );
}
