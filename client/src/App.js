import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './css/style.scss'
import Layout from "./layout/Layout";
// import RequireAuth from './auth/RequireAuth';
import { ProvideAuth } from "./auth/UseAuth";
import Login from "./pages/Signin";
import Chat from "./components/Chat";
import QNA from "./mainComponent/QNA";
import Upload from "./mainComponent/upload";
// Import other pages here

import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./protected/PrivateRoute";
import Favorites from "./mainComponent/Favorites";
import MessageState from "./context/MessageState";
// import { Upload } from 'antd';

function App() {
  return (
    <div className="font-primary">
      <MessageState>
        <AnimatePresence>
          <ProvideAuth>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    path="/qna"
                    element={
                      <>
                        <PrivateRoute>
                          <QNA />
                        </PrivateRoute>
                      </>
                    }
                  />
                  <Route
                    index
                    path="/upload"
                    element={
                      <>
                        <PrivateRoute>
                          
                          <Upload />
                        </PrivateRoute>
                      </>
                    }
                  />
                  <Route
                    index
                    path="/favorites"
                    element={
                      <>
                        
                        <Favorites />
                      </>
                    }
                  />
                </Route>
              </Routes>
            </Router>
          </ProvideAuth>
        </AnimatePresence>
      </MessageState>
    </div>
  );
}

export default App;
