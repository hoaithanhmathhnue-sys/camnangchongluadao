export interface QuizScoreResult {
  correctCount: number;
  totalCount: number;
  percentage: number;
  isPassed: boolean;
  badgeTitle: string;
  badgeIcon: string;
  badgeColor: string;
  feedback: string;
}

/**
 * Tính toán kết quả bài kiểm tra trắc nghiệm nhận thức an toàn số
 * Passing score chuẩn: >= 70% (theo SKILL 1.md)
 */
export const calculateQuizResult = (
  userAnswers: number[],
  correctAnswers: number[]
): QuizScoreResult => {
  const totalCount = correctAnswers.length;
  if (totalCount === 0) {
    return {
      correctCount: 0,
      totalCount: 0,
      percentage: 0,
      isPassed: false,
      badgeTitle: 'Chưa thực hiện',
      badgeIcon: '🛡️',
      badgeColor: 'text-slate-400 bg-slate-100',
      feedback: 'Bạn chưa trả lời câu hỏi nào.',
    };
  }

  let correctCount = 0;
  for (let i = 0; i < totalCount; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      correctCount++;
    }
  }

  const percentage = Math.round((correctCount / totalCount) * 100);
  const isPassed = percentage >= 70;

  let badgeTitle = '';
  let badgeIcon = '🛡️';
  let badgeColor = '';
  let feedback = '';

  if (percentage === 100) {
    badgeTitle = 'Chuyên gia An toàn số Xuất sắc';
    badgeIcon = '🥇';
    badgeColor = 'from-amber-400 to-yellow-500 text-yellow-950 border-amber-300';
    feedback = 'Tuyệt vời! Bạn nắm vững 100% các kiến thức nhận diện và kỹ năng ứng phó lừa đảo trực tuyến 4.0!';
  } else if (percentage >= 80) {
    badgeTitle = 'Chiến sĩ An ninh mạng Tiên phong';
    badgeIcon = '🥈';
    badgeColor = 'from-sky-400 to-blue-500 text-blue-950 border-blue-300';
    feedback = 'Rất tốt! Bạn có phản xạ an toàn số xuất sắc, đủ khả năng tự bảo vệ mình và người thân.';
  } else if (percentage >= 70) {
    badgeTitle = 'Công dân số Đạt chuẩn Cảnh giác';
    badgeIcon = '🥉';
    badgeColor = 'from-emerald-400 to-teal-500 text-teal-950 border-teal-300';
    feedback = 'Đạt chuẩn! Bạn đã vượt qua bài kiểm tra nhận thức. Hãy tiếp tục ôn luyện để nâng cao phản xạ trước các thủ đoạn tinh vi.';
  } else {
    badgeTitle = 'Cần trau dồi thêm kỹ năng An toàn số';
    badgeIcon = '⚠️';
    badgeColor = 'from-rose-400 to-red-500 text-rose-950 border-rose-300';
    feedback = 'Chưa đạt chuẩn an toàn. Bạn đang đối mặt với nhiều nguy cơ bị kẻ gian thao túng. Hãy đọc kỹ lại 24 bài học trong cẩm nang nhé!';
  }

  return {
    correctCount,
    totalCount,
    percentage,
    isPassed,
    badgeTitle,
    badgeIcon,
    badgeColor,
    feedback,
  };
};
