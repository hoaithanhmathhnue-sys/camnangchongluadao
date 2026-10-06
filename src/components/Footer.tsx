import React from 'react';
import { ShieldCheck, PhoneCall, Globe, Heart, ExternalLink, School } from 'lucide-react';
import { HOTLINES } from '../data/scamsData';
import { VisitCounter } from './VisitCounter';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-950/70 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Hộp Thông tin Đường dây nóng */}
        <div className="rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4 text-rose-600 dark:text-rose-400 font-bold text-sm sm:text-base">
            <PhoneCall className="w-5 h-5 shrink-0" />
            <h3>ĐƯỜNG DÂY NÓNG TIẾP NHẬN PHẢN ÁNH & TỐ GIÁC TỘI PHẠM CÔNG NGHỆ CAO</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOTLINES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800/80 shadow-2xs space-y-1.5"
              >
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {item.name}
                </span>
                {item.number ? (
                  <a
                    href={`tel:${item.number}`}
                    className="text-lg font-black text-rose-600 dark:text-rose-400 hover:underline block tracking-wide"
                  >
                    {item.number}
                  </a>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>khonggianmang.vn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin Đề tài KHKT 11H */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-slate-800 dark:text-slate-200 text-sm">
              <School className="w-4 h-4 text-sky-500" />
              <span>Dự Án Nghiên Cứu Khoa Học Kỹ Thuật (KHKT) Dành Cho Học Sinh Trung Học</span>
            </div>
            <p>
              Đề tài: “Giải pháp nâng cao nhận thức và kỹ năng nhận diện, phòng chống lừa đảo trực tuyến trong kỷ nguyên số 4.0”
            </p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Nhóm tác giả: Học sinh Lớp 11H — Trường THPT Khúc Thừa Dụ (Năm học 2026 - 2027)
            </p>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <span>Sản phẩm ứng dụng phi thương mại vì an toàn cộng đồng</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
            <p className="text-[11px] text-slate-400">
              Tích hợp Google GenAI SDK & Google Search Grounding thời gian thực
            </p>
          </div>
        </div>

        {/* Bộ đếm Truy cập Server-side (theo visit.md) */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
};
