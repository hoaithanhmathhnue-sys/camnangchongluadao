import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Mic,
  MicOff,
  Send,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  Key,
  RotateCcw,
  Volume2,
  FileQuestion,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  analyzeScamScenario,
  ScamAnalysisResult,
  STORAGE_KEYS,
  AiProvider
} from '../services/geminiService';

interface ScamAdvisorProps {
  onOpenApiModal: () => void;
  hasApiKey: boolean;
  initialScenario?: string;
}

export const ScamAdvisor: React.FC<ScamAdvisorProps> = ({
  onOpenApiModal,
  hasApiKey,
  initialScenario = '',
}) => {
  const [inputText, setInputText] = useState(initialScenario);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (initialScenario) {
      setInputText(`Tôi gặp tình huống nghi ngờ liên quan đến: ${initialScenario}. Xin chuyên gia phân tích và hướng dẫn tôi cách xử lý an toàn!`);
    }
  }, [initialScenario]);

  // Kiểm tra hỗ trợ Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN'; // Nhận diện tiếng Việt

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Lỗi nhận diện giọng nói:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Không thể khởi tạo Web Speech API:', e);
      setSpeechSupported(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói. Bạn hãy gõ nội dung vào ô văn bản nhé!');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Lỗi bắt đầu ghi âm:', err);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Vui lòng nhập hoặc mô tả tình huống bạn gặp phải.');
      return;
    }

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

    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }

      const result = await analyzeScamScenario(apiKey, inputText, provider, selectedModel);
      setAnalysisResult(result);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra trong quá trình AI phân tích tình huống.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setAnalysisResult(null);
    setErrorMessage('');
  };

  // Các tình huống mẫu để test nhanh
  const sampleScenarios = [
    {
      title: 'Cuộc gọi đe dọa từ Công an',
      text: 'Có số lạ gọi đến tự xưng Thiếu tá Công an điều tra ma túy, đọc đúng số CCCD của tôi và bảo tôi phải chuyển 30 triệu vào tài khoản tạm giữ để chứng minh trong sạch, cấm không được nói cho ai.',
    },
    {
      title: 'Tuyển CTV Shopee kiếm tiền',
      text: 'Có người nhắn tin trên Telegram mời làm cộng tác viên giật đơn Shopee tại nhà, mỗi ngày kiếm 300k. Đơn đầu nạp 200k đã được trả 240k, giờ họ giục tôi nạp 15 triệu làm đơn VIP.',
    },
    {
      title: 'Tin nhắn mạo danh Viettinbank',
      text: 'Tôi nhận được tin nhắn từ hộp thư tên VIETINBANK bảo tài khoản bị khóa, bấm vào link vietin-digibank.xyz để mở khóa và nhập mã OTP gửi về máy.',
    },
    {
      title: 'Bạn thân gọi video vay tiền',
      text: 'Bạn thân đại học tự nhiên gọi video qua Facebook, thấy mặt bạn chớp nhoáng 5 giây bảo đang cấp cứu cần mượn gấp 10 triệu rồi cúp máy vì sóng yếu, gửi số tài khoản tên người khác.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" />
              <span>Chuyên gia An ninh mạng AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tư Vấn & Thẩm Định Hành Vi Lừa Đảo Trực Tuyến
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Bạn đang gặp phải một tin nhắn, cuộc gọi, email hoặc lời mời đầu tư đáng ngờ? Hãy gõ nội dung hoặc bấm Micro để nói, AI sẽ đối chiếu với 24 thủ đoạn cẩm nang để phân tích rủi ro và hướng dẫn xử lý khẩn cấp!
            </p>
          </div>

          {!hasApiKey && (
            <button
              type="button"
              onClick={onOpenApiModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all self-start md:self-center"
            >
              <Key className="w-4 h-4" />
              <span>Cấu hình API Key để mở khóa AI</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Nhập liệu (Văn bản & Giọng nói) */}
      <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="scenario-input" className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span>Nội dung tình huống bạn gặp phải:</span>
            {isRecording && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Đang nghe giọng nói tiếng Việt...
              </span>
            )}
          </label>

          {/* Nút bấm Micro thu âm */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isRecording
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30 animate-pulse'
                : 'bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
            title={isRecording ? 'Bấm để dừng ghi âm' : 'Bấm micro để nói bằng giọng nói'}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-500" />}
            <span>{isRecording ? 'Dừng nói' : 'Mô tả bằng giọng nói'}</span>
          </button>
        </div>

        {/* Textarea nhập liệu */}
        <div className="relative">
          <textarea
            id="scenario-input"
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ví dụ: Nhận được tin nhắn từ bạn thân mượn 5 triệu chữa bệnh; hoặc nhận cuộc gọi xưng là công an dọa bắt vì liên quan ma túy; hoặc link lạ yêu cầu cập nhật định danh VNeID..."
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-y"
          />
        </div>

        {/* Gợi ý tình huống mẫu */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Hoặc thử nhanh các kịch bản thực tế:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {sampleScenarios.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(item.text)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-navy-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Nút Phân tích */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích rủi ro...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Thẩm định hành vi ngay</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <p className="font-bold">Lỗi thẩm định</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* KẾT QUẢ PHÂN TÍCH CHUYÊN SÂU */}
      {analysisResult && (
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg space-y-6 animate-slide-up">
          {/* Header Kết luận */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${analysisResult.dangerColor}`}
                >
                  {analysisResult.riskLevel}
                </span>
                <span className="text-xs text-slate-400">
                  Model: {analysisResult.modelUsed}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                {analysisResult.isScam ? (
                  <>
                    <ShieldAlert className="w-6 h-6 text-rose-500" />
                    <span>CẢNH BÁO: PHÁT HIỆN DẤU HIỆU LỪA ĐẢO!</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <span>Tình huống có độ an toàn cao</span>
                  </>
                )}
              </h3>
            </div>

            {/* Chỉ số rủi ro */}
            <div className="shrink-0 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-center min-w-[140px]">
              <span className="text-[11px] font-semibold text-slate-400 block">Độ nghi vấn lừa đảo:</span>
              <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                {analysisResult.confidenceScore}%
              </span>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                  style={{ width: `${analysisResult.confidenceScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Thủ đoạn nhận diện được */}
          {analysisResult.identifiedTactics && analysisResult.identifiedTactics.length > 0 && (
            <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/50 space-y-2">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Thủ đoạn trùng khớp trong Cẩm nang an toàn số:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {analysisResult.identifiedTactics.map((tactic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-white dark:bg-navy-900 border border-sky-300 dark:border-sky-700 text-xs font-bold text-sky-900 dark:text-sky-100 shadow-2xs"
                  >
                    {tactic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Phân tích tâm lý & bản chất */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Phân tích chuyên môn của AI:
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <p>{analysisResult.analysisReasoning}</p>
            </div>
          </div>

          {/* Dấu hiệu phát hiện trong nội dung */}
          {analysisResult.warningSignsFound && analysisResult.warningSignsFound.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Các dấu hiệu bất thường đã phát hiện:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysisResult.warningSignsFound.map((sign, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Khuyến nghị hành động khẩn cấp */}
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-3">
            <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Hành động phòng thủ khẩn cấp bạn cần làm ngay:</span>
            </h4>
            <div className="space-y-2">
              {analysisResult.emergencyActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="font-semibold">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Đường dây nóng hỗ trợ */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Nếu đã lỡ chuyển tiền hoặc mất tài khoản, hãy liên hệ ngay:
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="tel:113"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Cảnh sát 113</span>
              </a>
              <a
                href="tel:156"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Tổng đài 156 (Bộ TTTT)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
