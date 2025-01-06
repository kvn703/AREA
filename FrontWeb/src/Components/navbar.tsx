import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/loginPage");
  };

  return (
    <>
      <div className="w-screen">
        <div className="navbar w-full pt-10 bg-main dark:bg-slate-800">
          <div className="navbar-start">
            <Link to="/areaPage" style={{ fontFamily: "Londrina" }}>
              <span className="text-[40px] ml-[132px] text-black dark:text-white">
                NetQ.
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-10 dark:text-white text-gray-900">
              <li>
                <Link
                  to="/creationPage"
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  {t("creationarea")}
                </Link>
              </li>
              <li>
                <Link
                  to="/areaPage"
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/profilPage"
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  {t("profil")}
                </Link>
              </li>
              <li>
                <Link
                  to="/settingPage"
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  {t("setting")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a
              style={{ fontFamily: "merriweather" }}
              className="pl-[30px] pr-[30px] bg-secondary btn mr-36 text-white rounded-full font-bold"
              onClick={redirectToLoginPage}
            >
              {t("Logout")}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 h-0.5">
        <div className="w-1/4 ml-[37%] border-2 border-black dark:border-white"></div>
      </div>
    </>
  );
}

export default Navbar;
