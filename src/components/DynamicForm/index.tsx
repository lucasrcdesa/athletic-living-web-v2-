import React from "react";
import "./styles.css";

interface Field {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; // para selects
}

export interface Section {
  type: "single" | "double";
  fields: Field[];
}

interface DynamicFormProps {
  sections: Section[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ sections, onSubmit }) => {
  const renderField = (field: Field) => {
    if (field.type === "select" && field.options) {
      return (
        <select id={field.id}>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        id={field.id}
        placeholder={field.placeholder || field.label}
      />
    );
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      {sections.map((section, idx) => (
        <div className="form-container-item" key={idx}>
          {section.type === "double" ? (
            <div className="form-container-double-input">
              {section.fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          ) : (
            section.fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                {renderField(field)}
              </div>
            ))
          )}
        </div>
      ))}
      <div className="form-container-item" style={{ alignItems: "center" }}>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default DynamicForm;
