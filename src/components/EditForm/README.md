# Componente EditForm

O `EditForm` é um componente reutilizável para formulários de edição que está sendo usado em várias telas do sistema.

## Características

- ✅ **Reutilizável**: Pode ser usado em qualquer tela de edição
- ✅ **Configurável**: Aceita configurações dinâmicas de campos
- ✅ **Responsivo**: Layout adaptável para diferentes tamanhos de tela
- ✅ **Acessível**: Suporte a labels, required fields e validação
- ✅ **Loading State**: Estado de carregamento integrado
- ✅ **Navegação**: Botões de salvar e cancelar com navegação automática

## Como Usar

### 1. Importar o Componente

```tsx
import { EditForm, FormSection } from "../../../components";
```

### 2. Configurar as Seções do Formulário

```tsx
const formSections: FormSection[] = [
  {
    title: "Dados Pessoais",
    fields: [
      {
        name: "nome",
        label: "Nome Completo",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true
      },
      {
        name: "telefone",
        label: "Telefone",
        type: "tel"
      },
      {
        name: "nascimento",
        label: "Data de Nascimento",
        type: "date"
      }
    ]
  },
  {
    title: "Informações Adicionais",
    fields: [
      {
        name: "observacoes",
        label: "Observações",
        type: "textarea",
        rows: 4
      }
    ]
  }
];
```

### 3. Usar o Componente

```tsx
const EditarExemplo = () => {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    nascimento: "1990-01-01",
    observacoes: "Observações do usuário"
  });

  const handleSave = (formData: Record<string, any>) => {
    console.log('Dados salvos:', formData);
    // Implementar lógica de salvamento
    alert('Salvo com sucesso!');
    navigate('/exemplo');
  };

  return (
    <div className="app-container">
      <HeaderPages title="Editar Exemplo" />
      
      <EditForm
        title="Editando: João Silva"
        entityName="exemplo"
        sections={formSections}
        initialData={dados}
        loading={loading}
        onSave={handleSave}
        backUrl="/exemplo"
      />
    </div>
  );
};
```

## Tipos de Campos Suportados

### Text
```tsx
{
  name: "nome",
  label: "Nome",
  type: "text",
  required: true,
  placeholder: "Digite seu nome"
}
```

### Email
```tsx
{
  name: "email",
  label: "Email",
  type: "email",
  required: true
}
```

### Tel (Telefone)
```tsx
{
  name: "telefone",
  label: "Telefone",
  type: "tel"
}
```

### Date
```tsx
{
  name: "nascimento",
  label: "Data de Nascimento",
  type: "date"
}
```

### Number
```tsx
{
  name: "idade",
  label: "Idade",
  type: "number"
}
```

### Select
```tsx
{
  name: "categoria",
  label: "Categoria",
  type: "select",
  required: true,
  options: [
    { label: "Opção 1", value: "opcao1" },
    { label: "Opção 2", value: "opcao2" }
  ]
}
```

### Textarea
```tsx
{
  name: "observacoes",
  label: "Observações",
  type: "textarea",
  rows: 4
}
```

## Props do Componente

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | `string` | ✅ | Título do formulário |
| `entityName` | `string` | ✅ | Nome da entidade para mensagens |
| `sections` | `FormSection[]` | ✅ | Array de seções do formulário |
| `initialData` | `Record<string, any>` | ✅ | Dados iniciais do formulário |
| `loading` | `boolean` | ❌ | Estado de carregamento (padrão: false) |
| `onSave` | `(data: Record<string, any>) => void` | ✅ | Função chamada ao salvar |
| `onCancel` | `() => void` | ❌ | Função customizada de cancelamento |
| `backUrl` | `string` | ❌ | URL para navegação ao cancelar |
| `showActions` | `boolean` | ❌ | Mostrar botões de ação (padrão: true) |

## Exemplos de Uso

### Editar Aluno
```tsx
const formSections: FormSection[] = [
  {
    title: "Dados Pessoais",
    fields: [
      { name: "nome", label: "Nome", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "telefone", label: "Telefone", type: "tel" },
      { name: "nascimento", label: "Nascimento", type: "date" },
      { name: "cpf", label: "CPF", type: "text" }
    ]
  }
];
```

### Editar Exercício
```tsx
const formSections: FormSection[] = [
  {
    title: "Informações Básicas",
    fields: [
      { name: "nome", label: "Nome", type: "text", required: true },
      { 
        name: "categoria", 
        label: "Categoria", 
        type: "select", 
        required: true,
        options: [
          { label: "Peito", value: "Peito" },
          { label: "Costas", value: "Costas" }
        ]
      }
    ]
  },
  {
    title: "Descrição",
    fields: [
      { name: "descricao", label: "Descrição", type: "textarea", rows: 3 }
    ]
  }
];
```

## Benefícios

1. **Reutilização**: Mesmo componente para todas as telas de edição
2. **Consistência**: Interface uniforme em todo o sistema
3. **Manutenibilidade**: Mudanças centralizadas no componente
4. **Produtividade**: Desenvolvimento mais rápido de novas telas
5. **UX**: Experiência do usuário consistente

## Migração de Telas Existentes

Para migrar uma tela existente para usar o `EditForm`:

1. **Remover** o código manual do formulário
2. **Criar** a configuração `FormSection[]`
3. **Substituir** pelo componente `EditForm`
4. **Ajustar** a função de salvamento para receber os dados

### Antes (Código Manual)
```tsx
<div className="form-section">
  <h3>Dados Pessoais</h3>
  <div className="form-grid">
    <div className="form-group">
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
        className="form-input"
      />
    </div>
    {/* ... mais campos */}
  </div>
</div>
```

### Depois (EditForm)
```tsx
<EditForm
  title="Editando: João Silva"
  entityName="aluno"
  sections={formSections}
  initialData={formData}
  loading={loading}
  onSave={handleSave}
  backUrl="/alunos"
/>
``` 