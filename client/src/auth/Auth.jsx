import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthService, { tokenValidationApi } from "../services/Authservice";
import '../components/login.scss'
export default function Auth() {
  // const [tokenParams, setTokenParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["genai"]);
  const navigate = useNavigate();
  // const token= tokenParams.get("token");
  const delete_cookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  useEffect(() => {
    async function validateToken(token) {
      try {
        const payload = {
          token: token
        }
        const response = await tokenValidationApi(payload);
        if (response?.data?.is_success == true) {
          return true;
        } else {
          delete_cookie('genai')
          return false;
        }
      } catch (error) {
        return false;
      }

    }

    async function HandleSSORedirection() {

      //using cookies
      if (!cookies.genai && !cookies?.genai?.token) {
        navigate("/");
      } else {
        let tokenValidation = await validateToken(
          cookies.genai.token
        );
        if (tokenValidation) {
          return navigate(`/${import.meta.env.VITE_ROUTE_PREFIX}/genai`);
        }
        else {
          delete_cookie('genai')
          navigate(`/${import.meta.env.VITE_ROUTE_PREFIX}/`);
        }
      }
    }
    HandleSSORedirection();
  }, []);
  return <></>;
}
