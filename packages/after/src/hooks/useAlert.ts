import { useState, useCallback } from 'react';

interface AlertState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showSuccess = useCallback((message: string) => {
    setAlert({ show: true, message, type: 'success' });
  }, []);

  const showError = useCallback((message: string) => {
    setAlert({ show: true, message, type: 'error' });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, show: false }));
  }, []);

  return {
    alert,
    showSuccess,
    showError,
    hideAlert,
  };
}
