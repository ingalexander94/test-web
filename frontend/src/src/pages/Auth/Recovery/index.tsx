import { Link } from "react-router-dom";
import { publicRoutes } from "src/models";
import { useFormik } from "formik";
import { RecoveryValidatorForm } from "src/validators";
import { useContext } from "react";
import { SettingsContext } from "src/context/settings";
import { useFetch } from "src/hooks";
import AuthService from "src/services/auth.service";
import logo from "src/assets/logo.svg";
import Alerts from "src/lib/Alerts";
import Slider from "src/components/UI/Slider";
import styles from "../auth.module.css";

const Recovery = () => {
  const settingsContext = useContext(SettingsContext);
  const { callEndpoint } = useFetch();
  const {
    settingsState: { translated_text },
  } = settingsContext;

  const currentYear = new Date().getFullYear();

  const formik = useFormik({
    initialValues: RecoveryValidatorForm.initialState,
    validationSchema: RecoveryValidatorForm.validatorSchemaRecovery,
    validateOnMount: false,
    onSubmit: async ({ user_email }) => {
      try {
        if (formik.isValid) {
          const res = await callEndpoint(AuthService.forgot(user_email));
          if (res.data.ok) {
            await Alerts.showPopup(
              "Enlace de recuperación enviada",
              `Revisa la bandeja de entrada del correo ${user_email} para recuperar la contraseña.`
            );
            formik.resetForm();
          }
        }
      } catch (error: any) {
        await Alerts.showToast("error", error.response.data.error);
      }
    },
  });

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.authentication}`}
    >
      <section className={styles.authentication__wrapper}>
        <img src={logo} alt="Logo" />
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <h3>
            <span>Bienvenidos</span>
            Recupera tu cuenta
          </h3>
          <p>{translated_text.text_recovery}</p>
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
              placeholder={translated_text.write_email}
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
          <button type="submit" disabled={!formik.dirty || !formik.isValid}>
            {translated_text.recovery_password}
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

export default Recovery;
