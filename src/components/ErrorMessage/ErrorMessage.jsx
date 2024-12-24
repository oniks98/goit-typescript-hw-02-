import toast from 'react-hot-toast';

function ErrorMessage({ message }) {
  toast.error(message); // Показать уведомление
  return null; // Компонент не рендерит ничего
}

export default ErrorMessage;

// import css from './ErrorMessage.module.css';

// function ErrorMessage({ message }) {
//   return <div className={css.error}>{message}</div>;
// }

// export default ErrorMessage;
