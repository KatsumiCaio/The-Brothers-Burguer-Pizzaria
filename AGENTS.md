# 🤖 Diretrizes para Agentes de IA e Desenvolvedores

Este arquivo estabelece os padrões de desenvolvimento, arquitetura, design e o fluxo de trabalho obrigatório com **GitHub Issues** e **Pull Requests** para o projeto **The Brothers Burguer & Pizzaria**.

---

## 📌 1. Visão Geral do Projeto
- **Aplicação**: The Brothers Burguer & Pizzaria (Capão Bonito - SP)
- **Stack**: React 18, TypeScript, Tailwind CSS, Lucide React, Vite.
- **Objetivo**: Cardápio digital interativo, personalização avançada de pedidos, carrinho com checkout direto para o WhatsApp oficial e agendamento de reservas para o Rodízio de Sexta.

---

## 📋 2. Fluxo Obrigatório de Trabalho (Issues & Pull Requests)

Todo agente ou desenvolvedor que trabalhar neste repositório **DEVE** seguir estritamente o seguinte fluxo:

### 2.1. Classificação de Tarefas / Issues
Toda tarefa deve ser mapeada para uma Issue no GitHub categorizada sob um dos 3 tipos:
1. 🐛 **Correção (Bug Fix)**: Correção de falhas de renderização, links quebrados, cálculos incorretos ou inconsistências em formulários/carrinho.
2. ⚡ **Melhoria (Enhancement)**: Aprimoramento de performance, refinamento visual/UI/UX, acessibilidade, refatoração de código ou melhoria de responsividade.
3. ✨ **Nova Função (Feature)**: Novas telas, novos fluxos de checkout, integrações externas, filtros adicionais ou novos módulos funcionais.

---

### 2.2. Padrão Obrigatório para Pull Requests (PRs)

Todo Pull Request deve conter na sua descrição o seguinte template preenchido:

```markdown
## 🔗 Issue Relacionada
- Ref / Closes #[NÚMERO DA ISSUE] - [TÍTULO DA ISSUE]
- **Tipo**: [ ] Correção | [ ] Melhoria | [ ] Nova função

## 📝 O que mudou?
- [Resumo claro e objetivo das modificações realizadas]
- [Componentes ou arquivos modificados]

## 🧪 Como foi validado?
- [x] Linting executado (`npm run lint` / `tsc --noEmit` sem erros)
- [x] Build de produção verificado (`npm run build` compilou com sucesso)
- [x] Teste visual e funcional no preview (descrever testes manuais realizados)

## ⚠️ Riscos, Limitações e Próximos Passos
- **Riscos / Impactos colaterais**: [Nenhum ou descrever o risco]
- **Limitações**: [Ex: depende de credenciais de terceiros, limites de iframe, etc.]
- **Próximos passos**: [Tarefas subsequentes planejadas]
```

---

## 🎨 3. Padrões de Design e Código

1. **Design System (Sophisticated Dark)**:
   - Fundo principal: `#0D0B0A` (obsidiana profunda).
   - Superfícies / Cards: `#1A1614` e `#221C18` com bordas sutis `border-white/10` ou `border-white/5`.
   - Cores de destaque: Dourado/Âmbar (`#D97706`, `#EAB308`) e Verde WhatsApp (`#25D366`).
   - Tipografia: Serifada refinada para títulos (`Georgia, serif`) e sans-serif limpa para textos e controles.
2. **Proibição de AI Slop**: Sem gradientes roxo/azul arbitrários, sem glow excessivo, sem botões desalinhados ou quebras de texto em chips/pills.
3. **TypeScript Estrito**: Todas as interfaces em `/src/types/` ou no topo dos componentes, sem uso de `any`.
4. **Sem Dados Mockados Vazios**: Manter dados reais de Capão Bonito, telefones e produtos consistentes.

---

## 🛡️ 4. Esteira de Qualidade (Quality Gate) & CI/CD

Nenhum código entra na branch principal sem passar pelos 5 pilares do pipeline de qualidade:

1. **Observabilidade & Telemetria (`src/utils/telemetry.ts` & `ErrorBoundary.tsx`)**:
   - Captura resiliente de exceções em tempo de execução com bridge para Sentry / Datadog RUM.
   - Monitoramento contínuo de Core Web Vitals (LCP, FID/INP, CLS) e eventos chave de conversão no cardápio.
2. **Qualidade & Linting Estático**:
   - `npm run lint` (`tsc --noEmit`) em nível estrito.
   - Detecção de código morto / exports não utilizados via **Knip** (`knip.json`).
   - Padronização de mensagens de commit via **Commitlint** (`commitlint.config.js`).
3. **Testes Automatizados (Unitários, Integração e E2E)**:
   - **Vitest**: `npm test` para cálculo de preços, regras de delivery, sanitização e gerador de URLs do WhatsApp.
   - **Playwright**: `npm run test:e2e` para validação end-to-end dos fluxos críticos de compra e reservas.
4. **Segurança e Operação**:
   - Rate limiting client-side com sliding window para formulários de checkout e reservas (`src/utils/security.ts`).
   - Sanitização de inputs para prevenção contra scripts maliciosos e truncamento de strings.
   - Termos de Uso e Política de Privacidade compatíveis com a LGPD acessíveis via modal (`LegalModal.tsx`).
   - Performance budget verificado no build de produção (< 1.5MB gzip).

---

## 🏛️ 5. Princípios de Arquitetura & Governança

1. **Evitar Overengineering**: Construir estritamente o escopo necessário para atender a regra de negócio da hamburgueria e pizzaria.
2. **Evitar Bottlenecks**: Renderização leve, memoização criteriosa de listas (`useMemo`), imagens com lazy-loading e transições aceleradas por GPU.
3. **Componentização Consciente**: Separar componentes por responsabilidade única (`Navbar`, `InteractiveMenu`, `ProductModal`, `CartDrawer`, `ReservationModal`, `Toast`, `LegalModal`).
4. **DRY com Critério**: Reutilizar utilitários compartilhados (`formatCurrency`, `sanitizeInput`, `telemetry`) sem criar abstrações prematuras ou acoplamento excessivo.
5. **Reuso Estrito**: Proibida a recriação de componentes visuais ou utilitários que já existam na base de código.

