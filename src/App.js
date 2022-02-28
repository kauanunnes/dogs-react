import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/Helper/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login/Login"
import User from "./components/User/User"
import Photo from "./components/Photo/Photo"
import { UserStorage } from "./UserContext";
import UserProfile from "./components/User/UserProfile";
import NotFound from "./components/NotFound";

function App() { 
  return (
    <div className="app">
      <UserStorage>
          <Header />
          <main className="app-body">
            <Routes>
              <Route path="/" element={<Home />}></Route> 
              <Route path="login/*" element={<Login />}/>
              <Route 
                path="account/*" 
                element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>}
              />
              <Route path="/photo/:id" element={<Photo />} />
              <Route path="/profile/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />}/>    
            </Routes>
          </main>
          <Footer />
      </UserStorage>
    </div>
  )
}

export default App;
