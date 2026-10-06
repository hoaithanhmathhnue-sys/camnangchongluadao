# 🛡️ CẨM NANG NHẬN BIẾT VÀ PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN 4.0
### Sách Điện Tử Tương Tác (Interactive E-Book) Tích Hợp Trí Tuệ Nhân Tạo (AI)
> **Dự án Nghiên cứu Khoa học Kỹ thuật (KHKT) Dành cho Học sinh Trung học — Năm học 2025 - 2026**  
> **Đơn vị:** Nhóm học sinh Lớp 11H — Trường THPT Khúc Thừa Dụ (Ninh Giang, Hải Dương)

---

## 🌟 TỔNG QUAN DỰ ÁN

Sản phẩm được xây dựng dưới dạng **Sách điện tử tương tác (Interactive E-Book)** hiện đại, kết hợp sức mạnh của **Trí tuệ nhân tạo (Google Gemini & Google Search Grounding)** nhằm nâng cao nhận thức, trang bị kỹ năng nhận diện và phản xạ ứng phó trước 24 thủ đoạn lừa đảo công nghệ cao phổ biến nhất hiện nay cho học sinh, phụ huynh và cộng đồng.

---

## 🚀 CÁC TÍNH NĂNG NỔI BẬT

### 1. 📖 E-Book Tương Tác 24 Bài Học Toàn Diện
- Phân chia thành **4 Chương lớn** dựa trên báo cáo đề tài KHKT 11H:
  - **Chương 1:** Thủ đoạn ứng dụng công nghệ viễn thông & Trí tuệ nhân tạo (Deepfake, khóa SIM, SMS Brandname giả, bill giả, OTP Telegram...).
  - **Chương 2:** Thao túng tâm lý khẩn cấp & Giả danh tổ chức uy tín (Công an, Tòa án, giáo viên/bác sĩ báo cấp cứu, web VNeID/BHXH giả...).
  - **Chương 3:** Bẫy tài chính, việc làm & kinh tế online (Tuyển CTV việc nhẹ lương cao, sàn đầu tư ảo, app tín dụng đen, lừa sang Campuchia...).
  - **Chương 4:** Bẫy đánh cắp danh tính & Lừa đảo kép (Hack Facebook/Zalo vay tiền, rải link phishing, chuyển nhầm tiền, lừa dịch vụ lấy lại tiền...).
- **25 hình ảnh minh họa thực tế sắc nét** trích xuất từ cẩm nang gốc, hỗ trợ phóng to (zoom preview).
- **Bộ lọc tìm kiếm tức thì**, đánh dấu bài đã đọc (Bookmark), thanh tiến trình đọc, tùy chỉnh 3 cỡ chữ (Vừa, Lớn, Rất Lớn) và hỗ trợ Dark Mode.

### 2. 📡 Radar Lừa Đảo Mới (Real-time AI Search Grounding)
- Nút bấm **"Cập nhật thông tin lừa đảo"**: Tự động kích hoạt công cụ tìm kiếm **Google Search Grounding** kết hợp cùng mô hình **Gemini 3.6 Flash / 3.5 Flash**.
- Quét và tổng hợp các cảnh báo khẩn cấp, thủ đoạn mới phát sinh tại Việt Nam trong vòng 30–60 ngày từ Bộ Công an, Cục An toàn thông tin, VTV, VnExpress...

### 3. 🛡️ Trợ Lý Tư Vấn Hành Vi Lừa Đảo (Văn Bản & Giọng Nói)
- Người dùng có thể **gõ văn bản** hoặc **bấm Micro nói trực tiếp bằng tiếng Việt** (Web Speech API).
- AI phân tích chuyên sâu:
  - 🎯 Kết luận mức độ rủi ro (An toàn - Đáng ngờ - Cực kỳ nguy hiểm).
  - 🔍 Thang đo nguy vấn lừa đảo (0% - 100%) và thủ đoạn tương ứng trong cẩm nang.
  - ⚠️ Cờ đỏ cảnh báo phát hiện trong nội dung.
  - 🛡️ 3 hành động khẩn cấp cần làm ngay và đường dây nóng hỗ trợ (113, 156, A05).

### 4. ✍️ Khảo Sát & Trắc Nghiệm Nhận Thức (Quiz)
- Bộ 10 câu hỏi tình huống thực tế có giải thích chi tiết đáp án và gợi ý suy luận theo chuẩn `SKILL 1.md`.
- Chấm điểm tự động; đạt từ 70% trở lên sẽ kích hoạt hiệu ứng pháo hoa và cấp **Giấy Chứng Nhận Số Hóa "Công dân số an toàn 4.0"** mang tên người học.

### 5. 📊 Bộ Đếm Truy Cập Server-Side (Visit Counter)
- Đếm tổng lượt truy cập thực tế của toàn bộ người dùng từ server qua `counterapi.dev`, kết hợp theo dõi cá nhân trong ngày (theo đúng tài liệu `visit.md`).

### 6. ⚙️ Cấu Hình API Key Chuẩn Mực (`api.md` v4.1)
- Hỗ trợ cả **Gemini API** và **Agent Platform API** với bộ lưu trữ key độc lập (`gemini_api_key` & `agent_platform_api_key`).
- Chấp nhận cả key cũ `AIzaSy...` và định dạng key mới `AQ...`.
- Tích hợp chuỗi Fallback Model tự động chống lỗi quá tải 503 (`gemini-3.6-flash` ➔ `gemini-3.5-flash` ➔ `gemini-3.5-flash-lite` ➔ `gemini-3.1-flash-lite` ➔ `gemini-2.5-flash`).

---

## 💻 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN CỤC BỘ (LOCAL)

Yêu cầu máy tính đã cài đặt **Node.js** (khuyến nghị phiên bản 18, 20 hoặc 22).

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

Mở trình duyệt truy cập: `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

```bash
# Chạy kiểm thử tự động (Unit Tests)
npm test

# Build kiểm tra đóng gói cho production
npm run build
```

---

## 📤 HƯỚNG DẪN ĐƯA LÊN GITHUB

Mở Terminal tại thư mục dự án và thực hiện các lệnh sau:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả tệp vào git
git add .

# Tạo commit đầu tiên
git commit -m "feat: Sách điện tử tương tác Cẩm nang phòng chống lừa đảo 4.0 KHKT 11H"

# Tạo nhánh chính main
git branch -M main

# Liên kết với repository GitHub của bạn (thay bằng URL repo của bạn)
# git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git

# Đẩy code lên GitHub
# git push -u origin main
```

---

## 🌐 HƯỚNG DẪN DEPLOY QUA VERCEL.COM (0 LỖI)

Dự án đã được cấu hình sẵn tệp `vercel.json` tối ưu cho Vite Single Page Application (SPA), đảm bảo khi người dùng tải lại trang không bị lỗi 404.

### Cách 1: Deploy trực tiếp qua Giao diện Web Vercel (Khuyên dùng - Cực dễ)
1. Đăng nhập vào [vercel.com](https://vercel.com) (bằng tài khoản GitHub của bạn).
2. Bấm nút **"Add New..."** ➔ Chọn **"Project"**.
3. Chọn Repository GitHub chứa dự án cẩm nang vừa đẩy lên.
4. Tại mục **Build and Output Settings**, Vercel sẽ tự động nhận diện:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Bấm nút **"Deploy"** và chờ khoảng 30–45 giây.
6. Trang web của bạn sẽ chính thức hoạt động trên đường link miễn phí dạng: `https://<ten-du-an>.vercel.app`.

### Cách 2: Deploy qua Vercel CLI (Dòng lệnh)
```bash
npm install -g vercel
vercel
vercel --prod
```

---

## 🛡️ ĐƯỜNG DÂY NÓNG KHẨN CẤP
- **Cảnh sát phản ứng nhanh:** `113`
- **Tổng đài phản ánh cuộc gọi & tin nhắn rác, lừa đảo (Cục An toàn thông tin - Bộ TTTT):** `156`
- **Cục An ninh mạng và Phòng chống tội phạm sử dụng CNC - Bộ Công an (A05):** `069.234.8560`
- **Cổng thông tin Không gian mạng quốc gia:** [canhbao.khonggianmang.vn](https://canhbao.khonggianmang.vn)
