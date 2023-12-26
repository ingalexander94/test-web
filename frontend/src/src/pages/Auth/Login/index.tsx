import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { privateRoutes, publicRoutes } from "src/models";
import { LoginValidatorForm } from "src/validators";
import { AuthContext } from "src/context/auth";
import { useFetch } from "src/hooks";
import { CustomStorage } from "src/lib";
import AuthService from "src/services/auth.service";
import Alerts from "src/lib/Alerts";
import Slider from "src/components/UI/Slider";
import logo from "src/assets/logo.svg";
import eye from "src/assets/icons/eye.svg";
import noEye from "src/assets/icons/no-eye.svg";
import styles from "../auth.module.css";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { setUserAuth } = authContext;
  const { callEndpoint } = useFetch();
  const [show, setShow] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  const formik = useFormik({
    initialValues: LoginValidatorForm.initialState,
    validationSchema: LoginValidatorForm.validatorSchemaLogin,
    validateOnMount: false,
    onSubmit: async ({ user_email, user_password }) => {
      try {
        if (formik.isValid) {
          const res = await callEndpoint(
            AuthService.login(user_email, user_password)
          );
          if (res.data.ok) {
            CustomStorage.token = res.data.data.token;
            setUserAuth(res.data.data.user);
            formik.resetForm();
            navigate(`/${privateRoutes.PRIVATE}`, { replace: true });
          }
        }
      } catch (error: any) {
        await Alerts.showToast("error", error.response.data.error);
      }
    },
  });

  const handleShow = () => setShow(!show);

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.authentication}`}
    >
      <section className={styles.authentication__wrapper}>
        <img src={logo} alt="Logo" />
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <h3 className={styles.auth_login}>
            <span>Bienvenidos</span>
            Accede a tu cuenta
          </h3>
          <div className={styles.authentication__input}>
            <label htmlFor="user_email">Correo electrónico</label>
            <input
              className={
                formik.touched.user_email && formik.errors.user_email
                  ? "invalid"
                  : ""
              }
              type="email"
              id="user_email"
              name="user_email"
              autoComplete="off"
              placeholder="Escribe aquí tu correo electrónico"
              onBlur={formik.handleBlur}
              value={formik.values.user_email}
              onChange={formik.handleChange}
            />

            {formik.touched.user_email && formik.errors.user_email ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.user_email}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className={styles.authentication__input}>
            <label htmlFor="user_password">Contraseña</label>
            <input
              className={
                formik.touched.user_password && formik.errors.user_password
                  ? "invalid"
                  : ""
              }
              type={show ? "text" : "password"}
              id="user_password"
              name="user_password"
              autoComplete="off"
              placeholder="Escribe aquí tu contraseña"
              onBlur={formik.handleBlur}
              value={formik.values.user_password}
              onChange={formik.handleChange}
            />
            {show ? (
              <img onClick={handleShow} src={eye} alt="eye icon" />
            ) : (
              <img onClick={handleShow} src={noEye} alt="eye icon" />
            )}
            {formik.touched.user_password && formik.errors.user_password ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.user_password}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <label htmlFor={styles.remember}>
            <input type="checkbox" name="remember" id={styles.remember} />
            <div>
              <div></div>
            </div>
            Recordar contraseña
          </label>
          <button type="submit" disabled={!formik.dirty || !formik.isValid}>
            Iniciar Sesión
          </button>
          <p>
            ¿Has olvidado tu usuario y contraseña?
            <Link to={`/${publicRoutes.RECOVERY}`}>Recuperar acceso</Link>
          </p>
        </form>
        <p>© {currentYear} Todos los derechos reservados.</p>
      </section>
      <Slider />
    </article>
  );
};

export default Login;
