import React from 'react';
import useForm from './useForm';
import { Field, FormData, ValidationErrors } from './types';

type FormValues = {
  [key: string]: string;
}

interface MyFormProps {
  fields: Field[];
  onSubmit: (data: FormValues) => void | Promise<void>;
  className?: string;
  onSuccess?: () => void;
}

const MyForm: React.FC<MyFormProps> = ({ 
  fields, 
  onSubmit, 
  className = '',
  onSuccess
}) => {
  const initialFormData: FormValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as FormValues);

  const validate = (values: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    fields.forEach(field => {
      const value = values[field.name] as string;
      
      if (field.required && !value) {
        errors[field.name] = `${field.label}不能为空`;
      } else if (field.validate) {
        const error = field.validate(value);
        if (error) {
          errors[field.name] = error;
        }
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = '请输入有效的邮箱地址';
        }
      }
    });

    return errors;
  };

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit,
    resetForm 
  } = useForm<FormValues>(initialFormData, onSubmit, { validate, onSuccess });

  const renderField = (field: Field): JSX.Element | null => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      required: field.required,
      placeholder: field.placeholder,
      'aria-label': field.label,
      'aria-invalid': !!errors[field.name],
    };

    switch (field.type) {
      case 'text':
      case 'password':
      case 'email':
        return (
          <input
            type={field.type}
            {...commonProps}
          />
        );
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">请选择</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={className}
      noValidate
    >
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <div className="error-message" role="alert">
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      {errors.submit && (
        <div className="error-message submit-error" role="alert">
          {errors.submit}
        </div>
      )}
      <div className="form-actions">
        <button type="submit" className="submit-button">
          提交
        </button>
        <button 
          type="button" 
          className="reset-button"
          onClick={resetForm}
        >
          重置
        </button>
      </div>
    </form>
  );
};

export default MyForm;