import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertComponent = ({
  showAlert, // Boolean to trigger the alert
  title = 'Alert Title', // Default values if no props passed
  text = 'This is a simple alert',
  icon = 'info', // You can pass 'success', 'error', 'warning', etc.
  onConfirm = () => {} // Optional: Action to trigger on confirm
}) => {
  useEffect(() => {
    if (showAlert) {
      MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
      }).then(result => {
        if (result.isConfirmed) {
          onConfirm(); // Trigger any confirm action
        }
      });
    }
  }, [showAlert]); // Only trigger alert when showAlert is true

  return null; // Nothing to render visually, it's just for triggering the alert
};

export default SweetAlertComponent;
