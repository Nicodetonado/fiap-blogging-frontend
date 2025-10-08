# Design System

Sistema de design para o projeto de blogging.

## Cores

- **Primary**: Vermelho (#C8102E) - elementos principais
- **Secondary**: Grafite (#475569) - elementos secundários  
- **Gray**: Tons de cinza para textos e backgrounds
- **Success**: Verde para feedback positivo
- **Error**: Vermelho para feedback negativo
- **Warning**: Amarelo para avisos

### Escala de Cores

Cada cor tem 10 tons: `lightest`, `lighter`, `light`, `medium`, `base`, `main`, `dark`, `darker`, `darkest`, `deep`

## Componentes

### Button

```jsx
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Perigo</Button>
```

### Input

```jsx
<Input
  label="Nome"
  placeholder="Digite seu nome"
  error="Campo obrigatório"
  fullWidth
/>
```

### Card

```jsx
<Card hoverable>
  <Card.Header>
    <Card.Title>Título</Card.Title>
  </Card.Header>
  <Card.Content>
    Conteúdo
  </Card.Content>
</Card>
```

## Hooks

### useForm

```jsx
const { values, errors, handleChange, validateForm } = useForm(
  initialValues,
  validationRules
);
```

### useApi

```jsx
const { loading, error, execute } = useApi();
```

## Uso

```jsx
import { Button, Input, Card } from './components';
import { theme } from './styles';

const MyComponent = styled.div`
  color: ${theme.colors.primary.main};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;
```