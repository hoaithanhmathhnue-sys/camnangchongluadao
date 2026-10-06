import { describe, it, expect } from 'vitest';
import { calculateQuizResult } from '../src/utils/quizScoring';

describe('Quiz Scoring Logic (SKILL 1.md compliance)', () => {
  it('tính đúng 100% khi đúng toàn bộ 10/10 câu', () => {
    const result = calculateQuizResult([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result.correctCount).toBe(10);
    expect(result.totalCount).toBe(10);
    expect(result.percentage).toBe(100);
    expect(result.isPassed).toBe(true);
    expect(result.badgeTitle).toBe('Chuyên gia An toàn số Xuất sắc');
  });

  it('đạt điểm đỗ (Passing score) khi đạt từ 70% trở lên', () => {
    // 7/10 câu đúng -> 70%
    const userAnswers = [0, 1, 2, 3, 4, 5, 6, 99, 99, 99];
    const correctAnswers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = calculateQuizResult(userAnswers, correctAnswers);

    expect(result.correctCount).toBe(7);
    expect(result.percentage).toBe(70);
    expect(result.isPassed).toBe(true);
  });

  it('không đỗ khi dưới 70%', () => {
    // 6/10 câu đúng -> 60%
    const userAnswers = [0, 1, 2, 3, 4, 5, 99, 99, 99, 99];
    const correctAnswers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = calculateQuizResult(userAnswers, correctAnswers);

    expect(result.correctCount).toBe(6);
    expect(result.percentage).toBe(60);
    expect(result.isPassed).toBe(false);
    expect(result.badgeTitle).toContain('Cần trau dồi thêm');
  });

  it('xử lý an toàn khi mảng rỗng', () => {
    const result = calculateQuizResult([], []);
    expect(result.percentage).toBe(0);
    expect(result.isPassed).toBe(false);
  });
});
