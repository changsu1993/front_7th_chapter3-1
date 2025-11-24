import { useState, useCallback } from 'react';

export function useFormState<T extends Record<string, unknown>>(initialState: T = {} as T) {
  const [formData, setFormData] = useState<T>(initialState);

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const setFields = useCallback((fields: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  }, []);

  const reset = useCallback((data: T = initialState) => {
    setFormData(data);
  }, [initialState]);

  const handleChange = useCallback((field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleValueChange = useCallback((field: keyof T) => {
    return (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  }, []);

  return {
    formData,
    setFormData,
    setField,
    setFields,
    reset,
    handleChange,
    handleValueChange,
  };
}
