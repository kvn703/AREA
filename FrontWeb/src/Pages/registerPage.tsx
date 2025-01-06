import registerImage from "../assets/register.jpg";
import RegisterInputs from "../Components/LoginPage/registerInputs.tsx";
import ImagePage from "../Components/LoginPage/imagePage.tsx";

export default function Register() {
  return (
    <>
      <div className="flex bg-white flex-col h-screen lg:flex-row">
        <div className="flex-grow sm:w-full md:w-full lg:w-1/2 xl:w-1/2 bg-white card rounded-box place-items-center mt-[70px]">
          <RegisterInputs />
        </div>
        <div className="hidden lg:block flex-grow w-1/2 bg-white card rounded-box place-items-end">
          <ImagePage url={registerImage} />
        </div>
      </div>
    </>
  );
}
