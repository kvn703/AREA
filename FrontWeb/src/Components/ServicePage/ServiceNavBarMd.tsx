import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavbarMd() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/loginPage");
  };

  return (
    <div className="navbar bg-third dark:bg-third">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-main dark:bg-slate-300 rounded-box w-52 text-black"
          >
            <li>
              <Link to="/creationPage">{t("creationarea")}</Link>
            </li>
            <li>
              <Link to="/areaPage">Services</Link>
            </li>
            <li>
              <Link to="/profilPage">{t("profil")}</Link>
            </li>
            <li>
              <Link to="/settingPage">{t("setting")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <span
          style={{ fontFamily: "Londrina" }}
          className="btn btn-ghost normal-case text-[40px] text-black dark:text-white"
        >
          <Link to="/areaPage">NetQ.</Link>
        </span>
      </div>
      <div className="navbar-end">
        <button
          style={{ fontFamily: "merriweather" }}
          className="pl-[30px] pr-[30px] bg-secondary btn text-white rounded-full font-bold"
          onClick={redirectToLoginPage}
        >
          {t("Logout")}
        </button>
      </div>
    </div>
  );
}

export default NavbarMd;
