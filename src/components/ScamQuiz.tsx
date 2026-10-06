import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  Share2,
  Lightbulb,
  ShieldCheck,
  Download
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { calculateQuizResult, QuizScoreResult } from '../utils/quizScoring';

export const ScamQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userName, setUserName] = useState('');
  const [certificateIssued, setCertificateIssued] = useState(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));

    setShowExplanation((prev) => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Hoàn thành quiz
      setQuizCompleted(true);
      const userAnswersList = QUIZ_QUESTIONS.map((_, idx) => selectedAnswers[idx] ?? -1);
      const correctAnswersList = QUIZ_QUESTIONS.map((q) => q.correctAnswer);
      const res = calculateQuizResult(userAnswersList, correctAnswersList);

      if (res.isPassed) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setCertificateIssued(false);
  };

  const userAnswersList = QUIZ_QUESTIONS.map((_, idx) => selectedAnswers[idx] ?? -1);
  const correctAnswersList = QUIZ_QUESTIONS.map((q) => q.correctAnswer);
  const scoreResult: QuizScoreResult = calculateQuizResult(userAnswersList, correctAnswersList);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trắc Nghiệm Tình Huống KHKT 11H</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Khảo Sát & Đánh Giá Nhận Thức An Toàn Số 4.0
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Thử thách với 10 câu hỏi tình huống thực tế để kiểm tra mức độ cảnh giác và phản xạ phòng chống lừa đảo trực tuyến. Đạt từ 70% trở lên để nhận Chứng nhận số hóa!
          </p>
        </div>
      </div>

      {!quizCompleted ? (
        /* Giao diện Câu hỏi Quiz */
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Bar accessible theo SKILL 1.md */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">
                Câu {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}: {question.category}
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Tiến độ làm bài: Câu ${currentQuestionIndex + 1} trên ${QUIZ_QUESTIONS.length}`}
              className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-navy-950 overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Câu hỏi */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {question.text}
            </h3>

            {/* Hint nếu có */}
            {question.hint && !isAnswered && (
              <details className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-navy-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <summary className="font-semibold text-sky-600 dark:text-sky-400 inline-flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Xem gợi ý suy luận</span>
                </summary>
                <p className="mt-1.5 pl-5 italic text-slate-600 dark:text-slate-300">{question.hint}</p>
              </details>
            )}
          </div>

          {/* Các lựa chọn đáp án */}
          <div className="space-y-3" role="radiogroup" aria-label={`Đáp án cho câu ${currentQuestionIndex + 1}`}>
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              const isCorrect = question.correctAnswer === idx;

              let btnStyle =
                'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-navy-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500';
                } else {
                  btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <span
                    className={`shrink-0 w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center border ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAnswered && isSelected && !isCorrect
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-navy-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5">
                    {option}
                  </div>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-label="Đáp án đúng" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-label="Đáp án sai" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Giải thích chi tiết sau khi chọn đáp án */}
          {showExplanation[currentQuestionIndex] && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-slide-up ${
                selectedAnswers[currentQuestionIndex] === question.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {selectedAnswers[currentQuestionIndex] === question.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Chính xác! Bạn đã nhận diện rất đúng.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Chưa chính xác! Cần lưu ý thủ đoạn này.</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed pl-5">{question.explanation}</p>
            </div>
          )}

          {/* Nút Tiếp tục */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Giao diện Kết quả & Cấp Chứng nhận số */
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg text-center space-y-8 animate-fade-in">
          <div className="max-w-md mx-auto space-y-3">
            <div className="text-5xl">{scoreResult.badgeIcon}</div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {scoreResult.badgeTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {scoreResult.feedback}
            </p>
          </div>

          {/* Bảng điểm */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Điểm số</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">
                {scoreResult.percentage}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Số câu đúng</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {scoreResult.correctCount}/{scoreResult.totalCount}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Kết quả</span>
              <span
                className={`text-sm sm:text-base font-bold mt-1 block ${
                  scoreResult.isPassed ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {scoreResult.isPassed ? 'ĐẠT CHUẨN' : 'CHƯA ĐẠT'}
              </span>
            </div>
          </div>

          {/* Form Cấp Chứng nhận số nếu Đạt >= 70% */}
          {scoreResult.isPassed && (
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-sky-500/10 border-2 border-amber-400/40 space-y-4">
              <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-base">
                <Award className="w-5 h-5" />
                <span>Nhận Giấy Chứng Nhận Số Hóa KHKT 11H</span>
              </div>

              {!certificateIssued ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Nhập họ và tên của bạn để hệ thống cấp chứng nhận điện tử lưu niệm:
                  </p>
                  <div className="flex gap-2 max-w-sm mx-auto">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Họ và tên của bạn..."
                      className="flex-1 px-4 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => userName.trim() && setCertificateIssued(true)}
                      disabled={!userName.trim()}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs disabled:opacity-50 transition-colors"
                    >
                      Cấp bằng
                    </button>
                  </div>
                </div>
              ) : (
                /* Bản Chứng nhận */
                <div className="p-6 rounded-2xl bg-white dark:bg-navy-950 border border-amber-300 dark:border-amber-800/80 shadow-md text-center space-y-3 animate-fade-in relative">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM — ĐỀ TÀI KHKT 2025-2026
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase">
                    CHỨNG NHẬN CÔNG DÂN SỐ AN TOÀN 4.0
                  </h4>
                  <p className="text-xs text-slate-500">Trao tặng cho:</p>
                  <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 tracking-wide">
                    {userName.toUpperCase()}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Đã hoàn thành xuất sắc bài kiểm tra nhận thức và trang bị đầy đủ kiến thức nhận diện 24 thủ đoạn lừa đảo trực tuyến trong kỷ nguyên số.
                  </p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Mã CN: KHKT-11H-{Math.floor(100000 + Math.random() * 900000)}</span>
                    <span>Ngày cấp: {new Date().toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Các nút hành động */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại bài kiểm tra</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
