export const validationRules = {
  title: {
    required: 'Título é obrigatório',
    minLength: 'Título deve ter pelo menos 3 caracteres',
    maxLength: 'Título deve ter no máximo 100 caracteres',
    pattern: 'Título contém caracteres inválidos',
  },
  content: {
    required: 'Conteúdo é obrigatório',
    minLength: 'Conteúdo deve ter pelo menos 10 caracteres',
    maxLength: 'Conteúdo deve ter no máximo 5000 caracteres',
  },
  author: {
    required: 'Autor é obrigatório',
    minLength: 'Nome do autor deve ter pelo menos 2 caracteres',
    maxLength: 'Nome do autor deve ter no máximo 50 caracteres',
    pattern: 'Nome do autor contém caracteres inválidos',
  },
  email: {
    required: 'Email é obrigatório',
    pattern: 'Email deve ter um formato válido',
  },
  password: {
    required: 'Senha é obrigatória',
    minLength: 'Senha deve ter pelo menos 6 caracteres',
    maxLength: 'Senha deve ter no máximo 50 caracteres',
  },
};

export const validationSchemas = {
  post: {
    title: {
      required: validationRules.title.required,
      minLength: validationRules.title.minLength,
      maxLength: validationRules.title.maxLength,
      pattern: validationRules.title.pattern,
    },
    content: {
      required: validationRules.content.required,
      minLength: validationRules.content.minLength,
      maxLength: validationRules.content.maxLength,
    },
    author: {
      required: validationRules.author.required,
      minLength: validationRules.author.minLength,
      maxLength: validationRules.author.maxLength,
      pattern: validationRules.author.pattern,
    },
  },
  user: {
    email: {
      required: validationRules.email.required,
      pattern: validationRules.email.pattern,
    },
    password: {
      required: validationRules.password.required,
      minLength: validationRules.password.minLength,
      maxLength: validationRules.password.maxLength,
    },
  },
};

// Funções de validação específicas
export const validateTitle = (title) => {
  if (!title || title.trim() === '') {
    return validationRules.title.required;
  }
  if (title.length < 3) {
    return validationRules.title.minLength;
  }
  if (title.length > 100) {
    return validationRules.title.maxLength;
  }
  // Verifica se contém apenas letras, números, espaços e caracteres especiais básicos
  const titlePattern = /^[a-zA-Z0-9\s\-_.,!?()]+$/;
  if (!titlePattern.test(title)) {
    return validationRules.title.pattern;
  }
  return null;
};

export const validateContent = (content) => {
  if (!content || content.trim() === '') {
    return validationRules.content.required;
  }
  if (content.length < 10) {
    return validationRules.content.minLength;
  }
  if (content.length > 5000) {
    return validationRules.content.maxLength;
  }
  return null;
};

export const validateAuthor = (author) => {
  if (!author || author.trim() === '') {
    return validationRules.author.required;
  }
  if (author.length < 2) {
    return validationRules.author.minLength;
  }
  if (author.length > 50) {
    return validationRules.author.maxLength;
  }
  // Verifica se contém apenas letras, espaços e caracteres especiais básicos
  const authorPattern = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  if (!authorPattern.test(author)) {
    return validationRules.author.pattern;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return validationRules.email.required;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return validationRules.email.pattern;
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return validationRules.password.required;
  }
  if (password.length < 6) {
    return validationRules.password.minLength;
  }
  if (password.length > 50) {
    return validationRules.password.maxLength;
  }
  return null;
};

// Função para validar formulário completo
export const validateForm = (values, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const value = values[field];
    const fieldSchema = schema[field];
    
    // Validação obrigatória
    if (fieldSchema.required && (!value || value.trim() === '')) {
      errors[field] = fieldSchema.required;
      return;
    }
    
    // Validação de tamanho mínimo
    if (fieldSchema.minLength && value && value.length < fieldSchema.minLength) {
      errors[field] = fieldSchema.minLength;
      return;
    }
    
    // Validação de tamanho máximo
    if (fieldSchema.maxLength && value && value.length > fieldSchema.maxLength) {
      errors[field] = fieldSchema.maxLength;
      return;
    }
    
    // Validação de padrão
    if (fieldSchema.pattern && value && !fieldSchema.pattern.test(value)) {
      errors[field] = fieldSchema.pattern;
      return;
    }
    
    // Validação customizada
    if (fieldSchema.custom && typeof fieldSchema.custom === 'function') {
      const customError = fieldSchema.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });
  
  return errors;
};
