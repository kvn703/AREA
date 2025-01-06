import { useNavigate } from "react-router-dom";
import GoogleConnexion from "./googleConnexion.tsx";
import InputConnexion from "./inputConnexion.tsx";
import InputPassword from "./inputPassword.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

const RegisterInputs: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getClientToken = () => {
    const data = { name, surname, email, password };
    axios
      .post(import.meta.env.VITE_DNS_NAME + ":8080/api/auth/register/", data)
      .then(() => {
        setErrorMessage("");
        navigate("/loginPage");
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
          onClick={() => navigate("/loginPage")}
        >
          {t("login")}
        </button>
      </div>
      <h1
        style={{ fontFamily: "merriweather" }}
        className="text-[75px] font-bold text-black"
      >
        {t("RegisterMsg")}
      </h1>
      <p style={{ fontFamily: "merriweather" }} className="text-[20px]">
        {" "}
        {t("RegisterBrief")}{" "}
      </p>
      <div className="form-control w-1/2 max-w-xl"></div>
      <GoogleConnexion />
      <div className="flex items-center w-4/5 mt-10">
        <div className="flex-1 border-t border-black border-1"></div>
        <div className="mx-4 text-gray-700 font-bold text-xl">OR</div>
        <div className="flex-1 border-t border-black border-1"></div>
      </div>
      <div className="flex space-x-16">
        <InputConnexion text={t("FirstName")} setVar={setName} />
        <InputConnexion text={t("LastName")} setVar={setSurname} />
      </div>
      <InputConnexion text="Email" setVar={setEmail} />
      <InputPassword text={t("Password")} setVar={setPassword} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="form-control w-full max-w-xl mt-10">
        <button
          style={{ fontFamily: "Arial" }}
          className="btn btn-active text-white bg-black"
          onClick={() => getClientToken()}
        >
          {" "}
          {t("SignUp")}{" "}
        </button>
      </div>
    </>
  );
};

export default RegisterInputs;
