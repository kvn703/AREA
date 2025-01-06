import loginImage from "../assets/login.jpg";
import LoginInputs from "../Components/LoginPage/loginInputs.tsx";
import ImagePage from "../Components/LoginPage/imagePage.tsx";

export default function Login() {
  return (
    <>
      <div className="flex bg-white flex-col h-screen lg:flex-row">
        <div className="flex-grow sm:w-full md:w-full lg:w-1/2 xl:w-1/2 bg-white card rounded-box place-items-center mt-[120px]">
          <LoginInputs />
        </div>
        <div className="hidden lg:block flex-grow w-1/2 bg-white card rounded-box place-items-end">
          <ImagePage url={loginImage} />
        </div>
      </div>
    </>
  );
}
