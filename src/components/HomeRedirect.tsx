import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/bollywood-movies", { replace: true });
  }, [navigate]);

  return null;
};

export default HomeRedirect;
