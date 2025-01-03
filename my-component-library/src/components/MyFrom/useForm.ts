import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, ValidationErrors, UseFormOptions } from './types';

export interface UseFormReturn<T extends FormData> {
  formData: T;
  errors: ValidationErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setFieldValue: (name: string, value: string | boolean) => void;
}

const useForm = <T extends FormData>(
  initialFormData: T,
  onSubmit: (data: T) => void | Promise<void>,
  options: UseFormOptions = {}
): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { validate, onSuccess } = options;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const setFieldValue = (name: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 表单验证
    if (validate) {
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      await onSubmit(formData);
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        submit: error instanceof Error ? error.message : '提交表单时发生错误',
      });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};

export default useForm;