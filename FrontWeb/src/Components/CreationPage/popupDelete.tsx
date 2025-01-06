import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Area {
  id: number;
  actionId: number;
  actionName: string;
  areaId: number;
  reactionId: number;
  reactionName: string;
}

function DeleteCard({ areaMap }: { areaMap: Area }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validateArea = (areaMap: Area) => {
    deleteArea(areaMap);
    setModalVisible(!isModalVisible);
  };

  const deleteArea = async (data: Area) => {
    try {
      await axios.delete(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/areas/delete?areaId=" +
          data.areaId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/servicePage");
    } catch (error) {
      console.error("Erreur lors de la requete :", error);
    }
  };

  return (
    <>
      <button
        data-modal-target="popup-modal"
        onClick={toggleModal}
        className="rounded-full block text-white bg-secondary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-blue-800"
        type="button"
      >
        {t("delete")}
      </button>

      {isModalVisible && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="bg-grey-300 text-white fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
        >
          <div className="relative max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {t("Are you sure you want to delete this area?")}
                </h3>
                <button
                  onClick={() => validateArea(areaMap)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  {t("Yes, I m sure")}
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                >
                  {t("No, cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteCard;
