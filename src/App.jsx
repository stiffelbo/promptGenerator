import MainLayout from './components/layout/MainLayout';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Pages
import { Pages } from './pages';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {Pages.map((page, index) => (
            <Route key={index} path={page.link} element={<page.component />} />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App
