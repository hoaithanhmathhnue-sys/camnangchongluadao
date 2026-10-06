/**
 * Google AI API Key Validator & Helper
 * Tuân thủ nghiêm ngặt api.md (v4.1)
 * Chấp nhận cả định dạng cũ 'AIzaSy...' và định dạng mới 'AQ...'
 */

export const GOOGLE_AI_API_KEY_PATTERN = /^(?:AIzaSy|AQ)\S{8,}$/;

/**
 * Kiểm tra tính hợp lệ về mặt định dạng của Google AI API Key
 * Hỗ trợ cả key Gemini API và Agent Platform API
 */
export const isValidGoogleAiApiKey = (key: string): boolean => {
  if (!key) return false;
  return GOOGLE_AI_API_KEY_PATTERN.test(key.trim());
};

/**
 * Che dấu an toàn API Key khi hiển thị trên giao diện người dùng
 * Chỉ hiển thị tiền tố (AIzaSy hoặc AQ) và 4 ký tự cuối, phần giữa là '...'
 */
export const maskApiKey = (key: string): string => {
  if (!key) return '';
  const trimmed = key.trim();
  if (trimmed.length < 8) return '****';

  if (trimmed.startsWith('AIzaSy')) {
    return `AIzaSy...${trimmed.slice(-4)}`;
  }
  if (trimmed.startsWith('AQ')) {
    return `AQ...${trimmed.slice(-4)}`;
  }
  return `***...${trimmed.slice(-4)}`;
};
