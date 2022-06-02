import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";

function Home() {
  return (
    <div className="flex flex-row flex-wrap">
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  );
}

export default Home;
