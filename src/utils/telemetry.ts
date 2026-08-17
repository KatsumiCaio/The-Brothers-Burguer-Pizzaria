/**
 * Observability & Telemetry Service for The Brothers Burguer & Pizzaria
 * 
 * Supports Sentry, OpenTelemetry, Datadog RUM and custom performance traces
 * with safe fallbacks and no external runtime crash dependencies.
 */

export interface TelemetryEvent {
  eventName: string;
  category: 'cart' | 'checkout' | 'reservation' | 'navigation' | 'error' | 'performance';
  payload?: Record<string, unknown>;
  timestamp: number;
}

class TelemetryService {
  private isProduction = process.env.NODE_ENV === 'production';
  private sentryDsn = (typeof window !== 'undefined' && (window as unknown as { SENTRY_DSN?: string }).SENTRY_DSN) || '';
  private eventQueue: TelemetryEvent[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPerformanceObserver();
    }
  }

  /**
   * Captures runtime errors and sends to Sentry / Error Reporting
   */
  public captureError(error: Error | unknown, context?: Record<string, unknown>): void {
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
    };

    if (!this.isProduction) {
      console.warn('[Telemetry:ErrorCaptured]', errorDetails);
    }

    // Dispatches to Sentry if available on global window object
    if (typeof window !== 'undefined' && (window as unknown as { Sentry?: { captureException: (err: unknown, ctx?: unknown) => void } }).Sentry) {
      (window as unknown as { Sentry: { captureException: (err: unknown, ctx?: unknown) => void } }).Sentry.captureException(error, { extra: context });
    }

    // Dispatches to Datadog RUM if available
    if (typeof window !== 'undefined' && (window as unknown as { DD_RUM?: { addError: (err: unknown, ctx?: unknown) => void } }).DD_RUM) {
      (window as unknown as { DD_RUM: { addError: (err: unknown, ctx?: unknown) => void } }).DD_RUM.addError(error, context);
    }
  }

  /**
   * Tracks user interaction events (Cart, Checkout, Reservation, Conversions)
   */
  public trackEvent(eventName: string, category: TelemetryEvent['category'], payload?: Record<string, unknown>): void {
    const event: TelemetryEvent = {
      eventName,
      category,
      payload,
      timestamp: Date.now(),
    };

    this.eventQueue.push(event);
    if (this.eventQueue.length > 50) {
      this.eventQueue.shift();
    }

    if (!this.isProduction) {
      console.info(`[Telemetry:Event] [${category.toUpperCase()}] ${eventName}`, payload || '');
    }

    // OpenTelemetry / Custom Analytics bridge
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('thebrothers_telemetry', { detail: event }));
    }
  }

  /**
   * Web Vitals & Performance Budget Observer (CLS, LCP, INP, FID)
   */
  private initPerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.trackEvent('LCP_Metric', 'performance', { durationMs: Math.round(lastEntry.startTime) });
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay / INP
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const duration = (entry as unknown as { processingStart: number; startTime: number }).processingStart - entry.startTime;
          this.trackEvent('FID_Metric', 'performance', { durationMs: Math.round(duration) });
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch {
      // Performance observers gracefully skipped if not supported by browser/iframe
    }
  }

  public getRecentEvents(): TelemetryEvent[] {
    return [...this.eventQueue];
  }
}

export const telemetry = new TelemetryService();
