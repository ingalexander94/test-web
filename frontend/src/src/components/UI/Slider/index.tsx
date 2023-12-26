import styles from "./slider.module.css";

const Slider = () => {
  return (
    <section className={styles.slider}>
      <div className={styles.wrapper}>
        <input
          type="radio"
          name="radio-btn"
          id={styles.radio1}
          defaultChecked
        />
        <input type="radio" name="radio-btn" id={styles.radio2} />
        <input type="radio" name="radio-btn" id={styles.radio3} />
        <div className={styles.slides}>
          <div className={`${styles.slide} ${styles.first}`}>
            <p>
              Somos la primera herramienta de mantenimiento que fusiona la
              experiencia humana con la precisión de la tecnología.
            </p>
          </div>
          <div className={styles.slide}>
            <p>
              Somos la primera herramienta de mantenimiento que fusiona la
              experiencia humana con la precisión de la tecnología.
            </p>
          </div>
          <div className={styles.slide}>
            <p>
              Somos la primera herramienta de mantenimiento que fusiona la
              experiencia humana con la precisión de la tecnología.
            </p>
          </div>
        </div>
        <div className={styles.navigation_manual}>
          <label
            htmlFor={styles.radio1}
            className={`${styles.manual_btn} ${styles.auto_btn1}`}
          ></label>
          <label
            htmlFor={styles.radio2}
            className={`${styles.manual_btn} ${styles.auto_btn2}`}
          ></label>
          <label
            htmlFor={styles.radio3}
            className={`${styles.manual_btn} ${styles.auto_btn3}`}
          ></label>
        </div>
      </div>
    </section>
  );
};

export default Slider;
