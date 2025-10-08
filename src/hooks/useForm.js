import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;

    if (rule.required && (!value || value.trim() === '')) {
      return rule.required;
    }

    if (rule.minLength && value && value.length < 3) {
      return rule.minLength;
    }

    if (rule.maxLength && value && value.length > 100) {
      return rule.maxLength;
    }

    if (rule.pattern && value) {
      const titlePattern = /^[a-zA-Z0-9\s\-_.,!?()]+$/;
      const authorPattern = /^[a-zA-ZÀ-ÿ\s\-']+$/;
      
      if (name === 'title' && !titlePattern.test(value)) {
        return rule.pattern;
      }
      if (name === 'author' && !authorPattern.test(value)) {
        return rule.pattern;
      }
    }

    if (rule.custom && typeof rule.custom === 'function') {
      return rule.custom(value);
    }

    return null;
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Validação específica para cada campo
    if (!values.title || values.title.trim() === '') {
      newErrors.title = 'Título é obrigatório';
      isValid = false;
    } else if (values.title.length < 3) {
      newErrors.title = 'Título deve ter pelo menos 3 caracteres';
      isValid = false;
    } else if (values.title.length > 100) {
      newErrors.title = 'Título deve ter no máximo 100 caracteres';
      isValid = false;
    }

    if (!values.content || values.content.trim() === '') {
      newErrors.content = 'Conteúdo é obrigatório';
      isValid = false;
    } else if (values.content.length < 10) {
      newErrors.content = 'Conteúdo deve ter pelo menos 10 caracteres';
      isValid = false;
    } else if (values.content.length > 5000) {
      newErrors.content = 'Conteúdo deve ter no máximo 5000 caracteres';
      isValid = false;
    }

    if (!values.author || values.author.trim() === '') {
      newErrors.author = 'Autor é obrigatório';
      isValid = false;
    } else if (values.author.length < 2) {
      newErrors.author = 'Nome do autor deve ter pelo menos 2 caracteres';
      isValid = false;
    } else if (values.author.length > 50) {
      newErrors.author = 'Nome do autor deve ter no máximo 50 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [values]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setFieldTouched(name);
    const error = validateField(name, values[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [setFieldTouched, validateField, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFormData = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  const addTag = useCallback((tag) => {
    setValues(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tag]
    }));
  }, []);

  const removeTag = useCallback((index) => {
    setValues(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    validateForm,
    reset,
    setFormData,
    addTag,
    removeTag,
  };
};
