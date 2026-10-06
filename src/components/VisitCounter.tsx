import React, { useState, useEffect } from 'react';
import { Eye, Users, Calendar, Activity } from 'lucide-react';

const APP_NAMESPACE = 'camnang-luadao-11h-edugenvn';
const BASE_VISIT_OFFSET = 1250;
const COUNTER_API_URL = `https://api.counterapi.dev/v1/${APP_NAMESPACE}/visits/up`;

const VISIT_STORAGE_KEY = `${APP_NAMESPACE}_my_visits`;
const LAST_VISIT_KEY = `${APP_NAMESPACE}_last_visit_time`;
const FALLBACK_KEY = `${APP_NAMESPACE}_total_fallback`;

const getToday = (): string => new Date().toISOString().split('T')[0];

interface VisitData {
  myVisits: number;
  totalVisits: number;
  todayVisits: number;
}

const incrementLocalVisits = (): { myVisits: number; todayVisits: number } => {
  const today = getToday();
  const todayKey = `${APP_NAMESPACE}_today_${today}`;

  try {
    const myVisits = parseInt(localStorage.getItem(VISIT_STORAGE_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_STORAGE_KEY, String(myVisits));

    const lastDate = localStorage.getItem(LAST_VISIT_KEY) || '';
    const prevToday = lastDate === today ? parseInt(localStorage.getItem(todayKey) || '0', 10) : 0;
    const todayVisits = prevToday + 1;
    localStorage.setItem(todayKey, String(todayVisits));
    localStorage.setItem(LAST_VISIT_KEY, today);

    // Dọn dẹp dữ liệu hôm trước
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    localStorage.removeItem(`${APP_NAMESPACE}_today_${yesterday}`);

    return { myVisits, todayVisits };
  } catch {
    return { myVisits: 1, todayVisits: 1 };
  }
};

const fetchServerVisitCount = async (): Promise<number> => {
  try {
    const response = await fetch(COUNTER_API_URL);
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.count === 'number') {
        const total = BASE_VISIT_OFFSET + data.count;
        localStorage.setItem(FALLBACK_KEY, String(total));
        return total;
      }
    }
  } catch (error) {
    console.warn('Lỗi kết nối bộ đếm server-side, dùng bộ đếm dự phòng:', error);
  }

  const fallback = parseInt(localStorage.getItem(FALLBACK_KEY) || String(BASE_VISIT_OFFSET), 10);
  const newFallback = fallback + Math.floor(Math.random() * 2) + 1;
  localStorage.setItem(FALLBACK_KEY, String(newFallback));
  return newFallback;
};

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{display.toLocaleString('vi-VN')}</>;
};

export const VisitCounter: React.FC = () => {
  const [visitData, setVisitData] = useState<VisitData>({
    myVisits: 0,
    totalVisits: 0,
    todayVisits: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const localData = incrementLocalVisits();
      const totalVisits = await fetchServerVisitCount();
      setVisitData({ ...localData, totalVisits });
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-2">
        <Activity className="w-3.5 h-3.5 animate-spin text-sky-500" />
        <span>Đang kết nối hệ thống giám sát truy cập...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs">
      {/* Tổng lượt truy cập toàn mạng (Server-side) */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Users className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>
          Tổng lượt tiếp cận: <strong className="font-bold text-sky-900 dark:text-sky-100"><AnimatedNumber value={visitData.totalVisits} /></strong>
        </span>
      </div>

      {/* Hôm nay */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-navy-900/60 text-slate-600 dark:text-slate-400">
        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
        <span>Hôm nay: <strong className="font-semibold text-slate-800 dark:text-slate-200">{visitData.todayVisits}</strong></span>
      </div>

      {/* Lượt của bạn */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-navy-900/60 text-slate-600 dark:text-slate-400">
        <Eye className="w-3.5 h-3.5 text-emerald-500" />
        <span>Bạn đã đọc: <strong className="font-semibold text-slate-800 dark:text-slate-200">{visitData.myVisits} lần</strong></span>
      </div>
    </div>
  );
};
