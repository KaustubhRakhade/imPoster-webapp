import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostContextProvider } from './context/PostContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </AuthContextProvider>
    </Router>

  // </React.StrictMode>
);
