/**
 * Security & Anti-Abuse Utilities for The Brothers Burguer & Pizzaria
 */

/**
 * Sanitizes user input to prevent XSS and unwanted formatting characters
 */
export function sanitizeInput(input: string, maxLength = 250): string {
  if (!input) return '';
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // remove HTML tag markers
    .trim();
}

/**
 * Client-Side Sliding Window Rate Limiter
 */
class RateLimiter {
  private timestamps: number[] = [];
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 3, windowMs = 15000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Returns true if action is allowed, or false if rate limited
   */
  public canExecute(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter((time) => now - time < this.windowMs);

    if (this.timestamps.length >= this.maxAttempts) {
      return false;
    }

    this.timestamps.push(now);
    return true;
  }

  public getTimeUntilNextAllowed(): number {
    if (this.timestamps.length < this.maxAttempts) return 0;
    const oldest = this.timestamps[0];
    const diff = this.windowMs - (Date.now() - oldest);
    return Math.max(0, Math.ceil(diff / 1000));
  }

  public reset(): void {
    this.timestamps = [];
  }
}

export const orderRateLimiter = new RateLimiter(3, 10000);
export const reservationRateLimiter = new RateLimiter(3, 10000);
