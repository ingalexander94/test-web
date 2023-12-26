import { useContext, useEffect } from "react";
import { AuthContext } from "src/context/auth";
import { useLocation } from "react-router-dom";
import notificationsActiveIcon from "src/assets/icons/notification-active.svg";
import styles from "./header.module.css";
import { getRouteTitle } from "src/models";

const Header = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  return (
    <nav className={styles.navbar}>
      <h4>{getRouteTitle(location.pathname)}</h4>
      <ul>
        <li>
          <img src={notificationsActiveIcon} alt="Icono de notificaciones" />
        </li>
        <li>
          <input type="checkbox" name="submenu" id={styles.submenu} />
          <label htmlFor={styles.submenu}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/%C3%81lvaro_Uribe_%28cropped%29.jpg/220px-%C3%81lvaro_Uribe_%28cropped%29.jpg"
              alt="Avatar"
            />
            {`${authState.user?.user_names} ${authState.user?.user_surnames}`}
            <ul>
              <li>Mi cuenta</li>
              <li>Cerrar sesión</li>
            </ul>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
