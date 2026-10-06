import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { EbookReader } from './components/EbookReader';
import { RealtimeScamRadar } from './components/RealtimeScamRadar';
import { ScamAdvisor } from './components/ScamAdvisor';
import { ScamQuiz } from './components/ScamQuiz';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { Footer } from './components/Footer';
import { STORAGE_KEYS, AiProvider } from './services/geminiService';
import { HOTLINES } from './data/scamsData';
import { PhoneCall, ShieldAlert, AlertOctagon, ExternalLink, HelpCircle, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ebook');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [advisorScenario, setAdvisorScenario] = useState('');

  // Cập nhật Dark Mode trên HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Kiểm tra sự tồn tại của API Key
  const checkApiKey = () => {
    const provider = (localStorage.getItem(STORAGE_KEYS.PROVIDER) as AiProvider) || 'gemini';
    const key =
      provider === 'gemini'
        ? localStorage.getItem(STORAGE_KEYS.GEMINI_KEY)
        : localStorage.getItem(STORAGE_KEYS.AGENT_PLATFORM_KEY);
    setHasApiKey(Boolean(key && key.trim().length >= 8));
  };

  useEffect(() => {
    checkApiKey();
  }, []);

  const handleConsultAi = (scenarioTitle: string) => {
    setAdvisorScenario(scenarioTitle);
    setActiveTab('advisor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Thanh Điều hướng Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'ebook' && <EbookReader onConsultAi={handleConsultAi} />}

        {activeTab === 'radar' && (
          <RealtimeScamRadar
            onOpenApiModal={() => setIsApiModalOpen(true)}
            hasApiKey={hasApiKey}
          />
        )}

        {activeTab === 'advisor' && (
          <ScamAdvisor
            onOpenApiModal={() => setIsApiModalOpen(true)}
            hasApiKey={hasApiKey}
            initialScenario={advisorScenario}
          />
        )}

        {activeTab === 'quiz' && <ScamQuiz />}

        {activeTab === 'hotlines' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <div className="rounded-3xl bg-gradient-to-br from-rose-900 via-slate-900 to-red-950 p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold w-fit mb-3">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Kênh Tiếp Nhận Hỗ Trợ 24/7</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Đường Dây Nóng Khẩn Cấp & Quy Trình Ứng Phó
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Khi phát hiện hoặc đã lỡ chuyển tiền cho các đối tượng lừa đảo, hãy giữ bình tĩnh và thực hiện ngay các bước ứng phó khẩn cấp bên dưới để hạn chế tối đa thiệt hại!
              </p>
            </div>

            {/* Các bước xử lý khẩn cấp */}
            <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" />
                <span>3 BƯỚC VÀNG CẦN LÀM NGAY KHI VỪA BỊ LỪA ĐẢO / MẤT TÀI KHOẢN:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-rose-600 text-white font-bold text-sm flex items-center justify-center">1</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khóa khẩn cấp tài khoản ngân hàng</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Vào ngay app ngân hàng bấm tính năng Khóa thẻ / Khóa dịch vụ thẻ, hoặc gọi tổng đài ngân hàng yêu cầu phong tỏa tài khoản khẩn cấp để ngăn tiền bị chuyển tiếp.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-bold text-sm flex items-center justify-center">2</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thu thập & Lưu giữ bằng chứng</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Chụp lại toàn bộ tin nhắn, số điện thoại kẻ gian, số tài khoản nhận tiền, biên lai chuyển khoản ngân hàng (sao kê giao dịch có dấu đỏ). Tuyệt đối không xóa lịch sử trò chuyện.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-sky-600 text-white font-bold text-sm flex items-center justify-center">3</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Trình báo Cơ quan Công an</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Đến ngay Công an phường/xã hoặc Công an quận/huyện gần nhất để làm Đơn trình báo tố giác tội phạm. Không tìm các dịch vụ 'lấy lại tiền' trên mạng để tránh bị lừa đảo kép.
                  </p>
                </div>
              </div>
            </div>

            {/* Danh bạ Đường dây nóng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOTLINES.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2"
                >
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">
                    {h.name}
                  </span>
                  {h.number ? (
                    <a
                      href={`tel:${h.number}`}
                      className="text-2xl font-black text-rose-600 dark:text-rose-400 hover:underline block"
                    >
                      {h.number}
                    </a>
                  ) : (
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>canhbao.khonggianmang.vn</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-300">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Cài đặt API Key */}
      <ApiSettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onSaved={checkApiKey}
      />
    </div>
  );
};

export default App;
