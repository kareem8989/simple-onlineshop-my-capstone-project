import {useCallback} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export default function LogoutButton () {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(async () => {
    await axios.get("/api/app-users/logout");
    navigate("/login?redirect=" + encodeURIComponent(location.pathname + location.search));
    window.document.cookie = "";
    window.localStorage.clear();
  }, [location, navigate]);

  return (
    <button className={"logout-button"} onClick={logout}><h6>Logout</h6></button>
  )
}