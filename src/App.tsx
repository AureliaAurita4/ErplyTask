import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
import LoginPage from './components/LoginPage';
import NewsPage from './components/NewsPage';
import Navbar from './components/Navbar';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? <Component /> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/news" element={<PrivateRoute component={NewsPage} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
