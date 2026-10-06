export interface QuizQuestion {
  id: number;
  text: string;
  scenario?: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string; // BẮT BUỘC theo SKILL 1.md
  hint?: string;
  category: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Thủ đoạn Deepfake",
    text: "Bạn nhận được cuộc gọi video từ một người bạn thân qua Facebook. Hình ảnh bạn nói ngập ngừng, âm thanh rè rè xin mượn gấp 5 triệu chữa bệnh và cúp máy ngay vì bảo 'sóng yếu'. Bạn nên làm gì?",
    options: [
      "Chuyển tiền ngay vì đã thấy rõ mặt và giọng nói của bạn mình qua video call.",
      "Lập tức gọi lại bằng cuộc gọi thoại trực tiếp qua số thuê bao di động hoặc gặp mặt trực tiếp để xác minh.",
      "Nhắn tin hỏi số tài khoản rồi chuyển khoản ngay cho kịp chữa bệnh.",
      "Chuyển trước 2 triệu để giúp bạn giải quyết việc gấp."
    ],
    correctAnswer: 1,
    explanation: "Đây là thủ đoạn lừa đảo Deepfake điển hình: Kẻ gian dùng AI giả khuôn mặt và giọng nói, lấy cớ sóng yếu để tắt nhanh và giục chuyển tiền gấp. Tuyệt đối phải gọi điện thoại trực tiếp qua sóng di động để kiểm chứng!",
    hint: "Hãy cảnh giác với những cuộc gọi video ngắn vài giây và tài khoản nhận tiền không chính chủ."
  },
  {
    id: 2,
    category: "Thủ đoạn Giả danh Công an",
    text: "Một người tự xưng là Cán bộ Điều tra Công an gọi điện, thông báo bạn dính líu đến đường dây rửa tiền ma túy và yêu cầu chuyển 50 triệu vào tài khoản 'tạm giữ' để chứng minh trong sạch. Điều nào sau đây là ĐÚNG?",
    options: [
      "Lập tức ra ngân hàng chuyển tiền để chứng minh mình vô tội theo yêu cầu của đồng chí công an.",
      "Cơ quan Công an KHÔNG BAO GIỜ làm việc qua điện thoại và KHÔNG BAO GIỜ yêu cầu công dân chuyển tiền để chứng minh vô tội.",
      "Gửi ảnh 2 mặt CCCD và mật khẩu ngân hàng qua Zalo cho cán bộ kiểm tra.",
      "Xin cán bộ giảm bớt số tiền nộp kiểm tra vì gia đình khó khăn."
    ],
    correctAnswer: 1,
    explanation: "Cơ quan Công an, Viện kiểm sát, Tòa án chỉ làm việc trực tiếp tại trụ sở thông qua Giấy mời hoặc Giấy triệu tập hợp pháp, KHÔNG BAO GIỜ làm việc qua điện thoại/Zalo và KHÔNG BAO GIỜ yêu cầu chuyển tiền!",
    hint: "Cơ quan nhà nước có bao giờ bắt công dân chuyển tiền vào tài khoản cá nhân không?"
  },
  {
    id: 3,
    category: "Thủ đoạn SMS Brandname giả",
    text: "Điện thoại của bạn nhận được tin nhắn từ hộp thư mang tên 'VIETCOMBANK' với nội dung: 'Tài khoản của bạn phát sinh rủi ro, vui lòng đăng nhập http://vcb-digibank.top để xác minh'. Bạn nên xử lý thế nào?",
    options: [
      "Bấm vào link ngay để kịp bảo vệ tài khoản ngân hàng của mình.",
      "Nhập tên đăng nhập, mật khẩu và mã OTP để kiểm tra số dư.",
      "Tuyệt đối KHÔNG bấm vào link lạ, vì đây là tin nhắn từ trạm phát sóng BTS giả mạo chèn luồng tin nhắn ngân hàng.",
      "Chụp ảnh tin nhắn gửi cho bạn bè bấm vào link thử xem có đúng không."
    ],
    correctAnswer: 2,
    explanation: "Kẻ gian dùng trạm phát sóng BTS 2G giả mạo phát tán tin nhắn mạo danh Brandname ngân hàng. Các ngân hàng chính thống tại Việt Nam KHÔNG BAO GIỜ gửi tin nhắn kèm đường link bắt đăng nhập hay cung cấp mã OTP!",
    hint: "Kiểm tra kỹ đuôi tên miền, ngân hàng thật luôn dùng tên miền chính thức .com.vn hoặc .vn."
  },
  {
    id: 4,
    category: "Thủ đoạn Con đang cấp cứu",
    text: "Phụ huynh nhận được cuộc gọi từ người tự xưng giáo viên báo: 'Con anh/chị ngã cầu thang bất tỉnh, đang mổ cấp cứu ở bệnh viện, cần chuyển gấp 20 triệu viện phí'. Phụ huynh cần làm gì đầu tiên?",
    options: [
      "Chuyển tiền ngay lập tức vào số tài khoản cá nhân mà người gọi cung cấp.",
      "Bình tĩnh, lập tức gọi điện trực tiếp cho Giáo viên chủ nhiệm hoặc Ban Giám hiệu nhà trường để kiểm tra tình trạng của con.",
      "Đăng bài lên Facebook cầu cứu mọi người chuyển tiền hộ.",
      "Hoảng sợ chạy ngay ra ngân hàng rút hết tiền tiết kiệm."
    ],
    correctAnswer: 1,
    explanation: "Đây là chiêu trò thao túng tâm lý hoảng loạn phụ huynh. Bệnh viện luôn cấp cứu tính mạng bệnh nhân trước, không vì chưa chuyển tiền mà từ chối. Hãy bình tĩnh liên hệ ngay với thầy cô giáo chủ nhiệm để xác minh!",
    hint: "Kẻ xấu muốn bạn hoảng sợ để không kịp kiểm chứng thông tin."
  },
  {
    id: 5,
    category: "Thủ đoạn Tuyển CTV Online",
    text: "Bạn thấy thông báo tuyển 'Cộng tác viên Shopee giật đơn hưởng hoa hồng 20%, làm việc tại nhà kiếm 500k/ngày'. Sau khi nạp 200k làm đơn đầu tiên được hoàn 240k, kẻ gian yêu cầu bạn nạp 10 triệu để làm đơn VIP. Bạn nên làm gì?",
    options: [
      "Đi vay bạn bè nạp ngay 10 triệu để nhận hoa hồng 2 triệu đồng.",
      "Dừng lại ngay lập tức và chặn liên lạc, vì đây là cái bẫy 'thả con săn sắt, bắt con cá rô' của lừa đảo CTV.",
      "Nạp thêm 5 triệu xin làm nửa nhiệm vụ VIP.",
      "Giới thiệu thêm bạn cùng lớp vào nạp tiền để cùng hưởng hoa hồng."
    ],
    correctAnswer: 1,
    explanation: "Sàn thương mại điện tử không có chính sách tuyển CTV nạp tiền cá nhân để thanh toán đơn hàng. Số tiền nhỏ ban đầu là mồi nhử; khi nạn nhân nạp số tiền lớn sẽ bị khóa hệ thống và chiếm đoạt toàn bộ!",
    hint: "Không có công việc nào 'việc nhẹ lương cao' mà không cần kiến thức hay kỹ năng."
  },
  {
    id: 6,
    category: "Thủ đoạn Chuyển nhầm tiền",
    text: "Bỗng nhiên tài khoản ngân hàng của bạn nhận được 10 triệu đồng từ một người hoàn toàn xa lạ. Sau đó có người gọi đến nhận là chuyển nhầm và xin bạn chuyển trả lại vào số tài khoản khác. Cách xử lý an toàn nhất là gì?",
    options: [
      "Rút tiền ra tiêu ngay vì coi như 'lộc trời cho'.",
      "Chuyển ngay tiền lại vào số tài khoản mà người gọi cung cấp qua điện thoại.",
      "Không động vào số tiền đó, ra quầy giao dịch chi nhánh ngân hàng của mình để nhờ tra soát và hoàn tiền chính thống.",
      "Bấm vào đường link mà người đó gửi qua Zalo để 'xác nhận hủy lệnh chuyển tiền'."
    ],
    correctAnswer: 2,
    explanation: "Nếu tự ý chuyển lại vào tài khoản thứ ba, bạn có thể trở thành cầu nối rửa tiền hoặc dính vào bẫy đòi nợ vay lãi nặng giả mạo. Hãy để ngân hàng thực hiện tra soát hoàn trả đúng quy trình!",
    hint: "Ngân hàng là đơn vị duy nhất có thẩm quyền tra soát và chuyển trả tiền an toàn."
  },
  {
    id: 7,
    category: "Thủ đoạn Trang Web Giả mạo VNeID",
    text: "Người lạ hướng dẫn bạn cài đặt ứng dụng Dịch vụ công hoặc VNeID bản nâng cấp bằng cách gửi đường link tải tệp tin có đuôi '.apk' về điện thoại Android. Bạn có nên cài đặt không?",
    options: [
      "Nên cài đặt ngay để được kích hoạt định danh mức 2 nhanh chóng.",
      "TUYỆT ĐỐI KHÔNG cài đặt, vì tệp tin .apk từ link ngoài chứa mã độc chiếm quyền điều khiển điện thoại và rút tiền ngân hàng.",
      "Cài đặt rồi xóa ngay thì sẽ không sao.",
      "Chỉ cấp quyền Trợ năng (Accessibility) thì không lo bị mất tiền."
    ],
    correctAnswer: 1,
    explanation: "Ứng dụng cơ quan nhà nước chỉ phát hành trên kho ứng dụng chính thức (Google Play, App Store). Các file .apk từ link lạ chứa mã độc theo dõi bàn phím, đọc OTP và chiếm quyền điều khiển tài khoản ngân hàng!",
    hint: "Tuyệt đối không bao giờ cài file .apk lạ từ mạng xã hội."
  },
  {
    id: 8,
    category: "Thủ đoạn Dịch vụ Lấy lại tiền",
    text: "Sau khi bị lừa mất 50 triệu qua sàn đầu tư ảo, bạn thấy một trang Facebook 'Văn phòng An ninh mạng hỗ trợ thu hồi tiền lừa đảo' cam kết lấy lại tiền trong 24h với phí cọc 5 triệu. Bạn nên làm gì?",
    options: [
      "Chuyển 5 triệu phí cọc ngay để kịp thời lấy lại 50 triệu đồng đã mất.",
      "Cảnh giác tối đa, đây là chiêu trò 'lừa đảo kép' đánh vào tâm lý muốn gỡ gạc của nạn nhân; cơ quan chức năng không thu phí qua mạng.",
      "Cung cấp toàn bộ mật khẩu và sao kê tài khoản cho trang Facebook đó.",
      "Nhờ người này định vị hacker để đòi lại tiền."
    ],
    correctAnswer: 1,
    explanation: "Cơ quan Công an KHÔNG BAO GIỜ lập trang Facebook nhận thu hồi tiền lừa đảo và KHÔNG BAO GIỜ thu phí dịch vụ. Mọi dịch vụ 'lấy lại tiền' trên mạng 100% là kẻ lừa đảo bẫy lần hai!",
    hint: "Đừng để bị lừa thêm một lần nữa khi đang trong trạng thái bối rối."
  },
  {
    id: 9,
    category: "Thủ đoạn Bảo vệ CCCD",
    text: "Có nhóm người lạ đến gần cổng trường học hứa tặng mỗi bạn học sinh 1 chiếc áo thun và 50.000 đồng nếu cho họ chụp ảnh 2 mặt Căn cước công dân (CCCD) và quay video nhận diện khuôn mặt. Bạn nên làm gì?",
    options: [
      "Cho chụp ngay vì chụp ảnh thôi thì không mất gì mà lại được quà.",
      "Rủ thêm các bạn cùng lớp ra chụp để cùng nhận quà.",
      "Từ chối dứt khoát và báo ngay cho Ban Giám hiệu, vì ảnh CCCD và video khuôn mặt có thể bị lợi dụng để mở tài khoản rác và vay nợ tín dụng.",
      "Chỉ cho chụp mặt trước, không cho chụp mặt sau."
    ],
    correctAnswer: 2,
    explanation: "Ảnh 2 mặt CCCD và sinh trắc học khuôn mặt là dữ liệu định danh cá nhân tối quan trọng. Kẻ gian dùng để mở tài khoản ngân hàng ảo, đăng ký SIM rác hoặc vay nợ qua các app tín dụng đen, để lại nợ xấu cho bạn!",
    hint: "Thông tin cá nhân có giá trị hơn rất nhiều so với những món quà nhỏ."
  },
  {
    id: 10,
    category: "Thủ đoạn Mật khẩu & 2FA",
    text: "Biện pháp nào sau đây là biện pháp phòng chống lừa đảo trực tuyến CƠ BẢN và QUAN TRỌNG NHẤT đối với mỗi học sinh khi dùng mạng xã hội?",
    options: [
      "Dùng một mật khẩu duy nhất là ngày sinh nhật cho tất cả tài khoản Facebook, Zalo, Gmail để dễ nhớ.",
      "Bật xác thực 2 lớp (2FA) qua ứng dụng tạo mã, không bấm link lạ, và không chia sẻ mã OTP cho bất kỳ ai.",
      "Lưu mật khẩu vào mục ghi chú công khai trên trang cá nhân.",
      "Chia sẻ tài khoản cho bạn thân để dùng chung khi cần thiết."
    ],
    correctAnswer: 1,
    explanation: "Quy tắc an toàn số cốt lõi: Luôn bật xác thực 2 yếu tố (2FA), đặt mật khẩu mạnh khác nhau cho từng dịch vụ, và tuyệt đối không bao giờ chia sẻ mã OTP với bất kỳ ai!",
    hint: "Bảo vệ hai lớp là chiếc chìa khóa vững chắc nhất cho tài khoản số."
  }
];
