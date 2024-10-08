import imgLoad from '../../img/loading.svg';
import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.loader_componente}>
      <img src={imgLoad} alt="" />
    </div>
  );
}

export default Loading;
