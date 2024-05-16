import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const TransactionAlert = ({ success, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close the alert after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={`popup ${success ? 'popup-success' : 'popup-error'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={success ? "M9 12l2 2 4-4" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
      </svg>
      <span>{success ? 'Your transaction has been successful!' : 'Transaction failed.'}</span>
    </div>,
    document.getElementById('popup-root')
  );
};

TransactionAlert.propTypes = {
  success: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionAlert;
