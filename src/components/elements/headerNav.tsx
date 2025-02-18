import { DarkThemeToggle } from "flowbite-react";
import ButtonHome from "./buttonHome";
import { useLocation } from "react-router-dom";

const HeaderNavComponent: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {/* Header superior con Toogle para el tema oscuro */}
      <header className="flex justify-around ">
        {location.pathname === "/dashboard" && <ButtonHome />}
        <DarkThemeToggle />
      </header>
    </div>
  );
};

export default HeaderNavComponent;
