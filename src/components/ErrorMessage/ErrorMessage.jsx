import css from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return <div className={css.error}>{message}</div>;
}

export default ErrorMessage;
