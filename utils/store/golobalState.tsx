import { createContext, useContext, useEffect, useLayoutEffect, useReducer } from "react";
import reducers from "./reducer";
import { getData } from "../service";
import { useRouter } from "next/router";

export const DataContext: any = createContext(null);

export const DataProvider = ({ children }: any) => {
  const initialState = {
    notify: {},
    auth: {},
    user: {},
    voice: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  const router = useRouter();

  useEffect(() => {
    const firstLogin = localStorage?.getItem("firstLogin");
    const accessToken: any = localStorage?.getItem("access_token");
  
    if (firstLogin) {
      getData("membership-service/1.2.0/users/me", accessToken)
        .then((res) => {
          dispatch({ type: "PROFILE", payload: res });
          dispatch({ type: "AUTH", payload:  {token: accessToken}});
        })
        .catch((_e: any) => {
          localStorage.removeItem("firstLogin");
          router.push("/signin");
        }
        ); 
    }
  }, [])

  useEffect(() => {
    const accessToken: any = localStorage?.getItem("access_token");
    if (!accessToken) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("firstLogin");
      dispatch({ type: "AUTH", payload: {}});
      router.push('/signin')
    }
  }, [state.auth.token])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
