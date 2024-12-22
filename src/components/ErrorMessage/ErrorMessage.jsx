import PropTypes from 'prop-types';
import css from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return <div className={css.error}>{message}</div>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
