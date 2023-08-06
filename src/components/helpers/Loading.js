import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles["justify-content-center"]} ${styles["jimu-primary-loading"]}`}></div>
    </div>
  );
};

export default Loading;
