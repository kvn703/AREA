import { useNavigate } from "react-router-dom";
import GoogleConnexion from "./googleConnexion.tsx";
import InputConnexion from "./inputConnexion.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

const LoginInputs: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getClientToken = () => {
    const data = { email, password };
    axios
      .post(import.meta.env.VITE_DNS_NAME + ":8080/api/auth/login/", data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        setErrorMessage("");
        navigate("/profilPage");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
        console.error("Erreur lors de la requête :", error);
      });
  };

  return (
    <>
      <div className="w-1/2 bg-white card rounded-box place-items-center">
        <button
          style={{ fontFamily: "Arial" }}
          className="btn btn-active text-white bg-black"
          onClick={() => navigate("/registerPage")}
        >
          {t("register")}
        </button>
      </div>
      <h1
        style={{ fontFamily: "merriweather" }}
        className="text-[75px] font-bold text-black"
      >
        {t("WelcomeMsg")}
      </h1>
      <p style={{ fontFamily: "merriweather" }} className="text-[20px]">
        {t("CatchPhrase")}
      </p>
      <div className="form-control w-1/2 max-w-xl mt-10"></div>
      <InputConnexion text="Email" setVar={setEmail} />
      <div className="form-control w-full max-w-xl mt-10">
        <label className="label">
          <span
            style={{ fontFamily: "merriweather" }}
            className="label-text text-black text-lg"
          >
            {" "}
            {t("Password")}{" "}
          </span>
        </label>
        <input
          type="password"
          className="input input-ghost border-0 border-b-2 rounded-none border-gray-400 bg-transparent focus:outline-none focus:text-black"
          onChange={(text) => setPassword(text.target.value)}
        />
        <label className="label">
          <span
            style={{ fontFamily: "merriweather" }}
            className="label-text-alt text-black"
          >
            {t("ForgetPwd")}
          </span>
        </label>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="form-control w-full max-w-xl mt-10">
        <button
          style={{ fontFamily: "Arial" }}
          className="btn btn-active text-white bg-black"
          onClick={() => getClientToken()}
        >
          {t("SignIn")}
        </button>
      </div>
      <GoogleConnexion />
    </>
  );
};

export default LoginInputs;
