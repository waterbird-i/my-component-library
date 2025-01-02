import { useState } from 'react';

const useForm = (initialFormData, onSubmit) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return [formData, handleChange,handleSubmit];
};

export default useForm;