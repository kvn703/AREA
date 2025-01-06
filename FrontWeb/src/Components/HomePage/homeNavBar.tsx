import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/loginPage");
  };

  const redirectToRegisterPage = () => {
    navigate("/RegisterPage");
  };

  return (
    <>
      <div className="w-screen">
        <div className="navbar w-full pt-10 bg-main">
          <div className="flex-1">
            <a
              style={{ fontFamily: "Londrina" }}
              className="text-[50px] ml-[132px] text-black"
            >
              <Link to="/">NetQ.</Link>
            </a>
          </div>
          <div className="pr-60">
            <a
              style={{ fontFamily: "merriweather" }}
              className="pl-[30px] pr-[30px] bg-secondary btn mr-16 text-white rounded-full font-bold"
              onClick={redirectToRegisterPage}
            >
              {t("SignUp")}
            </a>
            <a
              style={{ fontFamily: "merriweather" }}
              className="pl-[30px] pr-[30px] bg-secondary btn text-white rounded-full font-bold"
              onClick={redirectToLoginPage}
            >
              {t("SignIn")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNavbar;
