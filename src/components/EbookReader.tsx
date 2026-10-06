import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  FileText,
  Bookmark,
  ZoomIn,
  X,
  Bot,
  Filter,
  Check
} from 'lucide-react';
import { SCAMS_DATA, CHAPTERS, ScamTopic } from '../data/scamsData';

interface EbookReaderProps {
  onConsultAi: (scenarioTitle: string) => void;
}

export const EbookReader: React.FC<EbookReaderProps> = ({ onConsultAi }) => {
  const [selectedScamId, setSelectedScamId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [readScams, setReadScams] = useState<number[]>([]);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Load danh sách bài đã đọc từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('camnang_read_topics');
      if (saved) {
        setReadScams(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Lỗi đọc tiến trình đọc:', e);
    }
  }, []);

  const toggleReadStatus = (id: number) => {
    let updated: number[];
    if (readScams.includes(id)) {
      updated = readScams.filter((item) => item !== id);
    } else {
      updated = [...readScams, id];
    }
    setReadScams(updated);
    localStorage.setItem('camnang_read_topics', JSON.stringify(updated));
  };

  // Lọc bài học theo tìm kiếm và chương
  const filteredScams = useMemo(() => {
    return SCAMS_DATA.filter((scam) => {
      const matchChapter = selectedChapter === 'all' || scam.chapter === selectedChapter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        scam.title.toLowerCase().includes(q) ||
        scam.shortDesc.toLowerCase().includes(q) ||
        scam.tricks.some((t) => t.toLowerCase().includes(q)) ||
        scam.signs.some((s) => s.toLowerCase().includes(q));

      return matchChapter && matchQuery;
    });
  }, [searchQuery, selectedChapter]);

  // Bài học hiện tại
  const currentScam = useMemo(() => {
    return SCAMS_DATA.find((s) => s.id === selectedScamId) || SCAMS_DATA[0];
  }, [selectedScamId]);

  const currentIndex = SCAMS_DATA.findIndex((s) => s.id === currentScam.id);
  const prevScam = currentIndex > 0 ? SCAMS_DATA[currentIndex - 1] : null;
  const nextScam = currentIndex < SCAMS_DATA.length - 1 ? SCAMS_DATA[currentIndex + 1] : null;

  const readingProgress = Math.round((readScams.length / SCAMS_DATA.length) * 100);

  const getDangerBadge = (level: string) => {
    switch (level) {
      case 'RẤT NGUY HIỂM':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'NGUY HIỂM CAO':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      default:
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-base sm:text-lg leading-relaxed';
      case 'xlarge':
        return 'text-lg sm:text-xl leading-loose';
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Giới thiệu Sách & Tiến trình Đọc */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-xs font-semibold text-sky-300 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sách Điện Tử Tương Tác KHKT 11H</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Cẩm Nang Nhận Biết & Phòng Chống Lừa Đảo Trực Tuyến 4.0
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Trang bị cẩm nang 24 thủ đoạn tội phạm công nghệ cao phổ biến nhất, phương pháp nhận diện tức thì và phản xạ phòng ngừa bảo vệ bạn và gia đình.
            </p>
          </div>

          {/* Thanh Tiến trình đọc */}
          <div className="shrink-0 w-full md:w-64 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">Tiến độ cẩm nang:</span>
              <span className="font-bold text-sky-300">{readScams.length}/{SCAMS_DATA.length} bài ({readingProgress}%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-black/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500 rounded-full"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              {readingProgress >= 100
                ? '🎉 Bạn đã hoàn thành toàn bộ cẩm nang!'
                : 'Đọc và bấm Đánh dấu đã đọc ở cuối mỗi bài nhé!'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Danh mục Bên Trái & Nội dung Đọc Bên Phải */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CỘT TRÁI: Tìm kiếm, Bộ lọc & Danh mục 24 bài */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3 sticky top-24">
            {/* Thanh Tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm thủ đoạn: Deepfake, SIM, OTP, CTV..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bộ lọc theo Chương (Hiển thị 2 hàng đầy đủ, không cuộn) */}
            <div className="space-y-1.5 text-xs">
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedChapter('all')}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedChapter === 'all'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Tất cả (24)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedChapter(1)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedChapter === 1
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={CHAPTERS[0].title}
                >
                  Chương 1
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedChapter(2)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedChapter === 2
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={CHAPTERS[1].title}
                >
                  Chương 2
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedChapter(3)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedChapter === 3
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={CHAPTERS[2].title}
                >
                  Chương 3
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedChapter(4)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedChapter === 4
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={CHAPTERS[3].title}
                >
                  Chương 4
                </button>
              </div>
            </div>

            {/* Danh sách 24 Chuyên đề */}
            <div className="max-h-[60vh] overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredScams.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Không tìm thấy thủ đoạn nào phù hợp.
                </div>
              ) : (
                filteredScams.map((scam) => {
                  const isSelected = scam.id === currentScam.id;
                  const isRead = readScams.includes(scam.id);

                  return (
                    <button
                      key={scam.id}
                      onClick={() => setSelectedScamId(scam.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-800/80 shadow-xs'
                          : 'hover:bg-slate-50 dark:hover:bg-navy-800/50 border border-transparent'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                          isSelected
                            ? 'bg-sky-600 text-white'
                            : isRead
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {isRead ? <Check className="w-3.5 h-3.5" /> : scam.id}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            Chương {scam.chapter}
                          </span>
                          <span
                            className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${getDangerBadge(
                              scam.dangerLevel
                            )}`}
                          >
                            {scam.dangerLevel === 'RẤT NGUY HIỂM' ? 'CỰC NGUY HIỂM' : scam.dangerLevel}
                          </span>
                        </div>
                        <h4
                          className={`text-xs font-semibold truncate mt-0.5 ${
                            isSelected
                              ? 'text-sky-700 dark:text-sky-300 font-bold'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {scam.title}
                        </h4>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Nội dung chi tiết Bài học E-book */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header Bài học */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                    Bài {currentScam.id < 10 ? `0${currentScam.id}` : currentScam.id} / 24
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentScam.chapterTitle}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-extrabold rounded-lg border ${getDangerBadge(
                      currentScam.dangerLevel
                    )}`}
                  >
                    {currentScam.dangerLevel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {currentScam.title}
                </h2>
              </div>

              {/* Tùy chỉnh Cỡ chữ */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-navy-950 p-1 rounded-xl self-start sm:self-center border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 text-xs rounded-lg font-medium transition-colors ${
                    fontSize === 'normal'
                      ? 'bg-white dark:bg-navy-800 text-sky-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Cỡ chữ Vừa"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 text-sm rounded-lg font-medium transition-colors ${
                    fontSize === 'large'
                      ? 'bg-white dark:bg-navy-800 text-sky-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Cỡ chữ Lớn"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 text-base rounded-lg font-bold transition-colors ${
                    fontSize === 'xlarge'
                      ? 'bg-white dark:bg-navy-800 text-sky-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Cỡ chữ Rất Lớn"
                >
                  A++
                </button>
              </div>
            </div>

            {/* Ảnh Minh họa Thực tế từ Tài liệu Docx */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-navy-950 shadow-inner">
              <img
                src={currentScam.image}
                alt={currentScam.title}
                className="w-full max-h-[420px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <button
                onClick={() => setPreviewImage(currentScam.image)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1.5 transition-all opacity-90 group-hover:opacity-100"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Xem ảnh lớn</span>
              </button>
            </div>

            {/* Tóm tắt */}
            <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/50">
              <p className={`font-medium text-sky-900 dark:text-sky-200 ${getFontSizeClass()}`}>
                💡 <span className="font-bold">Tổng quan: </span>
                {currentScam.shortDesc}
              </p>
            </div>

            {/* Nội dung chi tiết 4 Khối: Thủ đoạn - Dấu hiệu - Phòng tránh - Tình huống */}
            <div className="space-y-6">
              {/* 1. Thủ đoạn của đối tượng */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base sm:text-lg">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <h3>1. Thủ đoạn tinh vi của kẻ lừa đảo</h3>
                </div>
                <div className="grid grid-cols-1 gap-2.5 pl-2 sm:pl-7">
                  {currentScam.tricks.map((trick, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 flex items-start gap-2.5"
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className={`text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>{trick}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Dấu hiệu nhận biết */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-base sm:text-lg">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3>2. Dấu hiệu nhận diện đặc trưng (Cờ đỏ cảnh báo)</h3>
                </div>
                <div className="grid grid-cols-1 gap-2.5 pl-2 sm:pl-7">
                  {currentScam.signs.map((sign, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2.5"
                    >
                      <span className="shrink-0 text-amber-500 font-bold text-base">⚠️</span>
                      <p className={`text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>{sign}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Biện pháp phòng tránh */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">
                  <Lightbulb className="w-5 h-5 shrink-0" />
                  <h3>3. Biện pháp phòng ngừa và Kỹ năng xử lý an toàn</h3>
                </div>
                <div className="grid grid-cols-1 gap-2.5 pl-2 sm:pl-7">
                  {currentScam.prevention.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-1" />
                      <p className={`text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Tình huống thực tế (Case study) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base sm:text-lg">
                  <FileText className="w-5 h-5 shrink-0" />
                  <h3>4. Vụ việc thực tế điển hình (Case Study)</h3>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 italic pl-5 sm:pl-8 border-l-4 border-l-indigo-600">
                  <p className={`text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>
                    "{currentScam.caseStudy}"
                  </p>
                </div>
              </div>
            </div>

            {/* Các nút Điều hướng & Hành động cuối bài */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Đánh dấu đã đọc & Tư vấn AI */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => toggleReadStatus(currentScam.id)}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    readScams.includes(currentScam.id)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {readScams.includes(currentScam.id) ? '✓ Đã hoàn thành bài này' : 'Đánh dấu đã đọc'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onConsultAi(currentScam.title)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all"
                  title="Chuyển sang Trợ lý AI để phân tích sâu tình huống này"
                >
                  <Bot className="w-4 h-4" />
                  <span>Tư vấn AI tình huống này</span>
                </button>
              </div>

              {/* Nút Bài trước / Bài kế tiếp */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  type="button"
                  disabled={!prevScam}
                  onClick={() => prevScam && setSelectedScamId(prevScam.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bài trước</span>
                </button>

                <button
                  type="button"
                  disabled={!nextScam}
                  onClick={() => nextScam && setSelectedScamId(nextScam.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xem ảnh lớn (Image Preview) */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Minh họa lớn"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-white dark:bg-navy-800 text-slate-800 dark:text-white shadow-lg hover:scale-110 transition-transform"
              aria-label="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
