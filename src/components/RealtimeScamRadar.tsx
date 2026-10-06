import React, { useState, useEffect } from 'react';
import {
  Radio,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldAlert,
  AlertCircle,
  Calendar,
  Sparkles,
  Key,
  Globe,
  Newspaper,
  CheckCircle2
} from 'lucide-react';
import {
  fetchRealtimeScamUpdates,
  ScamUpdateResult,
  STORAGE_KEYS,
  AiProvider
} from '../services/geminiService';

interface RealtimeScamRadarProps {
  onOpenApiModal: () => void;
  hasApiKey: boolean;
}

export const RealtimeScamRadar: React.FC<RealtimeScamRadarProps> = ({
  onOpenApiModal,
  hasApiKey,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateResult, setUpdateResult] = useState<ScamUpdateResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Tự động tải bản tin đã lưu trước đó trong cache nếu có
  useEffect(() => {
    try {
      const cached = localStorage.getItem('camnang_scam_radar_cache');
      if (cached) {
        setUpdateResult(JSON.parse(cached));
      }
    } catch (e) {
      console.warn('Lỗi đọc cache radar:', e);
    }
  }, []);

  const handleFetchUpdates = async () => {
    const provider = (localStorage.getItem(STORAGE_KEYS.PROVIDER) as AiProvider) || 'gemini';
    const apiKey =
      provider === 'gemini'
        ? localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || ''
        : localStorage.getItem(STORAGE_KEYS.AGENT_PLATFORM_KEY) || '';
    const selectedModel = localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL) || undefined;

    if (!apiKey) {
      onOpenApiModal();
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await fetchRealtimeScamUpdates(apiKey, provider, selectedModel);
      setUpdateResult(result);
      localStorage.setItem('camnang_scam_radar_cache', JSON.stringify(result));
    } catch (err: any) {
      setErrorMessage(err?.message || 'Không thể cập nhật thông tin lừa đảo từ mạng.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Globe className="w-3.5 h-3.5" />
              <span>Google Search Grounding Live</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Radar Cập Nhật Thủ Đoạn Lừa Đảo Trực Tuyến Mới Nhất
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Tính năng AI kết nối Internet thời gian thực để quét và tổng hợp các cảnh báo khẩn cấp, chiêu trò lừa đảo công nghệ cao mới xuất hiện tại Việt Nam từ Cục An toàn thông tin, Bộ Công an và báo chí chính thống.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              type="button"
              onClick={handleFetchUpdates}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Đang quét toàn mạng...' : 'Cập nhật thông tin lừa đảo'}</span>
            </button>

            {!hasApiKey && (
              <button
                type="button"
                onClick={onOpenApiModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Cần cấu hình API Key trước</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Không thể tải thông tin cập nhật</p>
            <p>{errorMessage}</p>
            {!hasApiKey && (
              <button
                onClick={onOpenApiModal}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 text-white font-semibold text-xs hover:bg-rose-500 transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Nhập API Key ngay</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm animate-pulse">
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/10 text-sky-500 mx-auto">
            <Radio className="w-8 h-8 animate-ping absolute" />
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Đang kết nối Google Search Grounding...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              AI đang tìm kiếm các bản tin an ninh mạng, bài viết điều tra và cảnh báo lừa đảo công nghệ cao mới nhất tại Việt Nam trong 30-60 ngày qua.
            </p>
          </div>
        </div>
      )}

      {/* Kết quả cập nhật */}
      {!isLoading && updateResult && (
        <div className="space-y-4">
          {/* Metadata bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>Thời điểm cập nhật: <strong className="font-semibold text-slate-800 dark:text-slate-200">{updateResult.updatedAt}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">Mô hình: <code className="text-sky-600 dark:text-sky-400 font-mono font-semibold">{updateResult.modelUsed}</code></span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20">
                Tìm thấy {updateResult.items.length} cảnh báo mới
              </span>
            </div>
          </div>

          {/* Nhận định chung */}
          {updateResult.rawSummary && (
            <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 text-xs sm:text-sm text-sky-950 dark:text-sky-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
              <div>
                <strong className="font-bold">Xu hướng tội phạm mạng ghi nhận: </strong>
                <span>{updateResult.rawSummary}</span>
              </div>
            </div>
          )}

          {/* Danh sách các vụ việc / thủ đoạn mới quét được */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {updateResult.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Cảnh báo mới #{idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                      {item.source}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Dấu hiệu cảnh báo */}
                  {item.warningSigns && item.warningSigns.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                        Dấu hiệu phát hiện:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {item.warningSigns.map((sign, sIdx) => (
                          <li key={sIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lời khuyên */}
                  {item.advice && (
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Lời khuyên phòng tránh:</span>
                      </div>
                      <p>{item.advice}</p>
                    </div>
                  )}
                </div>

                {item.url && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <span>Xem nguồn tin bài viết</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state khi chưa bấm cập nhật lần nào */}
      {!isLoading && !updateResult && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
            <Radio className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sẵn sàng rà quét thông tin lừa đảo trực tuyến mới
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bấm nút <strong className="text-sky-600 dark:text-sky-400">"Cập nhật thông tin lừa đảo"</strong> ở trên để AI tìm kiếm các thủ đoạn mới phát sinh tại Việt Nam theo thời gian thực.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
