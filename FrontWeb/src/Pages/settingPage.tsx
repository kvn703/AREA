import { useEffect } from "react";
import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import LanguagesSetting from "../Components/SettingPage/languages.tsx";
import ModeSetting from "../Components/SettingPage/mode.tsx";
import ApkButton from "../Components/SettingPage/apkButton.tsx";

export default function Setting() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  useEffect(() => {
    document.body.classList.add("disable-scroll");
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      <div className="flex h-screen bg-main dark:bg-slate-800">
        <div className="w-1/2">
          <div className="mt-[85px] pb-[50px] m-[90px] rounded-3xl border border-solid border-gray-800 dark:border-white">
            <ApkButton />
          </div>
          <div className="mt-[85px] pb-[50px] m-[90px] rounded-3xl border border-solid border-gray-800 dark:border-white">
            <LanguagesSetting />
          </div>
        </div>
        <div className="w-1/2">
          <div className="mt-[85px] pb-[50px] m-[90px] rounded-3xl border border-solid border-gray-800 dark:border-white">
            <ModeSetting />
          </div>
        </div>
      </div>
    </>
  );
}
