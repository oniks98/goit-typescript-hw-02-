import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#00BFFF"
        ariaLabel="loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
