import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "src/models";
import { useFormik } from "formik";
import { ForgotValidatorForm } from "src/validators";
import { SettingsContext } from "src/context/settings";
import logo from "src/assets/logo.svg";
import Slider from "src/components/UI/Slider";
import eye from "src/assets/icons/eye.svg";
import noEye from "src/assets/icons/no-eye.svg";
import styles from "../auth.module.css";

const Forgot = () => {
  const settingsContext = useContext(SettingsContext);
  const {
    settingsState: { translated_text },
  } = settingsContext;
  const [show, setShow] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  const formik = useFormik({
    initialValues: ForgotValidatorForm.initialState,
    validationSchema: ForgotValidatorForm.validatorSchemaForgot,
    validateOnMount: false,
    onSubmit: async ({ new_password, confirm_password }) => {
      console.log(new_password, confirm_password);
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
          <h3>
            <span>Bienvenidos</span>
            Actualiza tu contraseña
          </h3>
          <p>{translated_text.text_forgot}</p>
          <div className={styles.authentication__input}>
            <label htmlFor="new_password">{translated_text.new_password}</label>
            <input
              className={
                formik.touched.new_password && formik.errors.new_password
                  ? "invalid"
                  : ""
              }
              type={show ? "text" : "password"}
              id="new_password"
              autoComplete="off"
              name="new_password"
              placeholder={translated_text.write_new_password}
              onBlur={formik.handleBlur}
              value={formik.values.new_password}
              onChange={formik.handleChange}
            />
            {show ? (
              <img onClick={handleShow} src={eye} alt="eye icon" />
            ) : (
              <img onClick={handleShow} src={noEye} alt="eye icon" />
            )}
            {formik.touched.new_password && formik.errors.new_password ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.new_password}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className={styles.authentication__input}>
            <label htmlFor="confirm_password">
              {translated_text.confirm_password}
            </label>
            <input
              className={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? "invalid"
                  : ""
              }
              type={show ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              autoComplete="off"
              placeholder={translated_text.write_confirm_password}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            {show ? (
              <img onClick={handleShow} src={eye} alt="eye icon" />
            ) : (
              <img onClick={handleShow} src={noEye} alt="eye icon" />
            )}
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.confirm_password}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <button type="submit" disabled={!formik.dirty || !formik.isValid}>
            {translated_text.change_password}
          </button>
          <p>
            ¿Ya tienes una cuenta?
            <Link to={`/${publicRoutes.LOGIN}`}>Iniciar sesión</Link>
          </p>
        </form>
        <p>© {currentYear} Todos los derechos reservados.</p>
      </section>
      <Slider />
    </article>
  );
};

export default Forgot;
