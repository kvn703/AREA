import { useState, useEffect } from "react";
import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import NavigationbarMd from "../Components/ServicePage/ServiceNavBarMd.tsx";
import Popup from "../Components/ServicePage/popup.tsx";
import PopupReaction from "../Components/ServicePage/popupReaction.tsx";
import Card from "../Components/ServicePage/card.tsx";
import CardReaction from "../Components/ServicePage/cardReaction.tsx";
import { useServiceContext } from "../ServiceContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type ActionData = {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
};

export type ReactionData = {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
};

export default function Service() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  const navigate = useNavigate();
  const { selectedService } = useServiceContext();
  const [services, setServices] = useState<ActionData[]>([]);
  const [popupData, setPopupData] = useState<ActionData | null>(null);
  const [popupDataReaction, setPopupDataReaction] = useState<ReactionData | null>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const { t } = useTranslation();
  const [reactions, setReactions] = useState<ReactionData[]>([]);
  const [buttonVariable, setButtonVariable] = useState(0);
  const [serviceMessage, setServiceMessage] = useState<string>("");

  const showPopup = (data: ActionData) => {
    setPopupData(data);
  };

  const showPopupReaction = (data: ReactionData) => {
    setPopupDataReaction(data);
  };

  const hidePopup = () => {
    setPopupData(null);
  };

  const hidePopupReaction = () => {
    setPopupDataReaction(null);
  };

  const AccountConnection = () => {
    console.log("AccountConnection");
    if (connected.includes(selectedService.bottomText) && selectedService.bottomText == "google") {
      console.log("google already connected");
      return
    }
    window.location.href =
      import.meta.env.VITE_DNS_NAME +
      ":8080/api/auth/" +
      selectedService.bottomText +
      "?token=" +
      localStorage.getItem("token");
    navigate("/servicePage");
  };

  const getServices = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/actions/get?serviceId=" + selectedService.serviceId)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const getConnected = () => {
    axios
      .get(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/user/services/get?token=" +
          localStorage.getItem("token")
      )
      .then((response) => {
        setConnected(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleServiceCreated = (message: string) => {
    setServiceMessage(message);
    setTimeout(() => {
      setServiceMessage("");
    }, 3000);
  };

  const getReactions = () => {
    axios
      .get(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/reactions/get?serviceId=" +
          selectedService?.serviceId
      )
      .then((response) => {
        setReactions(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    if (selectedService === null) {
      window.location.href = "/areaPage";
    }
    document.body.classList.add("disable-scroll");
    getConnected();
    getServices();
    getReactions();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      {selectedService && (
      <div className="h-screen relative">
        <div className="bg-third h-2/4 w-screen">
          <div
            style={{ fontFamily: "merriweather" }}
            className="flex items-center justify-center h-1/2 pt-8"
          >
            <img
              src={selectedService.topImage}
              alt="Image en haut"
              className="max-h-[100%] max-w-[100%]"
            />
          </div>
          <div className="">
            <p
              style={{ fontFamily: "merriweather", lineHeight: "1.2" }}
              className="pt-[30px] mb-2 text-[50px] text-purple-100"
            >
              {capitalizeFirstLetter(selectedService.bottomText)}
            </p>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[20px]"
              onClick={() => {
                  AccountConnection();
              }}
            >
              {connected.includes(selectedService.bottomText)
                ? "Connected"
                : "Connect"}
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 h-2/3 w-screen flex flex-col items-center">
          {serviceMessage && (
            <div className="alert alert-success text-[20px] text-white text-center font-bold flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{serviceMessage}</span>
            </div>
          )}
          {!popupData && !popupDataReaction && (
            <div className="flex flex-col items-center justify-between">
              <div>
                <h1
                  style={{ fontFamily: "merriweather" }}
                  className="font-semibold text-[30px] text-black dark:text-white pt-[20px]"
                >
                  Area's
                </h1>
              </div>
              <div className="m-[15px]">
                <button
                  style={{ fontFamily: "merriweather" }}
                  onClick={() => setButtonVariable(0)}
                  className="bg-secondary text-white px-4 py-2 rounded-full"
                >
                  {t("all")}
                </button>
                <button
                  style={{ fontFamily: "merriweather" }}
                  onClick={() => setButtonVariable(1)}
                  className="m-2 bg-[#2e1d9c] text-white px-4 py-2 rounded-full"
                >
                  Actions
                </button>
                <button
                  style={{ fontFamily: "merriweather" }}
                  onClick={() => setButtonVariable(2)}
                  className="bg-secondary text-white px-4 py-2 rounded-full"
                >
                  Reactions
                </button>
              </div>
            </div>
          )}
          {popupData && (
            <Popup
              data={popupData}
              onClose={hidePopup}
              onServiceCreated={handleServiceCreated}
              nameService={selectedService.bottomText}
            />
          )}
          {popupDataReaction && (
            <PopupReaction
              data={popupDataReaction}
              onClose={hidePopupReaction}
              onServiceCreated={handleServiceCreated}
              nameService={selectedService.bottomText}
            />
          )}
          <div className="max-h-[170px] overflow-y-auto">
            {(buttonVariable === 1 || buttonVariable === 0) && (
              <div>
                {Array.isArray(services) &&
                  services.length > 0 &&
                  !popupData &&
                  !popupDataReaction && (
                    <>
                      {services.map((service, index) => (
                        <Card
                          key={index}
                          id={service.id}
                          name={service.name}
                          args_action={service.args_action}
                          description={service.description}
                          serviceId={service.serviceId}
                          onCardClick={showPopup}
                        />
                      ))}
                    </>
                  )}
              </div>
            )}
            {(buttonVariable === 2 || buttonVariable === 0) && (
              <div>
                {!popupDataReaction &&
                  Array.isArray(reactions) &&
                  reactions.length > 0 &&
                  !popupData && (
                    <>
                      {reactions.map((reaction, index) => (
                        <CardReaction
                          key={index}
                          id={reaction.id}
                          name={reaction.name}
                          args_reaction={reaction.args_reaction}
                          description={reaction.description}
                          serviceId={reaction.serviceId}
                          onCardClick={showPopupReaction}
                        />
                      ))}
                    </>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
      )};
    </>
  );
}
