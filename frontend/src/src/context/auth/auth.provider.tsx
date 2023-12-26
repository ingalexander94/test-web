import { useReducer } from "react";
import { AuthState, UserAuth } from "src/interfaces";
import { authReducer } from "./auth.reducer";
import { AuthContext } from "./auth.context";

const INITIAL_STATE: AuthState = {
  user: null,
  // user: {
  //   id_user: 1,
  //   roles: [{ id_role: 1, role_name: "Administrador", role_state: 1 }],
  //   user_email: "alex@gmail.com",
  //   user_names: "Alexander",
  //   user_surnames: "Peñaloza",
  //   user_state: true,
  // },
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const setUserAuth = (user: UserAuth | null) => {
    dispatch({ type: "setUserAuth", payload: user });
  };

  return (
    <AuthContext.Provider value={{ authState, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
