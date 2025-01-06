import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ServiceNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/loginPage");
  };

  return (
    <>
      <div className="w-screen">
        <div className="navbar w-full pt-10 bg-third">
          <div className="navbar-start">
            <span
              style={{ fontFamily: "Londrina" }}
              className="text-[40px] ml-[132px] text-purple-100"
            >
              <Link to="/areaPage">NetQ.</Link>
            </span>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="text-purple-100 menu menu-horizontal space-x-10">
              <li>
                <Link
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                  to="/creationPage"
                >
                  {t("creationarea")}
                </Link>
              </li>
              <li>
                <Link
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                  to="/areaPage"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                  to="/profilPage"
                >
                  {t("profil")}
                </Link>
              </li>
              <li>
                <Link
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                  to="/settingPage"
                >
                  {t("setting")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <button
              style={{ fontFamily: "merriweather" }}
              className="pl-[30px] pr-[30px] bg-secondary btn mr-36 text-white rounded-full font-bold"
              onClick={redirectToLoginPage}
            >
              {t("Logout")}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-third h-0.5">
        <div className="w-1/4 ml-[37%] border-2 border-purple-100"></div>
      </div>
    </>
  );
}

export default ServiceNavbar;
