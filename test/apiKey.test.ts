import { describe, it, expect } from 'vitest';
import { isValidGoogleAiApiKey, maskApiKey } from '../src/services/apiKeyValidator';

describe('Google AI API Key Validator (api.md compliance)', () => {
  it('chấp nhận API key legacy bắt đầu bằng AIzaSy', () => {
    expect(isValidGoogleAiApiKey('AIzaSyD-sampleLegacyKey123456789')).toBe(true);
    expect(isValidGoogleAiApiKey('AIzaSyABCDEF123456')).toBe(true);
  });

  it('chấp nhận API key thế hệ mới bắt đầu bằng AQ', () => {
    expect(isValidGoogleAiApiKey('AQabCdef1234567890xyz')).toBe(true);
    expect(isValidGoogleAiApiKey('AQ_NewFormatToken99999')).toBe(true);
  });

  it('tự động trim khoảng trắng thừa đầu đuôi', () => {
    expect(isValidGoogleAiApiKey('   AIzaSyTrimmedKey123456   ')).toBe(true);
    expect(isValidGoogleAiApiKey('   AQTrimmedKey123456   ')).toBe(true);
  });

  it('từ chối chuỗi rỗng hoặc chỉ có khoảng trắng', () => {
    expect(isValidGoogleAiApiKey('')).toBe(false);
    expect(isValidGoogleAiApiKey('   ')).toBe(false);
  });

  it('từ chối key chứa khoảng trắng ở giữa', () => {
    expect(isValidGoogleAiApiKey('AIzaSy 12345678')).toBe(false);
    expect(isValidGoogleAiApiKey('AQ 12345678')).toBe(false);
  });

  it('từ chối key quá ngắn (< 8 ký tự)', () => {
    expect(isValidGoogleAiApiKey('AQ123')).toBe(false);
    expect(isValidGoogleAiApiKey('AIzaSy')).toBe(false);
  });

  it('từ chối prefix không hợp lệ của các nhà cung cấp khác (như OpenAI, Anthropic)', () => {
    expect(isValidGoogleAiApiKey('sk-ant-api03-1234567890')).toBe(false);
    expect(isValidGoogleAiApiKey('sk-proj-1234567890abcdef')).toBe(false);
  });

  it('che dấu (mask) API key an toàn chỉ hiển thị tiền tố và 4 ký tự cuối', () => {
    const maskedLegacy = maskApiKey('AIzaSyD-sampleLegacyKey1234');
    expect(maskedLegacy).toBe('AIzaSy...1234');

    const maskedNew = maskApiKey('AQabCdef1234567890xyz');
    expect(maskedNew).toBe('AQ...0xyz');

    expect(maskApiKey('')).toBe('');
    expect(maskApiKey('short')).toBe('****');
  });
});
