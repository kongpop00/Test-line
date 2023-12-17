import liff from "@line/liff";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type TypeProviderLine = {
  children: ReactNode;
};

type LineTypecontext = {
  mainLine: () => void;
  getProfile: () => void;
  logout: () => void;
  dataLine: any;
  setVisit: any;
  visit: boolean;
  handleCheckvisit: () => void;
};

type dataLine = {
  pictureUrl: string;
  displayName: string;
  userId: string;
};
const useLinesContext = createContext({} as LineTypecontext);

export function useLineContext() {
  return useContext(useLinesContext);
}

export function LineProvider({ children }: TypeProviderLine) {
  const [dataLine, setdataLine] = useState<dataLine[]>();
  const navigate = useNavigate();
  const [visit, setVisit] = useState(false);

  const handleCheckvisit = () => {
    setVisit(true);
    navigate("/home");
  };

  const mainLine = async () => {
    console.log("mainline");

    await liff.init({
      liffId: "2002021317-2Bymmev1", // Use own liffId
    });
    try {
      console.log("===========================");

      if (liff.isLoggedIn()) {
        getProfile();
        console.log("login แล้วนะจ้ะ");
        navigate("/home");
      } else {
        liff.login();
        console.log(" ยังไม่ได้แล้วนะจ้ะ");
      }
    } catch (error) {
      console.log("erorr", error);
    }
  };

  const getProfile = async () => {
    const profile: any = await liff.getProfile();
    setdataLine(profile);
    navigate("/home");
  };

  const logout = async () => {
    liff.logout();
    setVisit(false) 
    navigate("/");
    window.location.reload();
  

  };

  return (
    <useLinesContext.Provider
      value={{
        mainLine,
        getProfile,
        logout,
        dataLine,
        handleCheckvisit,
        visit,
        setVisit,
      }}
    >
      {children}
    </useLinesContext.Provider>
  );
}
