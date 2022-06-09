import "./App.css";
import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";

// pages
import Error from './pages/Error';
import NotFound from './pages/NotFoundRedirect';
import Profile from "./pages/Profile";
import SinglePost from './pages/SinglePost'
import MarketPlace from './pages/MarketPlace'

// components
// import Post from "./components/Post";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import IsPrivate from './components/IsPrivate'
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Feed from "./components/Feed";
import SingleAd from "./pages/SingleAd";
import Groups from "./pages/Groups";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="flex flex-row flex-wrap">
        {(location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== 'error' && location.pathname !== '/404' && location.pathname !== "/error") && <LeftBar />}
        {/* <TopBar /> */}
        <Routes>
          <Route path="/" key={location.pathname} element={<IsPrivate><Feed look="feed" /></IsPrivate>} />
          <Route path="/discover" key={location.pathname} element={<IsPrivate><Feed look="discover" /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          <Route path="/profile/:username" element={<IsPrivate><Profile /></IsPrivate>} />

          <Route path="/groups" key={location.pathname} element={<IsPrivate><Groups /></IsPrivate>} />

          <Route path="/marketplace" key={location.pathname} element={<IsPrivate><MarketPlace /></IsPrivate>} />
          <Route path="/marketplace/:id" key={location.pathname} element={<IsPrivate><SingleAd /></IsPrivate>} />
          <Route path="/post/:id" element={<IsPrivate><SinglePost /></IsPrivate>} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* error FE routes */}
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {(location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== 'error' && location.pathname !== '/404' && location.pathname !== "/error") && <RightBar />}
      </div>

    </div>
  );
}

export default App;
