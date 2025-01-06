import i18n from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguagesSetting() {
  const { t } = useTranslation();
  const changeLanguageEn = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 style={{ fontFamily: "merriweather" }} className="text-[40px] text-black dark:text-white font-bold mt-[80px]">{t("langue")}</h1>
      </div>
      <div className="navbar w-full pt-10 bg-main dark:bg-slate-800">
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-10 text-gray-900">
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[20px]"
              onClick={(e) => {
                e.preventDefault();
                changeLanguageEn("fr");
              }}
            >
              {t("fr")}
            </button>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[20px]"
              onClick={(e) => {
                e.preventDefault();
                changeLanguageEn("en");
              }}
            >
              {t("en")}
            </button>
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  );
}
