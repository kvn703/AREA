import { useTranslation } from "react-i18next";

export default function ApkButton() {
  const { t } = useTranslation();

  const handleDownloadAPK = () => {
    window.location.href = "https://are4-51.com:8080/client.apk";
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 style={{ fontFamily: "merriweather" }} className=" text-[30px] bg-main dark:bg-slate-800 text-black dark:text-white font-bold mt-[-20px] mb-[48px] pl-[20px] pr-[20px]">{t("apkDownload")}</h1>
      </div>
        <button
          onClick={handleDownloadAPK}
          className="btn btn-primary bg-secondary text-white mt-[10px] font-bold py-2 px-4 rounded-full"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
          {t("download for free")}
        </button>
    </>
  );
}
