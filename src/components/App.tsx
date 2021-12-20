import { BrowserRouter } from 'react-router-dom';
import Router from '../routes/Router';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <div className="main">
          <Router />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
