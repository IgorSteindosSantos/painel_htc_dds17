import imgLoad from '../../img/loading.svg';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <>
      <div className={styles.loader_componente}>
        <img src={imgLoad} alt="" />
      </div>
    </>
  );
}
