-- Script para inserir dados de teste no financeiro empresarial
-- Execute este script no seu banco de dados para testar os gráficos

-- Inserir financeiros empresariais
INSERT INTO financeiro_empresarial (id, nome, descricao, valor, tipo, categoria, data, status) VALUES
(1, 'Mensalidades Janeiro', 'Receita de mensalidades dos alunos', 25000.00, 'RECEITA', 'Mensalidades', '2024-01-15', 'PAGO'),
(2, 'Mensalidades Fevereiro', 'Receita de mensalidades dos alunos', 28000.00, 'RECEITA', 'Mensalidades', '2024-02-15', 'PAGO'),
(3, 'Mensalidades Março', 'Receita de mensalidades dos alunos', 32000.00, 'RECEITA', 'Mensalidades', '2024-03-15', 'PAGO'),
(4, 'Mensalidades Abril', 'Receita de mensalidades dos alunos', 30000.00, 'RECEITA', 'Mensalidades', '2024-04-15', 'PAGO'),
(5, 'Mensalidades Maio', 'Receita de mensalidades dos alunos', 35000.00, 'RECEITA', 'Mensalidades', '2024-05-15', 'PAGO'),
(6, 'Mensalidades Junho', 'Receita de mensalidades dos alunos', 38000.00, 'RECEITA', 'Mensalidades', '2024-06-15', 'PAGO'),

(7, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-01-05', 'PAGO'),
(8, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-02-05', 'PAGO'),
(9, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-03-05', 'PAGO'),
(10, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-04-05', 'PAGO'),
(11, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-05-05', 'PAGO'),
(12, 'Aluguel Academia', 'Despesa com aluguel da academia', 8000.00, 'DESPESA', 'Aluguel', '2024-06-05', 'PAGO'),

(13, 'Folha de Pagamento Janeiro', 'Salários dos colaboradores', 12000.00, 'DESPESA', 'Folha de Pagamento', '2024-01-25', 'PAGO'),
(14, 'Folha de Pagamento Fevereiro', 'Salários dos colaboradores', 12500.00, 'DESPESA', 'Folha de Pagamento', '2024-02-25', 'PAGO'),
(15, 'Folha de Pagamento Março', 'Salários dos colaboradores', 13000.00, 'DESPESA', 'Folha de Pagamento', '2024-03-25', 'PAGO'),
(16, 'Folha de Pagamento Abril', 'Salários dos colaboradores', 13200.00, 'DESPESA', 'Folha de Pagamento', '2024-04-25', 'PAGO'),
(17, 'Folha de Pagamento Maio', 'Salários dos colaboradores', 13500.00, 'DESPESA', 'Folha de Pagamento', '2024-05-25', 'PAGO'),
(18, 'Folha de Pagamento Junho', 'Salários dos colaboradores', 13800.00, 'DESPESA', 'Folha de Pagamento', '2024-06-25', 'PAGO'),

(19, 'Venda de Suplementos Janeiro', 'Receita de venda de suplementos', 5000.00, 'RECEITA', 'Suplementos', '2024-01-20', 'PAGO'),
(20, 'Venda de Suplementos Fevereiro', 'Receita de venda de suplementos', 5500.00, 'RECEITA', 'Suplementos', '2024-02-20', 'PAGO'),
(21, 'Venda de Suplementos Março', 'Receita de venda de suplementos', 6000.00, 'RECEITA', 'Suplementos', '2024-03-20', 'PAGO'),
(22, 'Venda de Suplementos Abril', 'Receita de venda de suplementos', 5800.00, 'RECEITA', 'Suplementos', '2024-04-20', 'PAGO'),
(23, 'Venda de Suplementos Maio', 'Receita de venda de suplementos', 6500.00, 'RECEITA', 'Suplementos', '2024-05-20', 'PAGO'),
(24, 'Venda de Suplementos Junho', 'Receita de venda de suplementos', 7000.00, 'RECEITA', 'Suplementos', '2024-06-20', 'PAGO'),

(25, 'Conta de Luz Janeiro', 'Despesa com energia elétrica', 1500.00, 'DESPESA', 'Energia', '2024-01-10', 'PAGO'),
(26, 'Conta de Luz Fevereiro', 'Despesa com energia elétrica', 1600.00, 'DESPESA', 'Energia', '2024-02-10', 'PAGO'),
(27, 'Conta de Luz Março', 'Despesa com energia elétrica', 1700.00, 'DESPESA', 'Energia', '2024-03-10', 'PAGO'),
(28, 'Conta de Luz Abril', 'Despesa com energia elétrica', 1650.00, 'DESPESA', 'Energia', '2024-04-10', 'PAGO'),
(29, 'Conta de Luz Maio', 'Despesa com energia elétrica', 1800.00, 'DESPESA', 'Energia', '2024-05-10', 'PAGO'),
(30, 'Conta de Luz Junho', 'Despesa com energia elétrica', 1900.00, 'DESPESA', 'Energia', '2024-06-10', 'PAGO'),

(31, 'Avaliações Físicas Janeiro', 'Receita de avaliações físicas', 3000.00, 'RECEITA', 'Avaliações', '2024-01-30', 'PAGO'),
(32, 'Avaliações Físicas Fevereiro', 'Receita de avaliações físicas', 3200.00, 'RECEITA', 'Avaliações', '2024-02-30', 'PAGO'),
(33, 'Avaliações Físicas Março', 'Receita de avaliações físicas', 3500.00, 'RECEITA', 'Avaliações', '2024-03-30', 'PAGO'),
(34, 'Avaliações Físicas Abril', 'Receita de avaliações físicas', 3300.00, 'RECEITA', 'Avaliações', '2024-04-30', 'PAGO'),
(35, 'Avaliações Físicas Maio', 'Receita de avaliações físicas', 3800.00, 'RECEITA', 'Avaliações', '2024-05-30', 'PAGO'),
(36, 'Avaliações Físicas Junho', 'Receita de avaliações físicas', 4000.00, 'RECEITA', 'Avaliações', '2024-06-30', 'PAGO'),

(37, 'Manutenção Equipamentos Janeiro', 'Despesa com manutenção', 2000.00, 'DESPESA', 'Manutenção', '2024-01-15', 'PAGO'),
(38, 'Manutenção Equipamentos Fevereiro', 'Despesa com manutenção', 1800.00, 'DESPESA', 'Manutenção', '2024-02-15', 'PAGO'),
(39, 'Manutenção Equipamentos Março', 'Despesa com manutenção', 2200.00, 'DESPESA', 'Manutenção', '2024-03-15', 'PAGO'),
(40, 'Manutenção Equipamentos Abril', 'Despesa com manutenção', 1900.00, 'DESPESA', 'Manutenção', '2024-04-15', 'PAGO'),
(41, 'Manutenção Equipamentos Maio', 'Despesa com manutenção', 2400.00, 'DESPESA', 'Manutenção', '2024-05-15', 'PAGO'),
(42, 'Manutenção Equipamentos Junho', 'Despesa com manutenção', 2100.00, 'DESPESA', 'Manutenção', '2024-06-15', 'PAGO'),

(43, 'Marketing Digital Janeiro', 'Despesa com marketing', 3000.00, 'DESPESA', 'Marketing', '2024-01-08', 'PAGO'),
(44, 'Marketing Digital Fevereiro', 'Despesa com marketing', 3200.00, 'DESPESA', 'Marketing', '2024-02-08', 'PAGO'),
(45, 'Marketing Digital Março', 'Despesa com marketing', 3500.00, 'DESPESA', 'Marketing', '2024-03-08', 'PAGO'),
(46, 'Marketing Digital Abril', 'Despesa com marketing', 3300.00, 'DESPESA', 'Marketing', '2024-04-08', 'PAGO'),
(47, 'Marketing Digital Maio', 'Despesa com marketing', 3800.00, 'DESPESA', 'Marketing', '2024-05-08', 'PAGO'),
(48, 'Marketing Digital Junho', 'Despesa com marketing', 4000.00, 'DESPESA', 'Marketing', '2024-06-08', 'PAGO');

-- Inserir lançamentos (opcional - se você quiser usar a estrutura de lançamentos)
-- INSERT INTO lancamento (id, descricao, valor, tipo, categoria, data, status, financeiro_empresarial_id) VALUES
-- (1, 'Mensalidade João Silva', 150.00, 'RECEITA', 'Mensalidades', '2024-01-15', 'PAGO', 1),
-- (2, 'Mensalidade Maria Santos', 150.00, 'RECEITA', 'Mensalidades', '2024-01-15', 'PAGO', 1),
-- (3, 'Mensalidade Pedro Costa', 150.00, 'RECEITA', 'Mensalidades', '2024-01-15', 'PAGO', 1),
-- (4, 'Aluguel Academia', 8000.00, 'DESPESA', 'Aluguel', '2024-01-05', 'PAGO', 7),
-- (5, 'Salário Personal Trainer', 3000.00, 'DESPESA', 'Folha de Pagamento', '2024-01-25', 'PAGO', 13),
-- (6, 'Salário Nutricionista', 2500.00, 'DESPESA', 'Folha de Pagamento', '2024-01-25', 'PAGO', 13);

-- Comentário: Os dados acima criam um cenário realista com:
-- - Receitas crescentes de mensalidades (25k → 38k)
-- - Receitas de suplementos e avaliações
-- - Despesas fixas (aluguel, folha de pagamento)
-- - Despesas variáveis (energia, manutenção, marketing)
-- - Dados distribuídos por 6 meses para mostrar tendências 