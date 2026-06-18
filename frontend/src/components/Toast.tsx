import { useState, useEffect, useCallback } from 'react';

export interface ToastMessage {
  id: number;
  text: string;
  variant: 'error' | 'success';
}

let toastId = 0;
let addToastFn: ((msg: Omit<ToastMessage, 'id'>) => void) | null = null;

export const showToast = (text: string, variant: 'error' | 'success' = 'error') => {
  if (addToastFn) {
    addToastFn({ text, variant });
  }
};

const ToastItem = ({ message, onRemove }: { message: ToastMessage; onRemove: (id: number) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(message.id), 4000);
    return () => clearTimeout(timer);
  }, [message.id, onRemove]);

  const bg = message.variant === 'error' ? 'bg-red-600' : 'bg-green-600';

  return (
    <div
      className={`${bg} text-white px-4 py-3 rounded shadow-lg mb-2 cursor-pointer transition-opacity hover:opacity-90`}
      onClick={() => onRemove(message.id)}
    >
      {message.text}
    </div>
  );
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = ++toastId;
    setToasts(prev => {
      const existing = prev.find(t => t.text === msg.text);
      if (existing) return prev;
      return [...prev, { ...msg, id }];
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {toasts.map(msg => (
        <ToastItem key={msg.id} message={msg} onRemove={removeToast} />
      ))}
    </div>
  );
};
