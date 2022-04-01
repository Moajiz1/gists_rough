import Emumba from "./Emumba.PNG";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";

const Navbar = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <span className="logo">
        {" "}
        <img
          className="logo-header"
          onClick={handleClick}
          src={Emumba}
          alt="/"
        />{" "}
      </span>
      <ul className="list">
        <Login />
      </ul>
    </div>
  );
};

export default Navbar;
