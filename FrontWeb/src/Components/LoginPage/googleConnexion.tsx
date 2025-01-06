import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

const GoogleConnexion = () => {
  const { t } = useTranslation();

  const GoogleConnexion = () => {
    window.location.href =
      import.meta.env.VITE_DNS_NAME + ":8080/api/auth/google/Register";
  };
  return (
    <div className="form-control w-1/2 max-w-xl mt-10">
      <button
        onClick={GoogleConnexion}
        style={{ fontFamily: "Arial" }}
        className="btn btn-active text-black border-black bg-white font-bold"
      >
        <FcGoogle />
        {t("GoogleConnexion")}
      </button>
    </div>
  );
};

export default GoogleConnexion;
