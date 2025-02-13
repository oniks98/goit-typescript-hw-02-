import { ErrorMessageProps } from './ErrorMessage.types';
import css from './ErrorMessage.module.css';

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={css.error}>{message}</div>;
}

export default ErrorMessage;
