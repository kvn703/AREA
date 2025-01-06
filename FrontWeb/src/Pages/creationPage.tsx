import { useEffect, useState } from "react";
import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteCard from "../Components/CreationPage/popupDelete.tsx";

interface Area {
  id: number;
  actionId: number;
  actionName: string;
  areaId: number;
  reactionId: number;
  reactionName: string;
  areaName: string;
}

interface Service {
  id: number;
  name: string;
  logo_url: string;
}

export default function Creation() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  const navigate = useNavigate();
  const [areaData, setAreaData] = useState<Area[]>([]);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const { t } = useTranslation();
  const [check, setCheck] = useState(1);

  const getAreaCreated = () => {
    axios
      .get(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/areas/get?token=" +
          localStorage.getItem("token")
      )
      .then((response) => {
        setAreaData(response.data);
        if (!Array.isArray(response.data)) {
          setCheck(2);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const getServicesImage = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/services/get")
      .then((response) => {
        setServicesData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    document.body.classList.add("disable-scroll");
    getAreaCreated();
    getServicesImage();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      {check === 1 && (
        <div className="bg-main dark:bg-slate-800 h-screen">
          <div className="flex justify-center items-center">
            <h1 className="font-bold ml-[20%] mr-[20%] text-[30px] dark:text-white text-black dark-text-white p-[40px]">{t("creationarea")}</h1>
            <div className="absolute top-1/5 right-1/3">
              <button
                style={{ fontFamily: "merriweather" }}
                className="shadow-2xl bg-secondary btn btn-md text-white rounded-full font-bold"
                onClick={() => {navigate("/areaPage")}}
              >
                {t("creationareabutton")}
              </button>
            </div>
          </div>
          <div className="mr-[20%] ml-[20%] rounded-lg overflow-y-auto max-h-[600px]" >
            <ul>
              {areaData.map((item, index) => (
                <div className="">
                  <li
                    key={index}
                    className="bg-[#F3F3F3] dark:bg-slate-500 mb-6 border border-solid border-gray-300 relative"
                  >
                    <div className="absolute top-2 right-2 p-2 text-red-600">
                      <DeleteCard areaMap={item} />
                    </div>
                    <h1 className="font-bold pt-[10px] text-[30px] dark:text-white text-black dark-text-white mb-[10px]">{item.areaName}</h1>
                    <div className="mr-[20%] ml-[20%] h-[100px] flex flex-row mb-[20px]">
                      <div className="flex w-[10%] items-center justify-center">
                        <img
                          src={servicesData.find((service) => service.id === item.actionId)?.logo_url}
                          alt={servicesData.find((service) => service.id === item.actionId)?.name}
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <div className="relative w-[35%] flex-col">
                        <div className="h-2/3 bottom-0 left-0 h-1/2 font-bold pl-2 pt-[5px] text-[20px] dark:text-white text-gray-800 flex items-center">
                          {capitalizeFirstLetter(String(servicesData.find((service) => service.id === item.actionId)?.name))}
                        </div>
                        <div className="h-1/3 pl-2 text-[20px] text-gray-800 dark:text-gray-100 flex items-center">
                          {item.actionName}
                        </div>
                      </div>
                      <div className="w-[10%]">
                        <div className="text-[60px] text-gray-800 items-center justify-center">
                          &#10148;
                        </div>
                      </div>
                      <div className="w-[10%]"></div>
                      <div className="flex w-[10%] items-center justify-center">
                        <img
                          src={servicesData.find((service) => service.id === item.reactionId)?.logo_url}
                          alt={servicesData.find((service) => service.id === item.reactionId)?.name}
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <div className="relative w-[25%] flex-col">
                        <div className="h-2/3 bottom-0 left-0 h-1/2 font-bold pl-2 pt-[5px] text-[20px] dark:text-white text-gray-800 flex items-center">
                          {capitalizeFirstLetter(String(servicesData.find((service) => service.id === item.reactionId)?.name))}
                        </div>
                        <div className="h-1/3 pl-2 text-[20px] text-gray-800 dark:text-gray-100 flex items-center">
                          {item.reactionName}
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
      {check === 2 && (
        <div className="bg-main dark:bg-slate-800 h-screen">
          <h1 className="font-bold text-[30px] dark:text-white text-black p-[40px]">
            {t("creationarea")}
          </h1>
          <button
            style={{ fontFamily: "merriweather" }}
            className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[5%]"
            onClick={() => {navigate("/areaPage")}}
          >
            {t("creationareabutton")}
          </button>
        </div>
      )}
    </>
  );
}
