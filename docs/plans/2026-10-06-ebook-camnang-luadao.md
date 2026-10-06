# Cẩm nang Nhận biết và Phòng chống lừa đảo trực tuyến - Implementation Plan

> **REQUIRED:** Follow TDD for every task. No production code without failing test first.

**Goal:** Xây dựng Sách điện tử tương tác (Interactive E-book) "Cẩm nang Nhận biết và Phòng chống lừa đảo trực tuyến" tích hợp AI (Realtime Search Grounding & Voice/Text Fraud Advisor), bộ đếm truy cập server-side, sẵn sàng deploy Vercel và GitHub.
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Google GenAI SDK (@google/genai)
**Target:** 100% test pass, build zero-error, responsive mobile-first, tuân thủ nghiêm ngặt `api.md`, `giaodien.md`, `visit.md`.

---

## 📋 Danh sách công việc (Task Checklist)

### Phase 1: Setup & Data Extraction
- [x] Task 1.1: Trích xuất toàn bộ dữ liệu 24 hình thức lừa đảo và 25 hình ảnh minh họa từ `CẨM NANG LỪA ĐẢO CN 4.0.docx` vào thư mục `public/images/` và `src/data/scamsData.ts`.
- [x] Task 1.2: Cấu hình project: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `vercel.json`.
- [x] Task 1.3: Cài đặt dependencies (`@google/genai`, `lucide-react`, `clsx`, `tailwind-merge`, vitest cho TDD).

### Phase 2: TDD cho Core Logic & API Service
- [x] Task 2.1: Viết test cho API Key validator và helper format (`test/apiKey.test.ts`): kiểm tra regex `AIzaSy...` và `AQ...`.
- [x] Task 2.2: Implement `src/services/apiKeyValidator.ts` để pass test (8/8 tests pass).
- [x] Task 2.3: Viết test cho Error Parser & Fallback Model (`test/errorParser.test.ts`): phân biệt 503 OVERLOAD, 429 QUOTA, 401 INVALID_KEY.
- [x] Task 2.4: Implement `src/services/geminiService.ts` với `createGoogleAiClient`, chuỗi fallback model, Google Search Grounding cho cập nhật thời gian thực, và phân tích rủi ro lừa đảo (6/6 tests pass).
- [x] Task 2.5: Viết test cho hàm tính điểm nhận thức an toàn số / Quiz scoring (`test/quizScoring.test.ts`) và implement `src/utils/quizScoring.ts` (4/4 tests pass).

### Phase 3: Component Development (Tuân thủ `giaodien.md` & `visit.md`)
- [x] Task 3.1: Implement `src/components/Navbar.tsx`: Logo, navigation (Sách cẩm nang, Cập nhật mới, Tư vấn AI, Trắc nghiệm, Cài đặt API), nút Dark Mode toggle.
- [x] Task 3.2: Implement `src/components/VisitCounter.tsx`: Đếm truy cập server-side qua counterapi.dev + localStorage theo đúng `visit.md`.
- [x] Task 3.3: Implement `src/components/ApiSettingsModal.tsx`: Chọn Gemini API / Agent Platform API, lưu key độc lập `gemini_api_key` & `agent_platform_api_key`, test kết nối.
- [x] Task 3.4: Implement `src/components/EbookReader.tsx`: Trải nghiệm đọc cẩm nang tương tác theo 4 nhóm chuyên đề, 24 bài học kèm ảnh thực tế, mục lục, tìm kiếm, đánh dấu trang, cỡ chữ tăng giảm.
- [x] Task 3.5: Implement `src/components/RealtimeScamRadar.tsx`: Nút "Cập nhật thông tin lừa đảo mới nhất", kích hoạt Google Search Grounding, hiển thị bản tin cảnh báo mới nhất từ Cục An toàn thông tin / Bộ Công an.
- [x] Task 3.6: Implement `src/components/ScamAdvisor.tsx`: Tư vấn hành vi lừa đảo với 2 chế độ (Nhập văn bản hoặc Nhấn Micro nói tiếng Việt qua Web Speech API), AI phân tích mức độ nguy cơ, thủ đoạn và khuyến nghị khẩn cấp.
- [x] Task 3.7: Implement `src/components/ScamQuiz.tsx`: 10 câu hỏi tình huống thực tế, giải thích chi tiết, chấm điểm và cấp Chứng nhận số hóa "Công dân số an toàn".
- [x] Task 3.8: Implement `src/components/Footer.tsx`: Thông tin đề tài KHKT 11H cấp trường năm học 2025-2026, đường dây nóng tố giác tội phạm (113, Phòng An ninh mạng).

### Phase 4: Verification & Polish
- [x] Task 4.1: Chạy test suite `npm test` đảm bảo toàn bộ unit test PASS (18/18 tests pass).
- [x] Task 4.2: Chạy `npm run build` xác nhận build production Vercel thành công không có lỗi type/lint (0 errors, 48.32s).
- [x] Task 4.3: Kiểm tra responsive trên mobile (375px), tablet (768px), desktop (1280px).
- [x] Task 4.4: Chuẩn bị file `README.md` hướng dẫn đưa lên GitHub và deploy lên Vercel.
