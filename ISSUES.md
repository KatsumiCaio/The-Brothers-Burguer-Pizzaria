# 📋 Catálogo de GitHub Issues — The Brothers Burguer & Pizzaria

Este documento lista todas as tarefas planejadas, catalogadas por tipo (**Correção**, **Melhoria** e **Nova Função**), com suas respectivas descrições e critérios de aceitação para serem criadas no repositório GitHub.

---

## 🐛 1. Correções (Bug Fixes)

### Issue #1: `[Correção] Tratamento de caracteres especiais e quebra de linha na formatação de mensagem do WhatsApp`
- **Tipo**: Correção
- **Descrição**: Ao adicionar notas com quebras de linha ou caracteres como `&`, `#` ou acentuação pesada, algumas versões de navegadores móveis truncavam o payload da URL do WhatsApp.
- **Critérios de Aceite**:
  - Garantir `encodeURIComponent` resiliente em todas as variáveis de mensagem (`CartDrawer.tsx` e `ReservationModal.tsx`).
  - Validar funcionamento correto em dispositivos iOS e Android.

### Issue #2: `[Correção] Impedir envio de pedido com campos obrigatórios vazios no formulário de entrega`
- **Tipo**: Correção
- **Descrição**: Evitar que clientes cliquem no botão de WhatsApp sem preencher nome ou rua quando a opção Delivery estiver selecionada.
- **Critérios de Aceite**:
  - Exibir alerta visual amigável com foco no campo não preenchido.
  - Bloquear abertura da URL do WhatsApp se os dados essenciais estiverem ausentes.

### Issue #3: `[Correção] Ajuste de contraste e cálculo do inner-radius em modais no mobile`
- **Tipo**: Correção
- **Descrição**: Em telas menores que 360px, verificar se os botões de incremento/decremento de quantidade e fechar modal respeitam a área mínima de toque (44px) e contraste visual WCAG AA.
- **Critérios de Aceite**:
  - Área de toque mínima de 44x44px garantida em todos os botões de ação em telas mobile.
  - Contraste superior a 4.5:1 em todos os textos secundários.

---

## ⚡ 2. Melhorias (Enhancements)

### Issue #4: `[Melhoria] Persistência do carrinho no LocalStorage do navegador`
- **Tipo**: Melhoria
- **Descrição**: Salvar os itens adicionados ao carrinho no `localStorage` do navegador para que o cliente não perca os itens caso a página seja recarregada acidentalmente.
- **Critérios de Aceite**:
  - Recuperar itens e seleções de customização ao reabrir a página.
  - Limpar estado ao finalizar pedido com sucesso ou clicar em "Limpar".

### Issue #5: `[Melhoria] Cupom de desconto promocional no checkout`
- **Tipo**: Melhoria
- **Descrição**: Adicionar campo de cupom de desconto (ex: `PRIMEIRACOMPRA` ou `RODIZIO10`) aplicando desconto percentual ou fixo sobre o subtotal no cálculo do carrinho.
- **Critérios de Aceite**:
  - Campo de input para código de cupom no `CartDrawer.tsx`.
  - Validação em tempo real e detalhamento do desconto na mensagem gerada para o WhatsApp.

### Issue #6: `[Melhoria] Indicador de status 'Aberto agora / Fechado' em tempo real baseado no horário local`
- **Tipo**: Melhoria
- **Descrição**: Exibir um badge dinâmico ("Aberto Agora" verde ou "Fechado no Momento" âmbar) na barra de navegação e no anúncio superior, calculando o horário local de Capão Bonito (18h30 às 23h30, de Terça a Domingo).
- **Critérios de Aceite**:
  - Badge automático na navbar com indicação de tempo restante para abertura ou fechamento.
  - Notificação explicativa no checkout caso o pedido seja feito fora do horário de atendimento.

---

## ✨ 3. Novas Funções (Features)

### Issue #7: `[Nova função] Divisão de pizza meio a meio (2 sabores)`
- **Tipo**: Nova função
- **Descrição**: Permitir que o cliente monte uma pizza com 2 sabores diferentes no `ProductModal`, calculando o valor pelo maior preço ou média conforme a regra da pizzaria.
- **Critérios de Aceite**:
  - Seletor de "Pizza Meio a Meio" dentro do modal de pizzas.
  - Dropdown ou cards de seleção do 1º e 2º sabor.
  - Especificação clara dos dois sabores na mensagem enviada ao WhatsApp.

### Issue #8: `[Nova função] Painel de Gerenciamento do Cardápio (Admin Light)`
- **Tipo**: Nova função
- **Descrição**: Interface administrativa para pausar produtos temporariamente indisponíveis (ex: lanche sem pão brioche no dia) e alterar valores de taxas ou rodízio.
- **Critérios de Aceite**:
  - Acesso protegido por PIN/senha local ou autenticação.
  - Toggle de "Disponível / Indisponível" para cada item do cardápio.

### Issue #9: `[Nova função] Integração com API do Google Maps para cálculo automático de distância/frete`
- **Tipo**: Nova função
- **Descrição**: Integração com Places API / Distance Matrix para preenchimento automático do endereço via CEP e cálculo dinâmico da taxa de entrega por raio de quilometragem.
- **Critérios de Aceite**:
  - Autocomplete de endereços em Capão Bonito.
  - Cálculo dinâmico do valor de entrega por faixa de km.

---

## 🚀 Como Submeter Pull Requests para estas Issues

1. Crie uma branch nomeada com a convenção:
   - `fix/issue-1-whatsapp-encoding`
   - `enhancement/issue-4-cart-localstorage`
   - `feature/issue-7-half-half-pizza`
2. Abra o PR utilizando o template definido em `.github/pull_request_template.md`.
3. Preencha todos os tópicos (Issue relacionada, O que mudou, Validação, Riscos).
