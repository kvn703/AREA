import { useEffect } from "react";
import login_image from "../assets/socialMedia.png";
import Navigationbar from "../Components/HomePage/homeNavBar.tsx";
import CircleShape from "../Components/HomePage/circleShape.tsx";
import HangingBox from "../Components/HomePage/hangingBox.tsx";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("disable-scroll");
  }, []);

  return (
    <>
      <Navigationbar />
      <div className="flex h-screen relative bg-main">
        <HangingBox />
        <div className="w-1/2 p-4 pl-36">
          <img src={login_image} alt="Image" className="w-4/5 h-auto hidden lg:block" />
        </div>
      </div>
      <CircleShape />
    </>
  );
}
