import { describe, it, expect } from 'vitest';
import { parseApiError, getOrderedModels, GEMINI_FALLBACK_MODELS, AGENT_PLATFORM_FALLBACK_MODELS } from '../src/services/geminiService';

describe('Error Parser & Fallback Models (api.md compliance)', () => {
  it('nhận diện đúng lỗi MODEL_OVERLOADED (503, UNAVAILABLE, high demand)', () => {
    expect(parseApiError(new Error('503 Service Unavailable'))).toBe('MODEL_OVERLOADED');
    expect(parseApiError({ message: 'The model is overloaded. Please try again later.' })).toBe('MODEL_OVERLOADED');
    expect(parseApiError({ status: 503, message: 'This model is currently experiencing high demand' })).toBe('MODEL_OVERLOADED');
    expect(parseApiError('UNAVAILABLE: backend error')).toBe('MODEL_OVERLOADED');
  });

  it('nhận diện đúng lỗi QUOTA_EXCEEDED (429, RESOURCE_EXHAUSTED)', () => {
    expect(parseApiError(new Error('429 Too Many Requests'))).toBe('QUOTA_EXCEEDED');
    expect(parseApiError({ message: 'RESOURCE_EXHAUSTED: quota exceeded' })).toBe('QUOTA_EXCEEDED');
  });

  it('nhận diện đúng lỗi INVALID_API_KEY (401, API_KEY_INVALID, PERMISSION_DENIED)', () => {
    expect(parseApiError(new Error('API_KEY_INVALID'))).toBe('INVALID_API_KEY');
    expect(parseApiError({ message: 'Request failed with status code 401' })).toBe('INVALID_API_KEY');
    expect(parseApiError({ message: 'PERMISSION_DENIED: invalid key' })).toBe('INVALID_API_KEY');
  });

  it('sắp xếp thứ tự model fallback cho Gemini API với model đã chọn đứng đầu', () => {
    const models = getOrderedModels('gemini-3.5-flash', 'gemini');
    expect(models[0]).toBe('gemini-3.5-flash');
    expect(models).toContain('gemini-3.6-flash');
    expect(models).toContain('gemini-2.5-flash');
    // Đảm bảo không trùng lặp
    expect(new Set(models).size).toBe(models.length);
  });

  it('sắp xếp thứ tự model fallback cho Agent Platform API mặc định là gemini-2.5-flash', () => {
    const models = getOrderedModels(undefined, 'agent-platform');
    expect(models[0]).toBe('gemini-2.5-flash');
    expect(models).toEqual(expect.arrayContaining([...AGENT_PLATFORM_FALLBACK_MODELS]));
  });

  it('chuỗi fallback mặc định của Gemini API bắt đầu bằng gemini-3.6-flash theo quy tắc v4.1', () => {
    const models = getOrderedModels(undefined, 'gemini');
    expect(models[0]).toBe('gemini-3.6-flash');
    expect(models[1]).toBe('gemini-3.5-flash');
    expect(models).toEqual(GEMINI_FALLBACK_MODELS);
  });
});
