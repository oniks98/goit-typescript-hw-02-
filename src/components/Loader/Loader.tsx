import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loader}>
        <ThreeDots ariaLabel="loading" visible={true} />
      </div>
    </div>
  );
};

export default Loader;
