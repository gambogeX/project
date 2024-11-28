import toast from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
}

export function useToast() {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: 3000,
      ...options,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: 4000,
      ...options,
    });
  };

  const loading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    success,
    error,
    loading,
    dismiss,
  };
}