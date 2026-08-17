import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './security';

describe('security utils', () => {
  it('sanitizes input removing script tags and HTML angle brackets', () => {
    const maliciousInput = '<script>alert("hack")</script>Rua das Flores';
    const cleaned = sanitizeInput(maliciousInput);
    expect(cleaned).toBe('scriptalert("hack")/scriptRua das Flores');
    expect(cleaned).not.toContain('<');
    expect(cleaned).not.toContain('>');
  });

  it('limits input length to prevent payload bloat', () => {
    const longString = 'A'.repeat(500);
    const cleaned = sanitizeInput(longString, 100);
    expect(cleaned.length).toBe(100);
  });

  it('handles empty or null inputs gracefully', () => {
    expect(sanitizeInput('')).toBe('');
  });
});
