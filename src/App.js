import "./App.css";
import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";

// pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// components
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import IsPrivate from './components/IsPrivate'
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="flex flex-row flex-wrap">
        {(location.pathname !== "/login" && location.pathname !== "/signup") && <LeftBar />}

        {/* <TopBar /> */}
        <Routes>
          <Route path="/" element={<IsPrivate><Home /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          <Route path="/profile/:id" element={<IsPrivate><Profile /></IsPrivate>} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* error FE routes */}
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {(location.pathname !== "/login" && location.pathname !== "/signup") && <RightBar />}

      </div>

    </div>
  );
}

export default App;
