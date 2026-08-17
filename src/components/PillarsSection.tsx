import React from 'react';
import { Flame, UtensilsCrossed, Pizza, Beer, Sparkles, ArrowRight } from 'lucide-react';

interface PillarsSectionProps {
  onSelectCategory: (category: string) => void;
  onOpenReservation: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  onSelectCategory,
  onOpenReservation,
}) => {
  const pillars = [
    {
      id: 'pillar-burgers',
      title: 'Burguers Artesanais',
      badge: 'Famoso no Pão Francês',
      description: 'Opção de pão francês especial crocante ou brioche fofinho, smashs duplos crocantes e blends 100% bovinos grelhados no ponto certo.',
      icon: '🍔',
      actionLabel: 'Ver Hambúrgueres',
      categoryTarget: 'burguers',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      id: 'pillar-pizzas',
      title: 'Pizzas Forneadas',
      badge: 'Fermentação Longa',
      description: 'Massa artesanal leve e crocante, bordas vulcão recheadas com Catupiry Original ou Cheddar e coberturas super generosas.',
      icon: '🍕',
      actionLabel: 'Ver Pizzas',
      categoryTarget: 'pizzas_salgadas',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-yellow-600 to-amber-600'
    },
    {
      id: 'pillar-rodizio',
      title: 'Rodízio Toda Sexta (19h)',
      badge: 'Experiência Exclusiva',
      description: 'A noite mais esperada de Capão Bonito: rodízio completo com mini burguers, pizzas salgadas e doces para reunir toda a família.',
      icon: '🔥',
      actionLabel: 'Garantir Reserva',
      isReservation: true,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-orange-600 to-red-600'
    },
    {
      id: 'pillar-drinks',
      title: 'Chopp Gelado & Drinks',
      badge: 'Caneca Zero Grau',
      description: 'Chopp artesanal pilsen trincando, drinks autorais refrescantes como o Gin Tropical The Brothers e caipirinhas com frutas frescas.',
      icon: '🍺',
      actionLabel: 'Ver Bebidas',
      categoryTarget: 'bebidas',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-amber-500 to-yellow-600'
    }
  ];

  return (
    <section id="destaques" className="py-20 bg-[#0D0B0A] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#1A1614] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#EAB308] uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Nossa Identidade & Diferenciais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#FDFBF7] tracking-tight">
            Os 4 Pilares de Sabor da <span className="text-[#EAB308] italic">The Brothers</span>
          </h2>
          <div className="h-[1px] w-16 bg-[#D97706] mx-auto my-2" />
          <p className="text-[#A8A29E] text-sm sm:text-base font-sans-body">
            Tradição, paixão pelo preparo artesanal e o ambiente ideal para suas melhores confraternizações em Capão Bonito.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className="group relative bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 overflow-hidden bg-black/50">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-black/40" />
                
                {/* Floating Icon Seal */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-xl shadow-md">
                  {pillar.icon}
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3 bg-[#0D0B0A]/90 backdrop-blur-md border border-white/10 text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {pillar.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif-display font-bold text-[#FDFBF7] group-hover:text-[#EAB308] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[#A8A29E] text-xs leading-relaxed mt-2.5">
                    {pillar.description}
                  </p>
                </div>

                {/* Action CTA */}
                {pillar.isReservation ? (
                  <button
                    onClick={onOpenReservation}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#E65100] text-black font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (pillar.categoryTarget) {
                        onSelectCategory(pillar.categoryTarget);
                        const cardapioEl = document.getElementById('cardapio');
                        if (cardapioEl) cardapioEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#221C18] hover:bg-[#2A231E] text-[#EAB308] hover:text-[#FDFBF7] border border-white/10 hover:border-[#D97706]/40 font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-95"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
