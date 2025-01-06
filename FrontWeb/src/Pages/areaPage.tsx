import { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import Search from "../Components/AreaPage/search.tsx";
import "../App.css";

type ServiceData = {
  logo_url: string;
  name: string;
  description: string;
  id: number;
};

export default function Area() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  const [services, setServices] = useState<ServiceData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);
  const [userServices, setUserServices] = useState<string[]>([]);

  const getServices = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/services/get")
      .then((response) => {
        setServices(response.data);
        setFilteredServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const getUserServices = () => {
    axios
      .get(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/user/services/get?token=" +
          localStorage.getItem("token")
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUserServices(response.data);
        } else {
          setUserServices([]);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const filterServices = (searchValue: string) => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  useEffect(() => {
    document.body.classList.add("disable-scroll");
    getServices();
    getUserServices();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      <div className="h-screen relative bg-main dark:bg-slate-800">
        <Search onSearch={filterServices} />
        <div className="grid-container max-h-[550px] overflow-y-auto">
          {filteredServices.map((service, index) => (
            <ServiceCase
              key={index}
              topImage={service.logo_url}
              bottomText={service.name}
              description={service.description}
              serviceId={service.id}
              userServices={userServices}
            />
          ))}
        </div>
      </div>
    </>
  );
}
