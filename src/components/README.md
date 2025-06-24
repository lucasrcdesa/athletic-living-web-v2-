# Estrutura de Componentes

Esta pasta contém todos os componentes reutilizáveis da aplicação, organizados de forma modular e escalável.

## Componentes Principais

### SideMenu

- **Arquivo**: `sideMenu/index.tsx`
- **Função**: Menu lateral com opções dinâmicas baseadas na seção selecionada
- **Props**: `menuOptions` - Array de opções do menu

### Header

- **Arquivo**: `header/index.tsx`
- **Função**: Header com botões de navegação entre seções
- **Props**:
  - `activeMenu` - Menu atualmente selecionado
  - `onMenuChange` - Callback para mudança de menu

### MainContent

- **Arquivo**: `mainContent/index.tsx`
- **Função**: Conteúdo principal que renderiza diferentes componentes baseado no menu ativo
- **Props**: `activeMenu` - Menu atualmente selecionado

## Componentes de Transição

### FadeTransition

- **Arquivo**: `transitions/FadeTransition.tsx`
- **Função**: Componente para transições suaves entre conteúdos
- **Props**:
  - `children` - Conteúdo a ser animado
  - `isVisible` - Estado de visibilidade
  - `duration` - Duração da animação (opcional)

## Hooks

### useMenuOptions

- **Arquivo**: `../hooks/useMenuOptions.ts`
- **Função**: Hook personalizado para gerenciar as opções de menu de cada seção
- **Retorna**: Função `getMenuOptions` e arrays de opções para cada seção

## Estrutura de Arquivos

```
src/
├── components/
│   ├── sideMenu/
│   │   ├── index.tsx
│   │   └── styles.css
│   ├── header/
│   │   ├── index.tsx
│   │   └── styles.css
│   ├── mainContent/
│   │   ├── index.tsx
│   │   └── styles.css
│   ├── transitions/
│   │   ├── FadeTransition.tsx
│   │   └── styles.css
│   └── index.ts
├── hooks/
│   └── useMenuOptions.ts
└── screens/
    └── home/
        ├── index.tsx
        └── styles.css
```

## Benefícios da Componentização

1. **Reutilização**: Componentes podem ser reutilizados em outras telas
2. **Manutenibilidade**: Código mais organizado e fácil de manter
3. **Testabilidade**: Componentes isolados são mais fáceis de testar
4. **Escalabilidade**: Estrutura preparada para crescimento
5. **Transições Suaves**: Animações fluidas entre diferentes conteúdos

## Como Usar

```tsx
import { SideMenu, Header, MainContent } from "../../components";
import { useMenuOptions } from "../../hooks/useMenuOptions";

const Home = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { getMenuOptions } = useMenuOptions();

  return (
    <div className="app-container">
      <SideMenu menuOptions={getMenuOptions(activeMenu)} />
      <div className="main-container">
        <Header activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <MainContent activeMenu={activeMenu} />
      </div>
    </div>
  );
};
```
