import React, { useState, useMemo } from "react";
import "./SelectableList.css";

export interface SelectableItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  status?: string;
  statusColor?: string;
}

interface SelectableListProps {
  items: SelectableItem[];
  selectedItems: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  multiSelect?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  maxSelections?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showSort?: boolean;
  sortOptions?: Array<{ key: string; label: string }>;
  title?: string;
  description?: string;
  // Novas props para seleção de bloco
  showBlocoSelector?: boolean;
  numBlocos?: number;
  blocosPorItem?: Record<number, number>;
  onBlocoChange?: (itemId: number, bloco: number) => void;
  // Função para obter número de blocos por item (opcional)
  getNumBlocosPorItem?: (itemId: number) => number;
}

const SelectableList: React.FC<SelectableListProps> = ({
  items,
  selectedItems,
  onSelectionChange,
  multiSelect = true,
  loading = false,
  emptyMessage = "Nenhum item encontrado",
  maxSelections,
  placeholder = "Selecione os itens",
  searchPlaceholder = "Pesquisar...",
  showSearch = true,
  showSort = true,
  sortOptions = [
    { key: "title", label: "Nome" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "status", label: "Status" }
  ],
  title,
  description,
  showBlocoSelector = false,
  numBlocos = 1,
  blocosPorItem = {},
  onBlocoChange,
  getNumBlocosPorItem
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtra e ordena os itens
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Ordenação
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof SelectableItem] || "";
      let bValue = b[sortBy as keyof SelectableItem] || "";
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [items, searchTerm, sortBy, sortOrder]);

  const handleItemToggle = (itemId: number) => {
    if (multiSelect) {
      const newSelection = selectedItems.includes(itemId)
        ? selectedItems.filter(id => id !== itemId)
        : [...selectedItems, itemId];
      
      if (maxSelections && newSelection.length > maxSelections) {
        return;
      }
      
      onSelectionChange(newSelection);
    } else {
      onSelectionChange(selectedItems.includes(itemId) ? [] : [itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      onSelectionChange([]);
    } else {
      const allIds = filteredAndSortedItems.map(item => item.id);
      if (maxSelections) {
        onSelectionChange(allIds.slice(0, maxSelections));
      } else {
        onSelectionChange(allIds);
      }
    }
  };

  const getSelectedText = () => {
    if (selectedItems.length === 0) return placeholder;
    if (selectedItems.length === 1) {
      const item = items.find(i => i.id === selectedItems[0]);
      return item?.title || placeholder;
    }
    return `${selectedItems.length} item(s) selecionado(s)`;
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleBlocoChange = (itemId: number, bloco: number) => {
    if (onBlocoChange) {
      onBlocoChange(itemId, bloco);
    }
  };

  if (loading) {
    return (
      <div className="selectable-list-card">
        <div className="selectable-dropdown-container">
          <div className="selectable-dropdown-button">
            <span>Carregando...</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="selectable-list-card">
      {title && <h3 className="selectable-list-title">{title}</h3>}
      {description && <p className="selectable-list-description">{description}</p>}
      <div className="selectable-dropdown-container">
        {/* Botão principal */}
        <div 
          className="selectable-dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="selected-text">{getSelectedText()}</span>
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="selectable-dropdown-content">
            {/* Cabeçalho com pesquisa e ordenação */}
            <div className="dropdown-header">
              {showSearch && (
                <div className="search-container">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              )}
              {showSort && (
                <div className="sort-container">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    {sortOptions.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleSortOrder}
                    className="sort-order-btn"
                    title={`Ordenar ${sortOrder === "asc" ? "decrescente" : "crescente"}`}
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              )}
            </div>
            {/* Opção "Selecionar todos" */}
            {multiSelect && filteredAndSortedItems.length > 1 && (
              <div className="select-all-container">
                <label className="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span className="select-all-text">
                    {selectedItems.length === filteredAndSortedItems.length ? 'Desmarcar todos' : 'Marcar todos'}
                  </span>
                </label>
                {selectedItems.length > 0 && (
                  <span className="selection-count">
                    {selectedItems.length} selecionado{selectedItems.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
            {/* Lista de itens */}
            <div className="selectable-items-list">
              {filteredAndSortedItems.length === 0 ? (
                <div className="empty-message">{emptyMessage}</div>
              ) : (
                filteredAndSortedItems.map(item => (
                  <div
                    key={item.id}
                    className={`selectable-item${selectedItems.includes(item.id) ? " selected" : ""}${maxSelections && selectedItems.length >= maxSelections && !selectedItems.includes(item.id) ? " disabled" : ""}`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="checkbox-container">
                      <input
                        type={multiSelect ? "checkbox" : "radio"}
                        checked={selectedItems.includes(item.id)}
                        readOnly
                        tabIndex={-1}
                        disabled={!!(maxSelections && selectedItems.length >= maxSelections && !selectedItems.includes(item.id))}
                      />
                    </div>
                    <div className="item-content">
                      <div className="item-header">
                        <span className="item-title">{item.title}</span>
                        {item.status && (
                          <span className="item-status" style={item.statusColor ? { color: item.statusColor } : {}}>
                            {item.status}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <div className="item-subtitle">{item.subtitle}</div>}
                      {item.description && <div className="item-description">{item.description}</div>}
                    </div>
                    {showBlocoSelector && selectedItems.includes(item.id) && (
                      <div className="bloco-selector-container" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={blocosPorItem[item.id] || 1}
                          onChange={(e) => handleBlocoChange(item.id, parseInt(e.target.value))}
                          className="bloco-selector"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Array.from({ 
                            length: getNumBlocosPorItem ? getNumBlocosPorItem(item.id) : numBlocos 
                          }, (_, i) => i + 1).map(bloco => (
                            <option key={bloco} value={bloco}>
                              Bloco {bloco}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectableList; 