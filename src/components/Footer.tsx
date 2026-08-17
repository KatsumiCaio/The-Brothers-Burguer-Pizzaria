import React from 'react';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_INFO } from '../data/menuData';
import { MapPin, Phone, Instagram, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegal?: (tab: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0B0A] text-[#A8A29E] border-t border-white/10 text-xs pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <BrandLogo size="lg" />
            <p className="text-[#A8A29E] text-xs leading-relaxed font-sans-body">
              O ponto certo do hambúrguer artesanal e a verdadeira tradição da pizza em Capão Bonito/SP. Excelência em sabor, ingredientes nobres e atendimento caloroso.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1614] hover:bg-[#D97706] hover:text-black text-[#FDFBF7] flex items-center justify-center border border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1614] hover:bg-[#25D366] hover:text-black text-[#FDFBF7] flex items-center justify-center border border-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif-display font-bold text-[#FDFBF7] uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#EAB308] transition-colors">Início</a>
              </li>
              <li>
                <a href="#destaques" className="hover:text-[#EAB308] transition-colors">Destaques da Casa</a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-[#EAB308] transition-colors">Cardápio & Pedidos</a>
              </li>
              <li>
                <a href="#rodizio" className="hover:text-[#EAB308] transition-colors">Rodízio Toda Sexta (19h)</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#EAB308] transition-colors">Avaliações 4.8★ Google</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#EAB308] transition-colors">Onde Estamos</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Specialties */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif-display font-bold text-[#FDFBF7] uppercase tracking-wider">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li>🍔 Hambúrgueres no Pão Francês e Brioche</li>
              <li>🍕 Pizzas com Borda Vulcão Recheada</li>
              <li>🔥 Rodízio Completo às Sextas-feiras</li>
              <li>🍺 Chopp Artesanal na Caneca Congelada</li>
              <li>🍹 Drinks e Coquetéis Autorais</li>
              <li>🛵 Delivery Rápido em Capão Bonito</li>
            </ul>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif-display font-bold text-[#FDFBF7] uppercase tracking-wider">
              Atendimento & Contato
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-[#FDFBF7]">
                <MapPin className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2 text-[#FDFBF7]">
                <Phone className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`} className="hover:text-[#25D366] font-bold">
                  {RESTAURANT_INFO.whatsappFormatted}
                </a>
              </p>
              <p className="text-[#A8A29E] pt-1 font-sans-body">
                Terça a Domingo a partir das 18h30.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A8A29E] text-[11px]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {RESTAURANT_INFO.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-[#A8A29E]">
              <button
                type="button"
                onClick={() => onOpenLegal?.('terms')}
                className="hover:text-[#EAB308] underline transition-colors cursor-pointer"
              >
                Termos de Uso
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('privacy')}
                className="hover:text-[#25D366] underline transition-colors cursor-pointer"
              >
                Privacidade & LGPD
              </button>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 bg-[#1A1614] hover:bg-[#221C18] text-[#FDFBF7] px-3.5 py-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#EAB308]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
