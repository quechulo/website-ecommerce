import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div class={styles.loader}>
      <div class={`${styles["justify-content-center"]} ${styles["jimu-primary-loading"]}`}></div>
    </div>
  );
};

export default Loading;
