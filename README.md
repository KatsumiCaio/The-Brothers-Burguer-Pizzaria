# 🍔 The Brothers Burguer & Pizzaria | Capão Bonito - SP

> Cardápio digital interativo, sistema de montagem de pedidos com envio direto para o WhatsApp oficial e agendamento de reservas para o Rodízio de Sexta-feira.

---

## 🌟 Sobre o Projeto

O **The Brothers Burguer & Pizzaria** é uma aplicação web moderna e responsiva criada para proporcionar uma experiência gastronômica ágil e intuitiva aos clientes de Capão Bonito/SP. A plataforma permite navegar pelo cardápio completo, personalizar ingredientes (tipo de pão, ponto da carne, bordas de pizza, adicionais), calcular valores em tempo real e enviar o pedido estruturado diretamente para o WhatsApp do restaurante.

---

## ✨ Principais Funcionalidades

- **🍔 Cardápio Digital Interativo**:
  - Filtro por categorias: *Hambúrgueres Artesanais*, *Pizzas Forneadas*, *Porções Especiais*, *Bebidas & Chopp*, *Sobremesas*.
  - Busca instantânea em tempo real por nome ou ingrediente.
  
- **🛠️ Modal de Customização Avançada**:
  - Escolha entre **Pão Francês Especial Crocante** e **Pão Brioche Selado na Manteiga**.
  - Seleção do ponto da carne (*Ao Ponto*, *Bem Passado*, *Mal Passado*).
  - Seleção de bordas recheadas de pizza (*Catupiry*, *Cheddar*, *Borda Vulcão*).
  - Adicionais selecionáveis com atualização dinâmica de preço.
  - Campo de observações especiais por item.

- **🛒 Carrinho & Checkout para WhatsApp**:
  - Escolha entre **Delivery** (com seleção de bairros de Capão Bonito e taxa de entrega automática) ou **Retirada no Balcão**.
  - Seleção da forma de pagamento (*PIX*, *Cartão na entrega* ou *Dinheiro com cálculo de troco*).
  - Geração de mensagem formatada e envio em 1 clique para o WhatsApp oficial `(15) 99705-7138`.

- **🔥 Módulo de Reservas para o Rodízio de Sexta**:
  - Formulário para reserva antecipada de mesas para o tradicional rodízio de pizzas e mini-hambúrgueres.

- **📍 Informações do Estabelecimento**:
  - Horários de atendimento, endereço físico, rota integrada no Google Maps e link para o Instagram oficial.

---

## 🚀 Tecnologias Utilizadas

- **[React 18](https://react.dev/)** — Biblioteca para interfaces reativas e modulares
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática e segurança de código
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização moderna utilitária com design system Dark/Gold
- **[Lucide React](https://lucide.dev/)** — Ícones vetoriais modernos e leves
- **[Vite](https://vitejs.dev/)** — Ferramenta de build rápida e leve

---

## 📂 Estrutura do Projeto

```text
src/
├── components/
│   ├── BrandLogo.tsx              # Logotipo e selo visual da marca
│   ├── CartDrawer.tsx             # Gaveta lateral do carrinho e checkout
│   ├── FloatingWhatsApp.tsx       # Botão flutuante de suporte via WhatsApp
│   ├── Footer.tsx                 # Rodapé com dados de contato e links
│   ├── FridayRodizioSection.tsx   # Seção de destaque do Rodízio de Sexta
│   ├── Hero.tsx                   # Banner principal com CTAs
│   ├── InteractiveMenu.tsx        # Grid do cardápio com busca e filtros
│   ├── LocationHoursSection.tsx   # Horários, endereço e modalidades
│   ├── Navbar.tsx                 # Barra de navegação com contador do carrinho
│   ├── PillarsSection.tsx         # Pilares de qualidade da casa
│   ├── ProductModal.tsx           # Modal de personalização de ingredientes
│   ├── ReservationModal.tsx       # Modal de reserva de mesa
│   ├── TestimonialsSection.tsx    # Avaliações do Google (4.8★)
│   └── TopAnnouncementBar.tsx     # Barra superior com avisos do dia
├── data/
│   └── menuData.ts                # Dados de produtos, categorias e info do restaurante
├── types/
│   └── index.ts                   # Definições de tipos TypeScript
├── App.tsx                        # Componente raiz da aplicação
└── main.tsx                       # Ponto de entrada da aplicação
```

---

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** / **pnpm**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/the-brothers-cardapio.git
```

2. Acesse a pasta do projeto:
```bash
cd the-brothers-cardapio
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra no navegador em: `http://localhost:3000`

---

## 📋 Diretrizes de Contribuição, Issues & Pull Requests

Consulte o arquivo [`AGENTS.md`](./AGENTS.md) e [`ISSUES.md`](./ISSUES.md) para detalhes sobre a convenção de branches, padrão de Issues (Correção, Melhoria, Nova função) e checklist obrigatório de Pull Requests.
