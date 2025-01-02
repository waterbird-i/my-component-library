
import useForm from './useForm.ts';

const MyForm = ({ fields, onSubmit }) => {
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, handleChange, handleSubmit] = useForm(initialFormData,onSubmit);

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'password':
      case 'email':
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          >
            {field.options.map((option) => (
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
    <form onSubmit={handleSubmit}>
      {formData.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}：</label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">提交</button>
    </form>
  );
};

export default MyForm;