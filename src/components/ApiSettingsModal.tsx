import React, { useState, useEffect } from 'react';
import {
  X,
  Key,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Cpu,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  AiProvider,
  STORAGE_KEYS,
  GEMINI_FALLBACK_MODELS,
  AGENT_PLATFORM_FALLBACK_MODELS,
  DEFAULT_GEMINI_MODEL,
  DEFAULT_AGENT_PLATFORM_MODEL,
  createGoogleAiClient,
  parseApiError
} from '../services/geminiService';
import { isValidGoogleAiApiKey, maskApiKey } from '../services/apiKeyValidator';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [provider, setProvider] = useState<AiProvider>('gemini');
  const [geminiKey, setGeminiKey] = useState('');
  const [agentPlatformKey, setAgentPlatformKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_GEMINI_MODEL);
  const [showKey, setShowKey] = useState(false);

  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedProvider = (localStorage.getItem(STORAGE_KEYS.PROVIDER) as AiProvider) || 'gemini';
      const savedGeminiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
      const savedAgentKey = localStorage.getItem(STORAGE_KEYS.AGENT_PLATFORM_KEY) || '';
      const savedModel = localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL) || (
        savedProvider === 'agent-platform' ? DEFAULT_AGENT_PLATFORM_MODEL : DEFAULT_GEMINI_MODEL
      );

      setProvider(savedProvider);
      setGeminiKey(savedGeminiKey);
      setAgentPlatformKey(savedAgentKey);
      setSelectedModel(savedModel);
      setTestStatus('idle');
      setTestMessage('');
      setSaveSuccess(false);
    }
  }, [isOpen]);

  // Khi đổi tab provider
  const handleTabChange = (newProvider: AiProvider) => {
    setProvider(newProvider);
    setTestStatus('idle');
    setTestMessage('');
    if (newProvider === 'agent-platform') {
      if (!AGENT_PLATFORM_FALLBACK_MODELS.includes(selectedModel as any)) {
        setSelectedModel(DEFAULT_AGENT_PLATFORM_MODEL);
      }
    } else {
      if (!GEMINI_FALLBACK_MODELS.includes(selectedModel as any)) {
        setSelectedModel(DEFAULT_GEMINI_MODEL);
      }
    }
  };

  const currentKey = provider === 'gemini' ? geminiKey : agentPlatformKey;
  const setCurrentKey = (val: string) => {
    if (provider === 'gemini') {
      setGeminiKey(val);
    } else {
      setAgentPlatformKey(val);
    }
    setTestStatus('idle');
  };

  const handleTestConnection = async () => {
    if (!currentKey.trim()) {
      setTestStatus('error');
      setTestMessage('Vui lòng nhập API Key trước khi kiểm tra.');
      return;
    }

    if (!isValidGoogleAiApiKey(currentKey)) {
      setTestStatus('error');
      setTestMessage('Định dạng key chưa hợp lệ. Key Google AI phải bắt đầu bằng AIzaSy... hoặc AQ...');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Đang gửi truy vấn kiểm tra tới Google AI...');

    try {
      const client = createGoogleAiClient(currentKey.trim(), provider);
      const res = await client.models.generateContent({
        model: selectedModel,
        contents: 'Xin chào! Hãy trả về đúng từ: OK',
      });

      if (res && res.text) {
        setTestStatus('success');
        setTestMessage(`Kết nối thành công! Model ${selectedModel} đã phản hồi xuất sắc.`);
      } else {
        throw new Error('Không nhận được phản hồi từ model.');
      }
    } catch (err: any) {
      setTestStatus('error');
      const errType = parseApiError(err);
      if (errType === 'MODEL_OVERLOADED') {
        setTestMessage('Model đang tạm thời quá tải (503/high demand). API Key của bạn vẫn hợp lệ!');
      } else if (errType === 'INVALID_API_KEY') {
        setTestMessage('API Key không hợp lệ hoặc đã bị khóa/hết hạn. Vui lòng kiểm tra lại trên Google AI Studio.');
      } else if (errType === 'QUOTA_EXCEEDED') {
        setTestMessage('API Key đã vượt hạn mức quota hôm nay. Vui lòng thử lại sau.');
      } else {
        setTestMessage(`Lỗi kết nối: ${err?.message || 'Không thể liên lạc với máy chủ AI'}`);
      }
    }
  };

  const handleSave = () => {
    const trimmed = currentKey.trim();
    if (trimmed && !isValidGoogleAiApiKey(trimmed)) {
      setTestStatus('error');
      setTestMessage('API Key phải bắt đầu bằng AIzaSy... hoặc AQ... và có độ dài tối thiểu 8 ký tự.');
      return;
    }

    // Lưu riêng biệt từng provider theo chuẩn api.md
    if (provider === 'gemini') {
      localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, trimmed);
    } else {
      localStorage.setItem(STORAGE_KEYS.AGENT_PLATFORM_KEY, trimmed);
    }

    localStorage.setItem(STORAGE_KEYS.PROVIDER, provider);
    localStorage.setItem(STORAGE_KEYS.SELECTION_SOURCE, 'manual');
    localStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, selectedModel);

    setSaveSuccess(true);
    setTimeout(() => {
      onSaved();
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 id="api-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Cài đặt Google AI API Key
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kích hoạt Radar lừa đảo thời gian thực & Bác sĩ an toàn số
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Tab chọn Provider theo chuẩn api.md */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Chọn Nhà cung cấp Dịch vụ AI (Bắt buộc chọn thủ công)
            </label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleTabChange('gemini')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  provider === 'gemini'
                    ? 'bg-white dark:bg-navy-800 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Gemini API (Khuyên dùng)</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('agent-platform')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  provider === 'agent-platform'
                    ? 'bg-white dark:bg-navy-800 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Agent Platform API</span>
              </button>
            </div>
          </div>

          {/* Ô nhập API Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="api-key-input" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {provider === 'gemini' ? 'Gemini API Key' : 'Agent Platform API Key'}
              </label>
              {currentKey && (
                <span className="text-xs text-slate-400">
                  Đã lưu: {maskApiKey(currentKey)}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                id="api-key-input"
                type={showKey ? 'text' : 'password'}
                value={currentKey}
                onChange={(e) => setCurrentKey(e.target.value)}
                placeholder="Nhập API Key (bắt đầu bằng AIzaSy... hoặc AQ...)"
                className="w-full px-4 py-2.5 pr-10 text-sm font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showKey ? 'Ẩn key' : 'Hiện key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              * Hệ thống chấp nhận cả định dạng chuẩn cũ <code className="text-sky-600 dark:text-sky-400 font-mono">AIzaSy...</code> và định dạng thế hệ mới <code className="text-sky-600 dark:text-sky-400 font-mono">AQ...</code>. Key được lưu bảo mật ngay trên trình duyệt (LocalStorage).
            </p>
          </div>

          {/* Chọn Model */}
          <div>
            <label htmlFor="model-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mô hình AI ưu tiên
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              {provider === 'gemini' ? (
                <>
                  <option value="gemini-3.6-flash">gemini-3.6-flash (Mặc định - Nhanh nhất & Tối ưu nhất)</option>
                  <option value="gemini-3.5-flash">gemini-3.5-flash (Dự phòng chất lượng cao)</option>
                  <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (Siêu nhanh, tiết kiệm token)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Tương thích ngược)</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Cực kỳ ổn định)</option>
                </>
              ) : (
                <>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Mặc định cho Agent Platform)</option>
                  <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Nhẹ & ổn định)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Suy luận sâu)</option>
                </>
              )}
            </select>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              * Tích hợp cơ chế tự động Fallback: Khi một model bị quá tải tạm thời (503), ứng dụng sẽ tự động chuyển đổi sang model tiếp theo mà không làm gián đoạn trải nghiệm.
            </p>
          </div>

          {/* Thông báo kết quả kiểm tra */}
          {testStatus !== 'idle' && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                testStatus === 'testing'
                  ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                  : testStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
              }`}
            >
              {testStatus === 'testing' && <RefreshCw className="w-4 h-4 shrink-0 animate-spin mt-0.5" />}
              {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />}
              {testStatus === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />}
              <span className="leading-relaxed">{testMessage}</span>
            </div>
          )}

          {/* Hướng dẫn lấy API Key miễn phí */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                Chưa có Google AI API Key?
              </span>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium"
              >
                <span>Nhận key miễn phí</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Chỉ mất 30 giây để tạo key miễn phí trên Google AI Studio bằng tài khoản Gmail của bạn (không cần nhập thẻ ngân hàng).
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/40 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
            <span>Kiểm tra kết nối</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu thành công!</span>
                </>
              ) : (
                <span>Lưu cấu hình</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
