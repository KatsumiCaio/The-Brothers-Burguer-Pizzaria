import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Phone } from 'lucide-react';
import { telemetry } from '../utils/telemetry';
import { RESTAURANT_INFO } from '../data/menuData';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    telemetry.captureError(error, { componentStack: errorInfo.componentStack });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#12100E] text-[#FFF8F3] flex items-center justify-center p-6">
          <div className="bg-[#201B18] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#E27D60]/10 border border-[#E27D60]/20 flex items-center justify-center mx-auto text-[#E27D60]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif text-[#FFF8F3]">Ops! Algo inesperado aconteceu.</h2>
              <p className="text-xs text-[#C4B8B0] leading-relaxed">
                Nosso sistema de observabilidade registrou o incidente. Você pode recarregar a página ou fazer seu pedido diretamente pelo WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E27D60] to-[#D96B43] hover:from-[#D96B43] hover:to-[#C85932] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recarregar Cardápio</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-black font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl shadow-md min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Falar no WhatsApp ({RESTAURANT_INFO.whatsappFormatted})</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
