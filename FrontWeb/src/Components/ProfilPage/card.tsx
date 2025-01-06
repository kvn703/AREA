import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Card() {
  const { t } = useTranslation();
  const [client, setClient] = useState<any>({});

  const getProfile = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/auth/profile/", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getProfile();
  }, [localStorage.getItem("token")]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div style={{ border: "1px solid #1400FF", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",}} className="bg-[#F3F3F3] rounded-lg h-[650px] w-[70%] dark:bg-slate-500">
        <div className="rounded-full sm:h-[200px] sm:w-[200px] md:h-[200px] md:w-[200px] lg:h-[200px] lg:w-[200px] bg-white mx-auto mb-4 mt-12 flex items-center justify-center dark:bg-[#262729] text-gray-600 dark:text-[#d4cece] sm:text-[70px] md:text-[70px] lg:text-[70px] font-semibold">
          {capitalizeFirstLetter(client.name ? client.name.charAt(0) : "")}
        </div>
        {client.surname !== "undefined" ? (
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-black dark:text-white sm:text-[35px] md:text-[35px] lg:text-[35px] font-semibold text-center"
          >
            {capitalizeFirstLetter(String(client.name))} {(String(client.surname)).toUpperCase()}
          </p>
        ) : (
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-black dark:text-white sm:text-[35px] md:text-[35px] lg:text-[35px] font-semibold text-center"
          >
            {capitalizeFirstLetter(String(client.name))}
          </p>
        )}
        <div className="flex bg-white dark:bg-[#262729] rounded-full p-1 ml-[12%] mt-8 w-3/4 justify-center">
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-blue-500 sm:text-[25px] md:text-[25px] lg:text-[25px] font-semibold"
          >
            {t("connected")}
          </p>
        </div>
        <div className="bg-white dark:bg-[#262729] text-left rounded-full p-2 mt-12 w-5/6 ml-[8%] pl-[20px]">
          <p
            style={{ fontFamily: "merriweather" }}
            className="dark:text-[#d4cece] text-[#4A4949] pl-[3%] sm:text-[12px] md:text-[12px] lg:text-[12px] font-semibold"
          >
            Email
          </p>
          <p
            style={{ fontFamily: "Inter" }}
            className="text-[#000000] dark:text-white pl-[3%] sm:text-[20px] md:text-[20px] lg:text-[20px]"
          >
            {client.email}
          </p>
        </div>
        <div className="bg-white dark:bg-[#262729] text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
          <p
            style={{ fontFamily: "merriweather" }}
            className="dark:text-[#d4cece] text-[#4A4949] pl-[3%] sm:text-[12px] md:text-[12px] lg:text-[12px] font-semibold"
          >
            {t("name")}
          </p>
          {client.surname !== "undefined" ? (
            <p
              style={{ fontFamily: "Inter" }}
              className="text-[#000000] dark:text-white pl-[3%] sm:text-[20px] md:text-[20px] lg:text-[20px]"
            >
              {capitalizeFirstLetter(String(client.name))} {(String(client.surname)).toUpperCase()}
            </p>
          ) : (
            <p
              style={{ fontFamily: "Inter" }}
              className="text-[#000000] dark:text-white pl-[3%] sm:text-[20px] md:text-[20px] lg:text-[20px]"
            >
              {capitalizeFirstLetter(String(client.name))}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
