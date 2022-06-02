import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Home from "./pages/Home";

// components
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import IsPrivate from './components/IsPrivate'

function App() {
  return (
    <div className="App">
      {/* <TopBar /> */}
      <Routes>
        <Route path="/" element={<IsPrivate><Home /></IsPrivate>} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
