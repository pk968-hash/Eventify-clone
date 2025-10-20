import logo from "../../assets/logo.png";

const PageLoader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white fixed z-[9999]">
      <div className="relative flex items-center justify-center">
        {/* Spinning Circle Outline */}
        <div className="absolute w-50 h-50 border-6 border-[#A6ADBB] border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          draggable="false"
          className="w-40 select-none"
        />
      </div>
    </div>
  );
};

export default PageLoader;
