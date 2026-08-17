import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, Building2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div 
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="bg-[#201B18] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl p-6 relative z-10 flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A231E] border border-white/10 flex items-center justify-center text-[#E27D60]">
              {activeTab === 'terms' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5 text-[#25D366]" />}
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-[#FFF8F3]">
                {activeTab === 'terms' ? 'Termos de Uso & Serviço' : 'Política de Privacidade & LGPD'}
              </h3>
              <p className="text-[11px] text-[#C4B8B0]">The Brothers Burguer & Pizzaria • Capão Bonito/SP</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2A231E] text-[#FFF8F3] hover:bg-[#201B18] flex items-center justify-center border border-white/10 cursor-pointer"
            aria-label="Fechar termos"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#12100E] p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#2A231E] text-[#F8D8C8] shadow-sm border border-white/10'
                : 'text-[#C4B8B0] hover:text-[#FFF8F3]'
            }`}
          >
            📄 Termos de Uso
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#2A231E] text-[#25D366] shadow-sm border border-white/10'
                : 'text-[#C4B8B0] hover:text-[#FFF8F3]'
            }`}
          >
            🔒 Privacidade & LGPD
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs text-[#C4B8B0] leading-relaxed max-h-[50vh] custom-scrollbar">
          {activeTab === 'terms' ? (
            <>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#E27D60]" />
                  1. Sobre o Cardápio Digital & Atendimento
                </h4>
                <p>
                  O presente catálogo digital tem como finalidade facilitar a escolha de hambúrgueres artesanais, pizzas, porções, bebidas e agendamento de reservas no estabelecimento <strong>The Brothers Burguer & Pizzaria</strong>, localizado na {RESTAURANT_INFO.address}, Capão Bonito - SP.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">2. Pedidos e Confirmação via WhatsApp</h4>
                <p>
                  A finalização do pedido é realizada mediante o envio estruturado dos itens para o WhatsApp oficial do restaurante ({RESTAURANT_INFO.whatsappFormatted}). O pedido é considerado confirmado apenas após resposta e validação pela equipe de atendimento da The Brothers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">3. Horários de Funcionamento e Entregas</h4>
                <p>
                  Nosso atendimento opera regularmente de Terça a Domingo, das 18h30 às 23h30. Pedidos efetuados fora deste horário serão respondidos no início do próximo expediente. O tempo médio estimado de entrega em Capão Bonito é de 30 a 45 minutos.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">4. Formas de Pagamento</h4>
                <p>
                  Aceitamos pagamentos via PIX, Cartões de Débito/Crédito na maquininha móvel e Dinheiro com opção de troco informado previamente.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  1. Conformidade com a LGPD (Lei nº 13.709/2018)
                </h4>
                <p>
                  A The Brothers Burguer & Pizzaria respeita a privacidade de seus clientes e assegura que todos os dados coletados (nome, telefone e endereço de entrega) são utilizados <strong>exclusivamente</strong> para o processamento, preparo e entrega do pedido solicitado.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">2. Não Compartilhamento com Terceiros</h4>
                <p>
                  Não comercializamos, alugamos ou compartilhamos dados pessoais com terceiros para fins de marketing ou publicidade não solicitada.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">3. Armazenamento Local e Segurança</h4>
                <p>
                  Itens do carrinho e preferências de pedido são mantidos localmente no navegador do usuário (client-side storage) para conveniência de navegação e podem ser limpos a qualquer momento através do botão "Limpar Pedido".
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FFF8F3]">4. Contato do Encarregado de Dados</h4>
                <p>
                  Para dúvidas sobre seus dados ou solicitação de exclusão de registros de atendimento, entre em contato diretamente pelo WhatsApp: {RESTAURANT_INFO.whatsappFormatted}.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-[#2A231E] hover:bg-[#342C26] text-[#FFF8F3] border border-white/10 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
          >
            Entendido e Concordo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
