import React from "react";
import "./DynamicForm.css";

interface Option {
  label: string;
  value: string;
}

interface Field {
  label: string;
  name: string;
  type: string;
  options?: Option[];
}

interface Section {
  type: string;
  fields: Field[];
}

interface DynamicFormProps {
  sections: Section[];
  onSubmit: (data: Record<string, any>) => void;
  disabled?: boolean;
  initialValues?: Record<string, any>;
  title?: string;
  description?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ sections, onSubmit, disabled = false, initialValues = {}, title, description }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log("Dados do formulário coletados:", data);
    onSubmit(data);
  };

  const renderField = (field: Field) => {
    const defaultValue = initialValues[field.name] || "";
    
    if (field.type === "select") {
      return (
        <select 
          key={field.name} 
          name={field.name} 
          className="dynamic-form__select"
          required
          disabled={disabled}
          defaultValue={defaultValue}
        >
          <option value="">Selecione</option>
          {field.options?.map((opt: Option) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          key={field.name}
          name={field.name}
          placeholder={field.label}
          className="dynamic-form__input"
          required
          disabled={disabled}
          defaultValue={defaultValue}
        />
      );
    }

    return (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        placeholder={field.label}
        className="dynamic-form__input"
        required
        disabled={disabled}
        defaultValue={defaultValue}
      />
    );
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {title && <h3 className="dynamic-form__title">{title}</h3>}
      {description && <p className="dynamic-form__description">{description}</p>}
      {sections.map((section: Section, index: number) => (
        <div 
          className={`dynamic-form__section dynamic-form__section--${section.type}`} 
          key={index}
        >
          {section.fields.map((field: Field) => (
            <div className="dynamic-form__field" key={field.name}>
              <label className="dynamic-form__label">{field.label}</label>
              {renderField(field)}
            </div>
          ))}
        </div>
      ))}
      <button 
        type="submit" 
        className="dynamic-form__button"
        disabled={disabled}
      >
        {disabled ? "Cadastrando..." : "Enviar"}
      </button>
    </form>
  );
};

export default DynamicForm;
export type { Section, Field, Option };
