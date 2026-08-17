import { describe, it, expect, vi } from 'vitest';
import { telemetry } from './telemetry';

describe('telemetry service', () => {
  it('tracks user interaction events and stores in event queue', () => {
    telemetry.trackEvent('test_checkout_started', 'checkout', { items: 3, total: 95.0 });
    const events = telemetry.getRecentEvents();

    const tracked = events.find((e) => e.eventName === 'test_checkout_started');
    expect(tracked).toBeDefined();
    expect(tracked?.category).toBe('checkout');
    expect(tracked?.payload).toEqual({ items: 3, total: 95.0 });
  });

  it('captures runtime errors gracefully without throwing', () => {
    expect(() => {
      telemetry.captureError(new Error('Simulated runtime exception'), { section: 'Menu' });
    }).not.toThrow();
  });
});
