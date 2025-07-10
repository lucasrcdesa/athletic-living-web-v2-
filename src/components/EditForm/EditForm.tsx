import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditForm.css";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  rows?: number;
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export interface EditFormProps {
  title: string;
  description?: string;
  entityName: string;
  sections: FormSection[];
  initialData: Record<string, any>;
  loading?: boolean;
  onSave: (data: Record<string, any>) => void;
  onCancel?: () => void;
  backUrl?: string;
  showActions?: boolean;
}

const EditForm: React.FC<EditFormProps> = ({
  title,
  description,
  entityName,
  sections,
  initialData,
  loading = false,
  onSave,
  onCancel,
  backUrl,
  showActions = true
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setFormData(initialData);
    setIsLoading(loading);
  }, [initialData, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (backUrl) {
      navigate(backUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-form-loading">
        <div className="loading-spinner"></div>
        <p>Carregando dados do {entityName}...</p>
      </div>
    );
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || "",
      onChange: handleInputChange,
      className: "form-input",
      required: field.required,
      placeholder: field.placeholder
    };

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          rows={field.rows || 3}
          className="form-textarea"
        />
      );
    }

    if (field.type === "select") {
      return (
        <select {...commonProps}>
          <option value="">Selecione</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        {...commonProps}
        type={field.type}
      />
    );
  };

  return (
    <div className="edit-form-container">
      <div className="edit-form-header">
        <div className="edit-form-header-titles">
          <h2>{title}</h2>
          {description && <p className="edit-form-description">{description}</p>}
        </div>
        {showActions && (
          <div className="edit-form-actions">
            <button className="btn-cancelar" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={handleSave}>
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className="edit-form-content">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="form-section">
            <h3>{section.title}</h3>
            <div className="form-grid">
              {section.fields.map((field, fieldIndex) => (
                <div 
                  key={fieldIndex} 
                  className={`form-group ${field.type === "textarea" ? "full-width" : ""}`}
                >
                  <label htmlFor={field.name}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditForm; 