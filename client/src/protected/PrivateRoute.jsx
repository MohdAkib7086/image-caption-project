
import { Route, Navigate, useNavigate } from "react-router-dom";
// import { tokenValidationApi } from "../services/Authservice";
import { useEffect, useState } from "react";
import  axios from "axios";
import { BASE_URL } from "../constants";
// import { useCookies } from "react-cookie";

async function validateTokenApi(token) {
    // console.log("aaaaaaa");
    try {
      // const payload = {
      //   "token": token
      // }
      const response = await axios.get(`${process.env.REACT_APP_PREDICT_URL}/auth/profile`,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      } );
      // console.log(response,"aaaaaaa");
      console.log(response?.data)
      return true
      if (response?.data?.is_success == true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    
}
const isAuthenticated = (token) => {
    return token !== null && token !== undefined;
};

const PrivateRoute = ({ children }) => {
  const [routeprotect, setRouteprotect] = useState(false);
  const navigate = useNavigate();
  
  console.log("firstname", "firstname")
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      console.log(token, "token of protected")
      if (!isAuthenticated(token)) {
        console.log("first")
        navigate(`/login`);
      } else {
        try {
          const isValid = await validateTokenApi(token);
          console.log(isValid, "sssssshhhhh----")
          if (!isValid) {
            // console.log("hhhhhhh----")
            navigate(`/login`);
            // console.log("kksjdflkjsdkfjsaldjfslkjdfksdjl")
          }
          else {
            setRouteprotect(true)
          }
 
        } catch (error) {
          navigate(`/login`);
        }
      }
    };
    validateToken();
  }, []);
  return routeprotect ? <>{children}</> : <p>loading</p>;
};
export default PrivateRoute;