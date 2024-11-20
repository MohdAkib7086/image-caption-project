import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/qna");
  }, [navigate]);

  return null; //
}

export default HomePage;
