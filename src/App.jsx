// App — single-page investor site
import { Nav, Footer } from './components/Nav.jsx';
import { CmdK } from './components/CmdK.jsx';
import { Investor } from './components/Investor.jsx';
import { useScrollReveal } from './components/hooks.js';

export default function App() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <main>
        <Investor />
      </main>
      <Footer />
      <CmdK />
    </>
  );
}
