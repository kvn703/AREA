import { useTranslation } from "react-i18next";

export default function ModeSetting() {
  const { t } = useTranslation();

  const enableDarkMode = () => {
    document.documentElement.classList.add("dark");
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove("dark");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1
          style={{ fontFamily: "merriweather" }}
          className=" text-[40px] bg-main dark:bg-slate-800 text-black dark:text-white font-bold mt-[-30px] pl-[20px] pr-[20px]"
        >
          Mode
        </h1>
      </div>
      <div className="navbar w-full pt-1 bg-main dark:bg-slate-800">
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-[295px] text-gray-900">
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-md text-white rounded-full font-bold mt-[20px]"
              onClick={enableDarkMode}
            >
              {t("sombre")}
            </button>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] mr-[100px] bg-secondary btn btn-md text-white rounded-full font-bold mt-[20px]"
              onClick={disableDarkMode}
            >
              {t("clair")}
            </button>
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
      <div className="space-x-[100px] flex justify-center items-center">
        <img
          src="./src/assets/darkmode.png"
          alt="moon"
          className="w-[300px] h-[436px] rounded-2xl"
        />
        <img
          src="./src/assets/modeclair.png"
          alt="moon"
          className="w-[300px] h-[436px] rounded-2xl"
        />
      </div>
    </>
  );
}
