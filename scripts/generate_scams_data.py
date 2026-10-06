import os
import sys

# Ensure src/data directory exists
os.makedirs('src/data', exist_ok=True)

scams_data_content = '''export interface ScamTopic {
  id: number;
  title: string;
  chapter: 1 | 2 | 3 | 4;
  chapterTitle: string;
  dangerLevel: 'RẤT NGUY HIỂM' | 'NGUY HIỂM CAO' | 'CẢNH GIÁC CAO';
  image: string;
  shortDesc: string;
  tricks: string[];
  signs: string[];
  prevention: string[];
  caseStudy: string;
}

export const CHAPTERS = [
  {
    id: 1,
    title: "Thủ đoạn ứng dụng công nghệ viễn thông & Trí tuệ nhân tạo (AI)",
    description: "Các đối tượng triệt để lợi dụng công nghệ Deepfake giả mặt/giọng, trạm phát sóng BTS giả mạo, chiếm quyền SIM và OTP viễn thông.",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 2,
    title: "Thao túng tâm lý khẩn cấp và Giả danh cơ quan, tổ chức uy tín",
    description: "Đánh vào nỗi sợ hãi, tình cảm gia đình bằng cách giả danh Công an, Tòa án, Viện kiểm sát, giáo viên, nhân viên y tế cấp cứu.",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    gradient: "from-rose-600 to-red-600"
  },
  {
    id: 3,
    title: "Bẫy tài chính, việc làm và kinh tế trực tuyến",
    description: "Đánh vào lòng tham và nhu cầu kiếm tiền: tuyển CTV việc nhẹ lương cao, sàn đầu tư ảo, app tín dụng đen, lừa bán số đề, lừa sang Campuchia.",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    gradient: "from-amber-600 to-orange-600"
  },
  {
    id: 4,
    title: "Bẫy đánh cắp danh tính và Lừa đảo thứ cấp (Lừa kép)",
    description: "Thu thập CCCD, hack mạng xã hội, rải link phishing, chuyển nhầm tiền ép vay và giả danh luật sư/an ninh mạng hỗ trợ thu hồi tiền bị lừa.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-600 to-teal-600"
  }
];

export const SCAMS_DATA: ScamTopic[] = [
  // --- CHƯƠNG 1 ---
  {
    id: 1,
    title: "Lừa đảo cuộc gọi video Deepfake",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_02.jpeg",
    shortDesc: "Kẻ xấu sử dụng công nghệ AI quét khuôn mặt và giọng nói của người thân, bạn bè gọi điện trong vài giây với bối cảnh mạng yếu để vay tiền gấp.",
    tricks: [
      "Thu thập hình ảnh, video clip, âm thanh giọng nói công khai trên mạng xã hội của nạn nhân.",
      "Sử dụng phần mềm Trí tuệ nhân tạo (AI) sao chép chân dung và tổng hợp giọng nói để gọi video call.",
      "Cuộc gọi thường diễn ra rất ngắn (vài giây đến vài chục giây), viện cớ sóng yếu, đường truyền chập chờn để cúp máy ngay.",
      "Yêu cầu chuyển tiền khẩn cấp vào tài khoản trung gian hoặc tài khoản lạ với lý do đang cấp cứu hoặc cần việc gấp."
    ],
    signs: [
      "Khuôn mặt người gọi có cử động giật lag, thiếu tự nhiên, bờ môi không khớp lời nói.",
      "Mắt không chớp tự nhiên, màu da khuôn mặt lệch so với vùng cổ và phông nền.",
      "Âm thanh có tiếng vang kim loại hoặc đứt quãng bất thường.",
      "Tài khoản thụ hưởng tiền không mang tên chính chủ người bạn hoặc người thân đó."
    ],
    prevention: [
      "Bình tĩnh, lập tức gọi lại bằng cuộc gọi thoại thông thường (qua sóng di động trực tiếp) hoặc gặp mặt để xác minh.",
      "Đặt câu hỏi mang tính bảo mật gia đình mà chỉ 2 người biết (ký ức chung, tên riêng thân mật).",
      "Tuyệt đối không chuyển tiền vào tài khoản ngân hàng lạ đứng tên người khác.",
      "Hạn chế đăng tải video chất lượng cao lộ rõ biểu cảm mặt và giọng nói quá chi tiết lên chế độ công khai."
    ],
    caseStudy: "Anh T. nhận cuộc gọi video thấy mặt bạn thân xin mượn 30 triệu chữa bệnh gấp. Vì thấy đúng mặt bạn qua video vài giây rồi tắt do mạng yếu, anh T. đã tin tưởng chuyển tiền vào tài khoản bạn nhờ, sau đó mới biết nick bạn bị hack và video là Deepfake."
  },
  {
    id: 2,
    title: "Lừa đảo “khóa SIM” vì chưa chuẩn hóa thuê bao",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_03.jpeg",
    shortDesc: "Mạo danh nhân viên nhà mạng đe dọa khóa SIM 2 chiều trong 2 tiếng, dụ dỗ nạn nhân thao tác cú pháp chuyển hướng cuộc gọi để chiếm đoạt mã OTP.",
    tricks: [
      "Gọi điện xưng là cán bộ Cục Viễn thông hoặc nhân viên các nhà mạng Viettel, VinaPhone, MobiFone.",
      "Thông báo số điện thoại bị khóa 2 chiều vì vi phạm pháp luật hoặc sai thông tin thuê bao.",
      "Hướng dẫn bấm cú pháp USSD chuyển hướng cuộc gọi (như *21*, **21*...) hoặc đổi e-SIM từ xa.",
      "Sau khi chiếm quyền nhận cuộc gọi, kẻ gian bấm 'Quên mật khẩu' ví điện tử, ngân hàng, Facebook để nhận mã OTP đọc qua thoại."
    ],
    signs: [
      "Số gọi đến là số di động lạ hoặc đầu số quốc tế giả danh (+84, số tổng đài ảo).",
      "Tạo áp lực thời gian: 'sẽ bị khóa vĩnh viễn trong 2 tiếng tới'.",
      "Yêu cầu bấm dãy phím lệnh có ký tự * hoặc # mà nhà mạng không bao giờ hướng dẫn qua điện thoại."
    ],
    prevention: [
      "Nhà mạng chính thống không bao giờ gọi điện dọa khóa SIM và ép thao tác cú pháp khẩn cấp.",
      "Kiểm tra thông tin thuê bao chính chủ bằng cách nhắn tin cú pháp TTTB gửi 1414 (hoàn toàn miễn phí).",
      "Đến trực tiếp cửa hàng giao dịch của nhà mạng để chuẩn hóa thông tin nếu có nghi ngờ.",
      "Không bao giờ bấm các cú pháp chuyển hướng cuộc gọi khi người lạ yêu cầu."
    ],
    caseStudy: "Chị H. nghe điện thoại dọa khóa SIM, đã thao tác bấm cú pháp theo hướng dẫn của kẻ mạo danh nhà mạng. Chỉ 10 phút sau, tài khoản ngân hàng liên kết số điện thoại của chị bị trừ sạch 85 triệu đồng vì kẻ gian đã đón trọn mã OTP cuộc gọi."
  },
  {
    id: 3,
    title: "Phát tán tin nhắn giả mạo thương hiệu (SMS Brandname)",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_10.jpeg",
    shortDesc: "Sử dụng trạm phát sóng BTS 2G giả mạo phát tán tin nhắn chèn đúng vào luồng tin nhắn chính thống của ngân hàng, chứa link độc chiếm đoạt tài khoản.",
    tricks: [
      "Sử dụng thiết bị trạm thu phát sóng di động (BTS) giả mạo nhập lậu, gắn trên ô tô hoặc xe máy di chuyển vào khu đông dân cư.",
      "Khai thác lỗ hổng xác thực của sóng 2G để ép điện thoại xung quanh kết nối vào trạm giả.",
      "Gửi tin nhắn mạo danh Brandname thật của các ngân hàng (Vietcombank, ACB, BIDV, Sacombank...).",
      "Nội dung cảnh báo: 'Tài khoản của quý khách bị khóa/đăng nhập bất thường, vui lòng bấm vào link để hủy giao dịch'."
    ],
    signs: [
      "Tin nhắn nằm cùng luồng với tin nhắn thật của ngân hàng nhưng chứa link website lạ (ví dụ: vcb-digibank.top, acb-xacminh.xyz, vietcombank.com.vn-security...).",
      "Văn phong tin nhắn giục giã, đe dọa trừ phí hoặc tài khoản bị xâm nhập.",
      "Link yêu cầu nhập Tên đăng nhập, Mật khẩu và Mã OTP ngân hàng."
    ],
    prevention: [
      "Ngân hàng tại Việt Nam KHÔNG BAO GIỜ gửi tin nhắn chứa link yêu cầu đăng nhập tài khoản hay cung cấp mã OTP.",
      "Tắt chế độ kết nối 2G trên điện thoại (chỉ bật 4G/5G) để giảm nguy cơ dính trạm BTS giả.",
      "Chỉ đăng nhập Internet Banking qua ứng dụng chính thức tải từ App Store / Google Play hoặc gõ trực tiếp tên miền chính thống."
    ],
    caseStudy: "Anh Q. nhận tin nhắn từ đúng hộp thư 'VIETINBANK' báo tài khoản phát sinh giao dịch 20 triệu tại nước ngoài. Hoảng sợ bấm vào đường link trong tin nhắn và nhập OTP, trong vòng 3 phút tài khoản tiết kiệm online 200 triệu của anh bị chuyển đi mất."
  },
  {
    id: 4,
    title: "Giả mạo biên lai chuyển tiền thành công",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "CẢNH GIÁC CAO",
    image: "/images/image_04.jpeg",
    shortDesc: "Dùng các trang web và phần mềm tạo bill ngân hàng giả mạo để lừa nhận hàng hoá hoặc vay tạm tiền mặt của người bán trước khi tiền thực sự vào tài khoản.",
    tricks: [
      "Kẻ lừa đảo đóng vai khách mua hàng số lượng lớn hoặc có giá trị cao.",
      "Đề nghị thanh toán chuyển khoản qua Internet Banking, xin số tài khoản của người bán.",
      "Sử dụng các website chế bill online để làm giả ảnh chụp 'Giao dịch thành công' với số tiền, tên người nhận, thời gian cực kỳ sắc nét.",
      "Viện lý do chuyển khoản liên ngân hàng 24/7 bị nghẽn mạng nên tiền đến chậm, giục người bán giao hàng hoặc mượn thêm tiền mặt."
    ],
    signs: [
      "Người mua liên tục hối thúc bàn giao hàng ngay lập tức sau khi đưa ảnh chụp màn hình chuyển khoản.",
      "Tài khoản người bán (app ngân hàng hoặc tin nhắn OTT) chưa hề có biến động số dư thực tế.",
      "Chữ trên ảnh bill có thể bị lệch pixel, phông chữ khác lạ ở số tiền hoặc mã giao dịch."
    ],
    prevention: [
      "Quy tắc vàng: CHỈ GIAO HÀNG KHI TIỀN ĐÃ NỔ THỰC TẾ TRONG APP NGÂN HÀNG CỦA MÌNH.",
      "Không tin vào ảnh chụp màn hình biên lai chuyển tiền, tin nhắn điện thoại do khách đưa cho xem.",
      "Bật thông báo số dư qua ứng dụng ngân hàng chính thức thay vì chờ đợi tin nhắn SMS."
    ],
    caseStudy: "Chủ cửa hàng điện thoại T. bán chiếc iPhone 15 Pro Max trị giá 30 triệu. Khách chìa ảnh bill Vietcombank chuyển tiền thành công bảo mạng chậm. Vì nể khách và thấy bill rất thật nên anh cho khách mang máy đi. Sau 1 tiếng không thấy tiền về, gọi lại thì số điện thoại đã thuê bao."
  },
  {
    id: 5,
    title: "Lừa đảo tung tin giả về cuộc gọi mất tiền (Flash AI)",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "CẢNH GIÁC CAO",
    image: "/images/image_20.jpeg",
    shortDesc: "Tung tin giả về cuộc gọi nghe máy mất hàng triệu đồng để gây hoang mang, song song với chiêu trò spoofing số điện thoại lạ gọi nhỡ dẫn dụ gọi lại tốn cước quốc tế.",
    tricks: [
      "Phát tán các cảnh báo thất thiệt trên mạng xã hội: 'Nghe cuộc gọi từ số lạ sẽ bị quét mống mắt, trừ sạch tiền trong tài khoản ngân hàng'.",
      "Khai thác tâm lý hoang mang để điều hướng người dùng cài đặt các ứng dụng 'bảo mật' chứa mã độc.",
      "Thực hiện các cuộc gọi nhỡ (nháy máy) 1-2 hồi chuông từ các đầu số quốc tế (+224, +231, +232, +252...) dụ nạn nhân tò mò gọi lại với cước phí cực đắt."
    ],
    signs: [
      "Cuộc gọi nháy máy chớp nhoáng từ đầu số có dấu cộng và mã vùng lạ không thuộc Việt Nam (+84).",
      "Tin nhắn lan truyền vô căn cứ, không có phát ngôn chính thức từ Bộ Công an hay Bộ Thông tin và Truyền thông."
    ],
    prevention: [
      "Cục An toàn thông tin khẳng định: Chỉ nghe cuộc gọi thông thường sẽ KHÔNG THỂ bị mất tiền trong tài khoản ngân hàng (trừ khi tự tay bấm vào link hoặc làm theo hướng dẫn chuyển tiền/cung cấp OTP).",
      "Tuyệt đối không gọi lại các số máy lạ có đầu số quốc tế gọi nhỡ.",
      "Chặn cuộc gọi rác qua tính năng lọc số trên điện thoại thông minh."
    ],
    caseStudy: "Bà M. thấy cuộc gọi nhỡ từ số +224xxx liền bấm gọi lại xem ai gọi. Đầu dây bên kia chỉ phát nhạc chờ không người nói trong 2 phút. Đến cuối tháng, bà bị tính cước viễn thông quốc tế chuyển vùng đặc biệt gần 300.000 đồng."
  },
  {
    id: 6,
    title: "Đánh cắp mã OTP Telegram",
    chapter: 1,
    chapterTitle: "Thủ đoạn công nghệ viễn thông & AI",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_19.jpeg",
    shortDesc: "Mạo danh đội ngũ hỗ trợ Telegram hoặc người quen yêu cầu chụp ảnh màn hình xác thực, vô tình làm lộ mã đăng nhập OTP gửi về máy.",
    tricks: [
      "Tạo tài khoản Telegram mang tên 'Telegram Security', 'Telegram Support' hoặc avatar người thân của nạn nhân.",
      "Nhắn tin báo rằng tài khoản nạn nhân đang bị kẻ khác mạo danh hoặc yêu cầu bầu chọn một cuộc thi.",
      "Yêu cầu nạn nhân chụp ảnh màn hình gửi qua để xác thực.",
      "Đồng thời, kẻ gian ở máy khác thực hiện thao tác đăng nhập số điện thoại nạn nhân. Khi nạn nhân chụp ảnh màn hình, thông báo banner Telegram hiện mã OTP bị chụp dính vào ảnh."
    ],
    signs: [
      "Có người yêu cầu bạn chụp ảnh toàn màn hình điện thoại gửi cho họ.",
      "Telegram gửi tin nhắn chứa mã đăng nhập kèm cảnh báo 'Do not give this code to anyone'.",
      "Tài khoản yêu cầu có tên và logo giống cơ quan quản lý nhưng không có tích xanh chính chủ."
    ],
    prevention: [
      "Bật tính năng xác thực 2 bước (Two-Step Verification / Mật khẩu đám mây) cho Telegram trong phần Cài đặt Bảo mật.",
      "Không bao giờ chia sẻ ảnh chụp màn hình có dính thanh thông báo phía trên điện thoại.",
      "Định kỳ kiểm tra các thiết bị đang đăng nhập trong Settings > Devices và bấm 'Terminate all other sessions' nếu phát hiện máy lạ."
    ],
    caseStudy: "Em L. học sinh lớp 11 nhận tin nhắn từ bạn cùng lớp nhờ chụp màn hình bình chọn ảnh. Khi gửi ảnh màn hình, tin nhắn OTP Telegram của em hiện lên góc trên. Kẻ gian lập tức đăng nhập chiếm nick Telegram của L. rồi nhắn tin vay 5 bạn khác trong lớp mỗi người 2 triệu."
  },

  // --- CHƯƠNG 2 ---
  {
    id: 7,
    title: "Giả danh Công an, Viện kiểm sát, Tòa án gọi điện đe dọa",
    chapter: 2,
    chapterTitle: "Thao túng tâm lý & Giả danh tổ chức uy tín",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_14.jpeg",
    shortDesc: "Dùng phần mềm giả số điện thoại cơ quan thực thi pháp luật, đe dọa nạn nhân liên quan đến đường dây ma túy, rửa tiền và ép chuyển tiền 'bảo lưu điều tra'.",
    tricks: [
      "Sử dụng công nghệ VoIP đổi số hiển thị giống hệt số điện thoại của cơ quan Công an hoặc Tòa án.",
      "Đọc vanh vách họ tên, ngày tháng năm sinh, số CCCD của nạn nhân để tạo lòng tin.",
      "Đe dọa nạn nhân có liên quan đến đường dây rửa tiền, mua bán ma túy quy mô lớn xuyên quốc gia và đã có Lệnh bắt tạm giam.",
      "Gửi ảnh Lệnh bắt có mộc đỏ giả mạo qua Zalo/Telegram; yêu cầu nạn nhân ra nơi vắng vẻ, không được nói cho người nhà vì 'bí mật nghiệp vụ'.",
      "Yêu cầu rút toàn bộ tiền tiết kiệm chuyển vào tài khoản 'Tạm giữ của cơ quan điều tra' để giám định tài chính."
    ],
    signs: [
      "Cuộc gọi xưng là cơ quan Công an làm việc qua điện thoại và mạng xã hội.",
      "Yêu cầu chuyển tiền vào tài khoản cá nhân mang tên một người lạ để 'chứng minh vô tội'.",
      "Cấm liên lạc với người thân, cấm tắt máy, cấm ra ngân hàng hỏi nhân viên."
    ],
    prevention: [
      "KHẮC CỐT GHI TÂM: Cơ quan Công an, Viện kiểm sát, Tòa án KHÔNG BAO GIỜ làm việc với công dân qua điện thoại hoặc mạng xã hội.",
      "Cơ quan chức năng chỉ làm việc trực tiếp tại trụ sở bằng giấy mời hoặc giấy triệu tập có đóng dấu đỏ theo đúng quy định pháp luật.",
      "Cơ quan Công an KHÔNG BAO GIỜ có tài khoản cá nhân và KHÔNG BAO GIỜ yêu cầu công dân chuyển tiền để chứng minh trong sạch.",
      "Khi nhận cuộc gọi dạng này, bình tĩnh cúp máy và báo ngay cho Công an phường/xã gần nhất."
    ],
    caseStudy: "Bà N. (62 tuổi) ở Ninh Giang nhận cuộc gọi từ kẻ tự xưng Thiếu tá công an, dọa bà dính líu vụ án rửa tiền 10 tỷ đồng. Kẻ gian cấm bà nói với các con, ép bà ra ngân hàng tất toán 2 sổ tiết kiệm 450 triệu đồng chuyển vào số tài khoản 'thanh tra'. Rất may nhân viên ngân hàng phát hiện bà hoảng loạn nên kịp thời can thiệp báo công an."
  },
  {
    id: 8,
    title: "Giả danh giáo viên, nhân viên y tế báo người thân đang cấp cứu",
    chapter: 2,
    chapterTitle: "Thao túng tâm lý & Giả danh tổ chức uy tín",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_05.jpeg",
    shortDesc: "Đánh vào tâm lý yêu thương con cái, gọi điện hoảng hốt thông báo con đang mổ cấp cứu ở bệnh viện và thúc ép phụ huynh chuyển tiền viện phí ngay.",
    tricks: [
      "Kẻ gian thu thập trước thông tin trường, lớp, tên học sinh và giáo viên chủ nhiệm.",
      "Gọi điện cho phụ huynh với giọng điệu vô cùng hoảng hốt, gấp gáp: 'Con chị bị ngã cầu thang/tai nạn giao thông chấn thương sọ não, đang cấp cứu'.",
      "Chuyển máy cho một người khác đóng giả là bác sĩ trưởng khoa cấp cứu yêu cầu chuyển ngay 20 - 50 triệu đồng tiền mổ gấp, chậm là mất mạng."
    ],
    signs: [
      "Tạo tình huống khẩn cấp tính bằng phút để nạn nhân không có thời gian suy nghĩ.",
      "Có tiếng ồn giả làm tiếng còi xe cấp cứu, tiếng máy móc y tế bệnh viện ở hậu cảnh.",
      "Số tài khoản nhận tiền là tài khoản cá nhân lạ, không phải tài khoản viện phí của bệnh viện công lập."
    ],
    prevention: [
      "Hết sức giữ bình tĩnh! Lập tức gọi điện trực tiếp cho Giáo viên chủ nhiệm, Giám thị hoặc số điện thoại của Ban giám hiệu nhà trường để kiểm tra.",
      "Gọi điện thoại cho con (nếu con có dùng điện thoại) hoặc nhờ người thân gần trường qua kiểm tra trực tiếp.",
      "Bệnh viện công lập tại Việt Nam luôn ưu tiên cứu chữa tính mạng bệnh nhân trong trường hợp cấp cứu khẩn cấp, không bao giờ vì chưa chuyển khoản mà từ chối cấp cứu."
    ],
    caseStudy: "Anh V. đang đi làm thì nhận cuộc gọi từ người tự xưng là thầy thể dục trường THPT báo con trai bị ngã gãy cổ chân đứt mạch máu đang cấp cứu ở Bệnh viện Đa khoa tỉnh, cần chuyển gấp 25 triệu để nhập viện. Anh V. bình tĩnh gọi cho cô giáo chủ nhiệm thì biết con vẫn đang ngồi học tiết Văn bình thường."
  },
  {
    id: 9,
    title: "Giả danh các công ty tài chính, ngân hàng thu thập thông tin",
    chapter: 2,
    chapterTitle: "Thao túng tâm lý & Giả danh tổ chức uy tín",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_07.jpeg",
    shortDesc: "Quảng cáo cho vay vốn siêu tốc 1% lãi suất không thẩm định, sau đó thu phí duyệt hồ sơ, nộp tiền bảo hiểm khoản vay rồi ôm tiền biến mất.",
    tricks: [
      "Lập các Fanpage 'Ngân hàng hỗ trợ vay tiêu dùng', 'Vay nhanh không thế chấp'.",
      "Mồi chài với thủ tục đơn giản: chỉ cần ảnh CCCD, nợ xấu cũng vay được 50 - 200 triệu đồng.",
      "Sau khi nộp hồ sơ, kẻ lừa đảo báo khoản vay đã được duyệt nhưng 'hệ thống bị khóa vì sai 1 số tài khoản' hoặc 'phải nộp 10% tiền bảo hiểm rủi ro'.",
      "Nạn nhân nộp tiền khắc phục lỗi thì chúng tiếp tục vẽ ra lý do khác để vòi thêm tiền rồi chặn liên lạc."
    ],
    signs: [
      "Vay tiền mà bắt người vay phải chuyển tiền phí trước.",
      "Quá dễ dàng, không cần chứng minh thu nhập, lãi suất rẻ như cho.",
      "Giao dịch hoàn toàn qua Zalo, hợp đồng vay có con dấu giả mạo cắt ghép thô thiển."
    ],
    prevention: [
      "Tuyệt đối không có bất kỳ tổ chức tín dụng hợp pháp nào bắt khách hàng phải đóng tiền trước để được giải ngân khoản vay.",
      "Cần vốn hãy liên hệ trực tiếp các chi nhánh ngân hàng thương mại được Ngân hàng Nhà nước cấp phép.",
      "Không gửi ảnh CCCD, hộ khẩu, tài khoản ngân hàng lên các hội nhóm cho vay trên mạng."
    ],
    caseStudy: "Chị K. cần tiền kinh doanh, thấy fanpage cho vay 50 triệu không thế chấp. Kẻ gian bảo hợp đồng đã duyệt nhưng do chị ghi sai tên thụ hưởng nên tiền bị đóng băng, bắt chị chuyển 5 triệu để mở khóa. Chuyển xong chúng lại đòi thêm 10 triệu tiền bảo hiểm, lúc này chị mới nhận ra bị lừa."
  },
  {
    id: 10,
    title: "Giả mạo trang thông tin điện tử cơ quan, doanh nghiệp (BHXH, Ngân hàng...)",
    chapter: 2,
    chapterTitle: "Thao túng tâm lý & Giả danh tổ chức uy tín",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_09.jpeg",
    shortDesc: "Lập các trang web giả mạo Bảo hiểm Xã hội, Tổng cục Thuế, Cổng dịch vụ công để dụ dỗ người dân nhập thông tin tài khoản và mã độc.",
    tricks: [
      "Đăng ký tên miền gần giống tên miền thật (ví dụ: dichvucong.gov-vn.com, baohiemxahoi-vietnam.top...).",
      "Sao chép toàn bộ giao diện, quốc huy, hình ảnh lãnh đạo để tạo cảm giác uy tín.",
      "Dụ người dùng truy cập để 'nhận tiền trợ cấp bảo hiểm', 'hoàn thuế thu nhập cá nhân' hoặc 'cập nhật định danh điện tử VNeID mức 2'.",
      "Yêu cầu tải tệp tin cài đặt APK chứa mã độc theo dõi bàn phím và tin nhắn OTP."
    ],
    signs: [
      "Tên miền không có đuôi .gov.vn (tất cả cơ quan nhà nước tại Việt Nam đều bắt buộc có tên miền kết thúc bằng .gov.vn).",
      "Trang web yêu cầu tải file cài đặt có đuôi .apk cho điện thoại Android.",
      "Yêu cầu cấp quyền 'Trợ năng' (Accessibility Service) trên điện thoại."
    ],
    prevention: [
      "Chỉ truy cập các cổng thông tin có đuôi chính xác là .gov.vn (ví dụ: dichvucong.gov.vn, baohiemxahoi.gov.vn).",
      "TUYỆT ĐỐI KHÔNG cài đặt ứng dụng từ các đường link ngoài (file .apk lạ). Chỉ cài ứng dụng từ Google Play hoặc Apple App Store.",
      "Không cấp quyền Trợ năng cho bất kỳ ứng dụng nào nếu không rõ nguồn gốc."
    ],
    caseStudy: "Anh D. nhận tin nhắn hướng dẫn cập nhật VNeID mức 2, truy cập vào trang web giả mạo có logo Bộ Công an và tải file dịch vụ công giả dạng .apk. Sau khi cài đặt, điện thoại anh bị tối màn hình 15 phút, kẻ gian âm thầm chiếm quyền điều khiển app ngân hàng chuyển sạch 110 triệu đồng."
  },
  {
    id: 11,
    title: "Chiêu trò lừa đảo tuyển người mẫu nhí",
    chapter: 2,
    chapterTitle: "Thao túng tâm lý & Giả danh tổ chức uy tín",
    dangerLevel: "CẢNH GIÁC CAO",
    image: "/images/image_06.jpeg",
    shortDesc: "Lợi dụng tình yêu thương và ước mơ tỏa sáng của con trẻ, kẻ lừa đảo mời tuyển người mẫu nhí rồi ép phụ huynh nạp tiền mua hàng hiệu làm 'nhiệm vụ'.",
    tricks: [
      "Chạy quảng cáo tuyển sinh người mẫu nhí cho các nhãn hàng thời trang trẻ em nổi tiếng (Canifa, Zara Kids...).",
      "Khen ngợi ngoại hình của con, tạo cảm giác con là gương mặt tiềm năng.",
      "Đưa phụ huynh vào nhóm Telegram/Zalo, yêu cầu làm 'nhiệm vụ khảo sát' bằng cách chuyển tiền mua đơn hàng thử thách để nhận hoa hồng và tích điểm bình chọn.",
      "Ban đầu trả hoa hồng sòng phẳng vài trăm nghìn đồng để tạo niềm tin, sau đó nâng giá trị đơn hàng lên hàng chục, hàng trăm triệu rồi ôm tiền lặn mất."
    ],
    signs: [
      "Tuyển mẫu nhí nhưng lại bắt phụ huynh phải ứng tiền mua hàng hóa.",
      "Nhóm chat có nhiều 'chim mồi' liên tục gửi ảnh chuyển tiền hàng chục triệu khoe nhận thưởng.",
      "Không hề có buổi thử đồ trực tiếp hay ký hợp đồng người mẫu có giá trị pháp lý."
    ],
    prevention: [
      "Các thương hiệu lớn tuyển mẫu nhí luôn có casting trực tiếp và KHÔNG BAO GIỜ bắt phụ huynh chuyển tiền làm nhiệm vụ.",
      "Cảnh giác với mọi hình thức làm nhiệm vụ chuyển tiền nhận hoa hồng trên Telegram/Zalo.",
      "Kiểm tra tính xác thực qua hotline và website chính thức của thương hiệu."
    ],
    caseStudy: "Chị M. thấy quảng cáo tuyển người mẫu ảnh nhí cho con gái 5 tuổi. Sau khi vượt qua vòng 1, chị được yêu cầu nạp tiền mua sản phẩm để tăng điểm bình chọn cho con. Chị nạp lần đầu 1 triệu được hoàn 1,2 triệu. Đến khi nạp 50 triệu và 120 triệu thì kẻ lừa đảo báo 'sai cú pháp' và yêu cầu nạp thêm 200 triệu để lấy lại, khiến chị mất trắng."
  },

  // --- CHƯƠNG 3 ---
  {
    id: 12,
    title: "Lừa đảo tuyển dụng CTV online “việc nhẹ lương cao”",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_12.jpeg",
    shortDesc: "Đăng tuyển cộng tác viên like video TikTok, giật đơn Shopee/Tiki nhận lương 300 - 500k/ngày, giăng bẫy nạp tiền nhiệm vụ để chiếm đoạt tài sản.",
    tricks: [
      "Đăng tin tuyển dụng tràn lan trên Facebook, TikTok: 'Tìm người đánh máy tại nhà', 'Xem video kiếm tiền', 'Cộng tác viên thanh toán đơn hàng Shopee/Lazada'.",
      "Nhiệm vụ ban đầu: Chuyển khoản thanh toán đơn hàng 100k - 500k, sau 5 phút được hoàn vốn kèm hoa hồng 10-20%.",
      "Khi nạn nhân ham lợi nhuận, kẻ gian giao đơn hàng giá trị cao từ 10 triệu đến 100 triệu.",
      "Nạn nhân chuyển tiền xong thì kẻ gian thông báo 'lỗi hệ thống', 'chưa hoàn thành chuỗi 3 nhiệm vụ liên tiếp' và bắt chuyển thêm tiền nếu muốn rút gốc."
    ],
    signs: [
      "Lời hứa hẹn 'Việc nhẹ lương cao, chỉ cần điện thoại lướt mạng kiếm tiền triệu mỗi ngày'.",
      "Tiền hoa hồng cao bất thường (10% - 30% chỉ trong vài phút).",
      "Mọi trao đổi đều qua Telegram hoặc nhóm kín, người quản trị liên tục giục giã nạp tiền."
    ],
    prevention: [
      "Không có công việc nào 'việc nhẹ lương cao' mà không đòi hỏi kỹ năng chuyên môn.",
      "Tất cả các sàn Shopee, Tiki, Lazada đều KHÔNG CÓ chính sách tuyển CTV giật đơn chuyển tiền cá nhân.",
      "Dứt khoát dừng lại ngay khi bị yêu cầu chuyển tiền nạp cọc để làm việc."
    ],
    caseStudy: "Bạn N. sinh viên năm nhất muốn kiếm tiền thêm, đăng ký làm CTV đánh giá sản phẩm. Sau 3 đơn hàng đầu kiếm được 150k tiền lời, bạn dồn toàn bộ 40 triệu đồng tiền học phí và vay mượn bạn bè để làm đơn hàng cấp VIP. Kẻ lừa đảo lập tức chặn tin nhắn và xóa nhóm."
  },
  {
    id: 13,
    title: "Lừa đảo đầu tư chứng khoán quốc tế, tiền ảo, Forex",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_11.jpeg",
    shortDesc: "Mồi chài tham gia sàn đầu tư tài chính với 'chuyên gia đọc lệnh', cam kết lợi nhuận 20-30%/tháng, điều chỉnh thuật toán cho thắng ảo rồi khóa rút tiền.",
    tricks: [
      "Lập các sàn giao dịch giả mạo sàn quốc tế nhưng thực chất do kẻ gian tự lập trình máy chủ điều khiển kết quả thắng/thua.",
      "Cho tham gia các nhóm 'Tín hiệu triệu đô', có các 'chuyên gia tài chính' khoe ảnh xe sang, tiền tỷ, hóa đơn du lịch xa hoa.",
      "Người chơi nạp ít tiền thì tài khoản trên sàn tăng số dư liên tục, cho rút thử vài triệu tiền lời.",
      "Khi người chơi thế chấp tài sản nạp tiền tỷ, sàn sẽ tự can thiệp làm 'cháy tài khoản' hoặc báo lỗi hệ thống, đòi nộp 30% tiền thuế thu nhập để được rút."
    ],
    signs: [
      "Cam kết lợi nhuận khủng 'bao lỗ, chắc chắn lãi 100%'.",
      "Tiền nạp vào không phải tài khoản công ty chứng khoán được cấp phép mà là tài khoản cá nhân người khác.",
      "Sàn không có giấy phép hoạt động của Ủy ban Chứng khoán Nhà nước Việt Nam."
    ],
    prevention: [
      "Việt Nam chưa công nhận tiền ảo, Forex là phương tiện thanh toán hợp pháp; người tham gia không được pháp luật bảo vệ khi có tranh chấp.",
      "Chỉ đầu tư qua các công ty chứng khoán chính thống do UBCKNN cấp phép.",
      "Quy luật tài chính bất biến: Lợi nhuận càng cao thì rủi ro càng lớn, không có kênh đầu tư nào cam kết lãi suất phi thực tế mà an toàn."
    ],
    caseStudy: "Ông T. (55 tuổi) tham gia nhóm đầu tư chứng khoán quốc tế theo lời mời của một 'chuyên gia' trên Zalo. Sau 1 tháng, bảng điện tử app báo lãi từ 500 triệu lên 3 tỷ đồng. Tuy nhiên khi bấm rút tiền, hệ thống báo phải nộp 400 triệu tiền thuế chống rửa tiền. Sau khi nộp thêm, app sập hoàn toàn."
  },
  {
    id: 14,
    title: "Cài cắm ứng dụng, link quảng cáo cờ bạc, cá độ, tín dụng đen",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_08.jpeg",
    shortDesc: "Quảng cáo cờ bạc trá hình game tài xỉu, nổ hũ, kèm bẫy tín dụng đen ép cấp quyền danh bạ, ảnh cá nhân để đe dọa, khủng bố mạng đòi nợ.",
    tricks: [
      "Cài link quảng cáo game bài, nổ hũ, cá độ bóng đá trên các trang web xem phim lậu, web truyện tranh.",
      "Các ứng dụng vay nặng lãi bắt người dùng cho phép truy cập danh bạ, tin nhắn, định vị và bộ sưu tập ảnh.",
      "Lãi suất thực tế lên tới 1.000% - 2.000%/năm thông qua các khoản 'phí dịch vụ', 'phí quản lý hồ sơ'.",
      "Khi chậm trả, các đối tượng dùng danh bạ gọi điện chửi bới người thân, cắt ghép ảnh nạn nhân lên bàn thờ hoặc ảnh khiêu dâm để khủng bố trên mạng xã hội."
    ],
    signs: [
      "Vay 5 triệu chỉ thực nhận 3 triệu (trừ trước phí), sau 7 ngày phải trả 6-7 triệu.",
      "Ứng dụng bắt buộc cấp quyền truy cập danh bạ điện thoại mới cho đăng ký.",
      "Quảng cáo game cờ bạc với chiêu bài tặng tiền cược miễn phí khi đăng ký mới."
    ],
    prevention: [
      "Tuyệt đối không tham gia các trò chơi cờ bạc online (đây là hành vi vi phạm pháp luật hình sự).",
      "Không cài đặt các app vay tiền không rõ nguồn gốc trên mạng.",
      "Nếu bị khủng bố đòi nợ vô cớ, lưu giữ chứng cứ (tin nhắn, ghi âm) và trình báo cơ quan công an."
    ],
    caseStudy: "Bạn H. học sinh lớp 12 tò mò tải game tài xỉu được tặng 50k, sau đó thua và vay 3 triệu từ app tín dụng đen để gỡ. Chỉ sau 2 tháng, số nợ bị nhân lên 80 triệu đồng. Kẻ xấu lấy toàn bộ danh bạ nhắn tin cho thầy cô giáo, bố mẹ và bạn bè của H. với lời lẽ lăng mạ bôi nhọ."
  },
  {
    id: 15,
    title: "Rao bán hàng giả, hàng nhái qua sàn thương mại điện tử và MXH",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "CẢNH GIÁC CAO",
    image: "/images/image_15.jpeg",
    shortDesc: "Lập các gian hàng ảo rao bán đồ điện tử, mỹ phẩm hàng hiệu giảm giá sốc 70-90%, bắt cọc trước hoặc gửi hàng giả, gạch đá qua bưu điện.",
    tricks: [
      "Chạy quảng cáo bán iPhone, laptop, xe máy giá rẻ bất ngờ với lý do 'hàng hải quan thanh lý', 'xả kho phá sản'.",
      "Yêu cầu chuyển cọc trước 20 - 50% tiền hàng.",
      "Khi giao hàng dùng hình thức không cho đồng kiểm, bên trong bưu kiện là củ khoai, gạch đá, hoặc đồ phế phẩm vô giá trị.",
      "Lập hàng loạt bình luận đánh giá 5 sao giả (seeding) để đánh lừa khách hàng."
    ],
    signs: [
      "Giá rẻ không tưởng (iPhone 15 giá 3 triệu, xe SH giá 10 triệu).",
      "Không cho xem hàng trước khi trả tiền (không đồng kiểm).",
      "Địa chỉ người bán mập mờ, không có thông tin cửa hàng thực tế."
    ],
    prevention: [
      "Chỉ mua hàng trên các gian hàng chính hãng (Shopee Mall, LazMall, Tiki Trading) có cam kết chất lượng.",
      "Yêu cầu được đồng kiểm tra hàng trước khi thanh toán tiền cho shipper.",
      "Không chuyển khoản đặt cọc cho các trang cá nhân bán hàng không rõ uy tín."
    ],
    caseStudy: "Anh B. đặt mua một chiếc máy ảnh cũ giá 6 triệu trên fanpage thanh lý. Người bán yêu cầu cọc 1 triệu để ship COD. Khi bưu tá giao hộp hàng bắt trả nốt 5 triệu rồi mới cho mở, anh B. mở hộp ra thì bên trong chỉ có 2 chai nước khoáng cũ."
  },
  {
    id: 16,
    title: "Lừa đảo cho số đánh lô đề",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "CẢNH GIÁC CAO",
    image: "/images/image_24.jpeg",
    shortDesc: "Mạo danh nhân viên công ty xổ số kiến thiết, cam kết cho 'số chuẩn trúng 100%' thu phí dịch vụ hàng triệu đồng rồi chiếm đoạt.",
    tricks: [
      "Lập các trang 'Hội đồng xổ số miền Bắc', 'Soi cầu chuẩn 100%', dùng tài khoản ảo khoe bảng tin nhắn trúng đề hàng ngày.",
      "Tuyên bố có tay trong tại Hội đồng quay số, biết trước kết quả.",
      "Bắt người mua trả phí dịch vụ từ vài triệu đến vài chục triệu đồng để lấy số.",
      "Nếu số không về, chúng chặn số và đổi tên trang; nếu vô tình trúng, chúng đòi chia hoa hồng 50%."
    ],
    signs: [
      "Khẳng định biết trước kết quả xổ số (hoàn toàn là điều bịa đặt, phi lý về mặt khoa học và pháp luật).",
      "Bắt đóng tiền 'phí bảo mật', 'phí lót tay Hội đồng' trước khi nhận số."
    ],
    prevention: [
      "Nhận thức rõ: Đánh bạc, lô đề là hành vi vi phạm pháp luật.",
      "Không có ai có thể biết trước kết quả quay thưởng xổ số kiến thiết.",
      "Tránh xa các hội nhóm chia sẻ số đề trên mạng xã hội."
    ],
    caseStudy: "Anh P. ở quê tin vào trang Facebook cam kết 'Bạch thủ lô trúng 100% từ người của trường quay'. Anh đóng phí 5 triệu để lấy con số may mắn. Đánh hết 20 triệu nhưng kết quả trật lất, quay lại nhắn tin đòi tiền thì kẻ lừa đảo đã block từ lâu."
  },
  {
    id: 17,
    title: "Lừa đảo đưa người xuất cảnh sang Campuchia “việc nhẹ lương cao”",
    chapter: 3,
    chapterTitle: "Bẫy tài chính, việc làm & kinh tế online",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_25.jpeg",
    shortDesc: "Tuyển lao động sang Campuchia làm việc máy tính lương 20 - 30 triệu/tháng, sau đó bán vào các sòng bạc/ổ lừa đảo trực tuyến, tra tấn và đòi tiền chuộc.",
    tricks: [
      "Đăng tin tuyển dụng trên mạng: Không cần bằng cấp, biết gõ máy tính, sang Campuchia làm việc văn phòng lương 1.000 USD/tháng, bao trọn chi phí ăn ở, đi lại.",
      "Tổ chức đưa người xuất cảnh trái phép qua các đường mòn, lối mở biên giới Tây Nam.",
      "Khi sang đến nơi, nạn nhân bị tịch thu hộ chiếu, điện thoại, bị nhốt trong các khu nhà có bảo vệ trang bị vũ khí canh gác nghiêm ngặt.",
      "Bắt buộc làm việc từ 14 - 16 tiếng/ngày để thực hiện các cuộc gọi lừa đảo về Việt Nam. Nếu không đạt chỉ tiêu thì bị bỏ đói, đánh đập dã man, chích điện và bắt gia đình chuộc tiền từ 3.000 - 20.000 USD."
    ],
    signs: [
      "Tuyển lao động đi làm việc ở nước ngoài mà không thông qua công ty phái cử có giấy phép của Bộ Lao động - Thương binh và Xã hội.",
      "Chiêu bài đưa đón vượt biên không cần hộ chiếu, visa chính ngạch.",
      "Mức lương phi lý so với trình độ lao động phổ thông không đòi hỏi kinh nghiệm."
    ],
    prevention: [
      "Cảnh giác tối đa với các lời mời sang Campuchia, Lào, Myanmar làm 'việc nhẹ lương cao'.",
      "Muốn đi xuất khẩu lao động phải tìm hiểu tại Sở LĐ-TB&XH địa phương hoặc các doanh nghiệp được cấp phép chính thức.",
      "Kịp thời tố giác các đối tượng môi giới đưa người vượt biên trái phép cho cơ quan Công an và Bộ đội Biên phòng."
    ],
    caseStudy: "Hai thanh niên 18 tuổi ở Hải Dương nghe bạn bè trên mạng rủ sang Campuchia làm việc máy tính tháng 25 triệu. Sang đến nơi bị đưa vào khu sòng bạc ở Bavet, ép gọi điện lừa đảo người Việt. Không chịu làm, 2 em bị đánh đập và kẻ gian ép gọi điện về gia đình bắt chuyển 300 triệu tiền chuộc mới thả về."
  },

  // --- CHƯƠNG 4 ---
  {
    id: 18,
    title: "Đánh cắp tài khoản MXH, nhắn tin lừa đảo vay tiền",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_13.jpeg",
    shortDesc: "Hack tài khoản Facebook, Zalo bằng link phishing, sau đó nghiên cứu lịch sử nhắn tin để nhắn tin vay tiền người thân, bạn bè của chủ nick.",
    tricks: [
      "Gửi link chứa mã độc để chiếm quyền kiểm soát tài khoản Facebook, Zalo.",
      "Đọc kỹ lịch sử chat trước đó để bắt chước văn phong, cách xưng hô thân mật của chủ nick.",
      "Nhắn tin cho bạn bè trong danh bạ xin mượn gấp 5 - 20 triệu đồng vì đang có việc kẹt, hứa sáng mai trả ngay.",
      "Cung cấp số tài khoản ngân hàng trùng tên chủ nick (kẻ gian mua tài khoản ngân hàng rác mở bằng giấy tờ giả) để nạn nhân tin tưởng."
    ],
    signs: [
      "Bạn bè lâu ngày không nói chuyện bỗng nhiên nhắn tin hỏi thăm rồi vay tiền gấp.",
      "Khi đề nghị gọi điện thoại nghe giọng nói thì từ chối hoặc nói đang bận họp, đang ở bệnh viện không nghe được.",
      "Tài khoản nhận tiền dù đúng tên nhưng thuộc một ngân hàng hoàn toàn khác với ngân hàng bạn bè hay dùng."
    ],
    prevention: [
      "QUY TẮC SỐNG CÒN: Khi nhận được tin nhắn hỏi vay tiền từ người thân/bạn bè trên mạng, PHẢI GỌI ĐIỆN THOẠI TRỰC TIẾP bằng số di động để xác nhận bằng chính giọng nói thật.",
      "Bật bảo mật xác thực 2 lớp (2FA) qua ứng dụng Google Authenticator cho Facebook, Zalo.",
      "Không đăng nhập tài khoản MXH vào các đường link lạ."
    ],
    caseStudy: "Cô G. nhận tin nhắn Facebook từ em gái ruột đang ở nước ngoài nhắn vay 20 triệu gửi gấp cho khách hàng. Thấy đúng giọng điệu em gái hay nói, cô chuyển ngay. Đến tối gọi điện thì mới biết Facebook em gái đã bị hack từ chiều."
  },
  {
    id: 19,
    title: "Rải link Phishing, seeding quảng cáo bẩn trên Facebook",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_23.png",
    shortDesc: "Dụ bấm link bình chọn cuộc thi ảnh, xem video lộ clip nóng hoặc tin giật gân, yêu cầu đăng nhập tài khoản để đánh cắp mật khẩu.",
    tricks: [
      "Tạo các đường link giả mạo trang đăng nhập Facebook, Google (ví dụ: login-facebook-secure.com, binhchon-giongca-nhi.vn...).",
      "Nhắn tin nhờ vả: 'Bạn ơi bấm vào link này bình chọn cho cháu mình thi múa với, mã số 05 nhé'.",
      "Gieo link giật gân dưới các bài viết hot: 'Xem full clip lộ clip nóng', 'Vụ tai nạn thảm khốc tại địa phương'.",
      "Khi bấm vào xem, trang web bắt buộc người dùng nhập Tên đăng nhập và Mật khẩu Facebook. Kẻ gian lập tức ghi nhận mật khẩu này để chiếm nick."
    ],
    signs: [
      "Thanh địa chỉ URL của trình duyệt không phải là facebook.com.",
      "Các bài đăng hoặc tin nhắn giật gân, khơi gợi trí tò mò hoặc nể nang bạn bè.",
      "Một trang web lạ lại bắt đăng nhập bằng tài khoản mạng xã hội."
    ],
    prevention: [
      "Luôn nhìn kỹ thanh địa chỉ trình duyệt web trước khi nhập mật khẩu.",
      "Tuyệt đối không đăng nhập tài khoản mạng xã hội vào bất kỳ trang web thứ ba nào.",
      "Nếu lỡ nhập thông tin, lập tức vào trang chủ Facebook chính thức đổi mật khẩu và đăng xuất khỏi tất cả các thiết bị."
    ],
    caseStudy: "Em A. học sinh lớp 11 nhận được tin nhắn của chị họ nhờ vào link 'binhchon-nhidong.xyz' để bình chọn ảnh cho cháu. Vừa nhập mật khẩu Facebook vào trang web, chỉ 1 phút sau em bị văng ra khỏi nick và tài khoản của em bắt đầu tự động gửi link lừa đảo tới toàn bộ bạn bè trong danh bạ."
  },
  {
    id: 20,
    title: "Đánh cắp thông tin Căn cước công dân (CCCD) đi vay tín dụng",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_16.jpeg",
    shortDesc: "Thu thập ảnh chụp 2 mặt CCCD và ảnh chân dung thông qua các chiêu trò tặng quà, làm khảo sát, sau đó dùng mở tài khoản ngân hàng rác và vay nợ app tín dụng.",
    tricks: [
      "Tổ chức các sự kiện khuyến mãi ảo tại vùng nông thôn hoặc trường học: Tặng ấm chén, dầu ăn, tặng 50k để người dân cho chụp ảnh 2 mặt CCCD và quét nhận diện khuôn mặt.",
      "Lập các form tuyển dụng khảo sát online yêu cầu học sinh chụp rõ 2 mặt thẻ CCCD.",
      "Dùng thông tin này để đăng ký sim rác, mở tài khoản ngân hàng để rửa tiền, hoặc vay tiền qua các app tín dụng đen online.",
      "Nạn nhân không hề hay biết cho đến khi bị các công ty tài chính gọi điện đòi nợ và ghi nhận nợ xấu trên hệ thống CIC."
    ],
    signs: [
      "Chương trình tặng quà đơn giản nhưng lại đòi hỏi chụp ảnh CCCD và quét cử động khuôn mặt.",
      "Đột nhiên nhận được tin nhắn thông báo khoản vay từ ngân hàng hoặc tổ chức tài chính mà mình chưa từng đăng ký."
    ],
    prevention: [
      "Căn cước công dân là tài sản số vô cùng quan trọng, TUYỆT ĐỐI KHÔNG chia sẻ ảnh chụp CCCD lên mạng xã hội.",
      "Không cho bất kỳ ai chụp ảnh CCCD nếu không phải cơ quan chức năng có thẩm quyền trong các giao dịch pháp lý rõ ràng.",
      "Khi phải nộp bản photocopy CCCD, nên dùng bút viết đè dòng chữ chéo: 'Bản sao phục vụ mục đích xin việc tại công ty X, không có giá trị vay vốn'."
    ],
    caseStudy: "Nhóm học sinh THPT được một nhóm người lạ vào cổng trường hứa tặng vé xem phim miễn phí nếu cho chụp ảnh CCCD để 'chấm điểm dữ liệu'. Vài tháng sau, một em bị công ty tài chính gửi giấy báo nợ 15 triệu đồng do kẻ gian dùng ảnh CCCD để đăng ký vay tiêu dùng trực tuyến."
  },
  {
    id: 21,
    title: "Lừa đảo “chuyển nhầm tiền” vào tài khoản ngân hàng ép vay lãi",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_17.jpeg",
    shortDesc: "Cố tình chuyển một khoản tiền vào tài khoản nạn nhân, sau đó đóng giả là công ty tài chính đòi nợ với lãi suất cắt cổ hoặc giả người chuyển nhầm để lừa bấm link.",
    tricks: [
      "Bỗng nhiên tài khoản của nạn nhân nhận được một khoản tiền (ví dụ 5 - 10 triệu đồng) kèm lời nhắn mập mờ.",
      "Vài ngày sau, có người gọi điện tự xưng là công ty cho vay thông báo bạn đã nhận tiền giải ngân hợp đồng vay, yêu cầu trả nợ gốc kèm lãi suất cắt cổ.",
      "Hoặc kẻ lừa đảo đóng giả người chuyển nhầm, khóc lóc xin lại tiền nhưng gửi kèm một đường link trang web bảo nạn nhân bấm vào đó để 'làm thủ tục hoàn tiền qua cổng ngân hàng'."
    ],
    signs: [
      "Nhận tiền từ người hoàn toàn xa lạ không có giao dịch làm ăn.",
      "Bị ép buộc thừa nhận đây là khoản vay dù chưa từng ký kết hợp đồng.",
      "Người xin lại tiền hối thúc bấm vào đường link lạ để nhận lại tiền."
    ],
    prevention: [
      "Khi có tiền lạ chuyển vào tài khoản: TUYỆT ĐỐI KHÔNG SỬ DỤNG SỐ TIỀN ĐÓ vào mục đích cá nhân.",
      "Không tự ý chuyển tiền trả lại theo yêu cầu của số điện thoại lạ gọi đến.",
      "Hãy chủ động ra trực tiếp quầy giao dịch của Ngân hàng mình đang sử dụng, báo cáo sự việc để ngân hàng thực hiện tra soát và hoàn tiền chính thống.",
      "Lưu lại sao kê và báo cáo cho cơ quan Công an nếu có dấu hiệu bị khủng bố đòi tiền."
    ],
    caseStudy: "Chị S. thấy tài khoản báo nhận 20 triệu từ người lạ. Chiều cùng ngày có người gọi đến bảo chuyển nhầm, xin chị chuyển trả lại vào số tài khoản khác. Chị S. cảnh giác không chuyển mà ra chi nhánh Vietcombank nhờ tra soát. Quả nhiên kẻ gian đang dùng tài khoản của chị làm cầu nối nhận tiền lừa đảo từ một nạn nhân khác."
  },
  {
    id: 22,
    title: "Lừa đảo dịch vụ “Lấy lại tiền khi đã bị lừa” (Lừa đảo kép)",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_18.jpeg",
    shortDesc: "Đánh vào tâm lý tuyệt vọng muốn gỡ gạc của nạn nhân vừa bị lừa đảo, giả danh 'Cục An ninh mạng', 'Luật sư hỗ trợ thu hồi vốn' để lừa thêm lần nữa.",
    tricks: [
      "Lập các Fanpage có tích xanh giả mạo: 'Cục An ninh mạng và Phòng chống tội phạm công nghệ cao - Hỗ trợ thu hồi tiền treo', 'Văn phòng Luật sư hỗ trợ nạn nhân bị lừa đảo'.",
      "Khoe các bằng chứng đã 'thu hồi thành công tiền từ sàn ảo' cho hàng trăm người.",
      "Yêu cầu nạn nhân cung cấp thông tin số tiền bị lừa, sao kê chuyển khoản.",
      "Hứa hẹn kết nối vào hệ thống máy chủ ngân hàng để kéo tiền về, nhưng bắt nạn nhân đóng trước 'phí ủy thác', 'phí giải mã dòng tiền' từ 10% đến 30% số tiền đã mất."
    ],
    signs: [
      "Trang Facebook chạy quảng cáo tự nhận là cơ quan Công an hỗ trợ thu hồi tiền trên mạng.",
      "Bắt đóng tiền phí trước để được lấy lại tiền bị lừa.",
      "Khẳng định chắc chắn 'lấy lại 100% tiền trong vòng 24 giờ'."
    ],
    prevention: [
      "Cơ quan Công an và Cục An ninh mạng KHÔNG BAO GIỜ có dịch vụ thu hồi tiền lừa đảo qua mạng xã hội và KHÔNG BAO GIỜ thu bất kỳ khoản phí nào của người dân.",
      "Chỉ có cơ quan chức năng tiến hành tố tụng hình sự, phong tỏa tài khoản theo quy định của pháp luật mới có thể thu hồi tang vật vụ án.",
      "Khi bị lừa đảo, hãy đến trình báo trực tiếp tại cơ quan Công an có thẩm quyền, tuyệt đối không tìm kiếm các dịch vụ 'lấy lại tiền' trên mạng."
    ],
    caseStudy: "Chị Y. vừa bị lừa mất 100 triệu tiền CTV online. Đang hoang mang, chị thấy fanpage 'Cổng An ninh mạng hỗ trợ thu hồi vốn'. Kẻ giả danh an ninh mạng bảo đã định vị được ví tiền của kẻ lừa đảo, yêu cầu chị nộp 20 triệu tiền phí giải ngân. Chị Y. vay mượn nộp thêm và tiếp tục bị mất luôn 20 triệu này."
  },
  {
    id: 23,
    title: "Lừa đảo dịch vụ “Lấy lại Facebook”",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "NGUY HIỂM CAO",
    image: "/images/image_21.jpeg",
    shortDesc: "Lợi dụng nhu cầu cần lấy lại nick Facebook chứa nhiều kỷ niệm hoặc tài liệu kinh doanh, kẻ gian giả làm hacker/chuyên gia để thu phí cọc rồi biến mất.",
    tricks: [
      "Lập các trang cá nhân và hội nhóm 'Dịch vụ khôi phục tài khoản Facebook bị hack, rip nick'.",
      "Bắt người dùng cung cấp số điện thoại, email, mật khẩu cũ, ảnh chụp giấy tờ tùy thân.",
      "Yêu cầu chuyển khoản tiền cọc từ 500k - 2 triệu đồng.",
      "Sau khi nhận tiền cọc hoặc có được thông tin bảo mật, kẻ gian chiếm luôn quyền sở hữu vĩnh viễn hoặc chặn liên lạc của nạn nhân."
    ],
    signs: [
      "Yêu cầu mật khẩu và mã OTP tài khoản.",
      "Bắt chuyển tiền đặt cọc trước khi làm.",
      "Không có địa chỉ kinh doanh rõ ràng, dùng tài khoản Facebook ảo."
    ],
    prevention: [
      "Tự khôi phục tài khoản thông qua cổng hỗ trợ chính thống của Facebook tại địa chỉ: https://facebook.com/hacked.",
      "Không gửi giấy tờ tùy thân, mã OTP cho các dịch vụ trôi nổi trên mạng.",
      "Cài đặt bảo mật 2 lớp và lưu trữ mã khôi phục khẩn cấp ngay khi tạo tài khoản."
    ],
    caseStudy: "Bạn T. bị mất nick Facebook bán hàng online. Tìm đến một dịch vụ trên mạng hứa lấy lại trong 30 phút với giá 1 triệu, bắt cọc trước 500k. Sau khi chuyển khoản 500k, đối tượng đòi chuyển nốt 500k mới gửi mã. Bạn T. chuyển đủ 1 triệu thì bị đối tượng block Facebook ngay lập tức."
  },
  {
    id: 24,
    title: "Lừa đảo tình cảm, thao túng tâm lý (Romance Scam / Pig Butchering)",
    chapter: 4,
    chapterTitle: "Đánh cắp danh tính & Lừa đảo kép",
    dangerLevel: "RẤT NGUY HIỂM",
    image: "/images/image_22.jpeg",
    shortDesc: "Tạo vỏ bọc doanh nhân/soái ca thành đạt kết bạn yêu đương qua mạng, thao túng tâm lý rồi dụ dỗ nạn nhân gửi ảnh nhạy cảm tống tiền hoặc nạp tiền sàn ảo.",
    tricks: [
      "Lấy cắp ảnh người mẫu, bác sĩ quân y, doanh nhân thành đạt tạo hồ sơ hẹn hò trên Tinder, Facebook, Telegram.",
      "Dành hàng tháng trời nhắn tin quan tâm, chăm sóc, chia sẻ những câu chuyện cảm động để xây dựng tình cảm sâu đậm.",
      "Chiêu trò 1: Dụ dỗ gọi video call khỏa thân hoặc gửi hình ảnh nhạy cảm, sau đó ghi hình lại để đe dọa tống tiền, nếu không chuyển tiền sẽ gửi cho gia đình, nhà trường, bạn bè.",
      "Chiêu trò 2: Rủ cùng đầu tư tài chính để 'xây dựng tương lai chung', ban đầu cho thắng nhỏ rồi ép vay mượn nạp tiền lớn và làm bốc hơi toàn bộ."
    ],
    signs: [
      "Người yêu trên mạng quá hoàn hảo nhưng luôn viện cớ từ chối gặp mặt trực tiếp ngoài đời thật.",
      "Mới quen biết vài tuần đã hứa hẹn tương lai gắn bó cả đời.",
      "Dần dần chuyển câu chuyện sang việc kiếm tiền, rủ rê đầu tư tài chính hoặc đòi xem hình ảnh nhạy cảm."
    ],
    prevention: [
      "Tuyệt đối cảnh giác với những mối quan hệ tình cảm quá hoàn hảo và nhanh chóng trên không gian mạng.",
      "TUYỆT ĐỐI KHÔNG gửi hình ảnh, video clip riêng tư, nhạy cảm của bản thân cho bất kỳ ai trên mạng xã hội.",
      "Không chuyển tiền hoặc đầu tư tài chính theo lời rủ rê của 'người yêu trên mạng' chưa từng gặp mặt ngoài đời thật."
    ],
    caseStudy: "Chị L. (28 tuổi) quen một 'chuyên gia tài chính Singapore' qua app hẹn hò. Sau 2 tháng tâm sự ngọt ngào, người này rủ chị cùng góp vốn đầu tư vàng online trên sàn riêng để mua nhà chung. Chị L. dồn hết 300 triệu tiền tiết kiệm và vay thêm ngân hàng 200 triệu nạp vào sàn. Khi chị muốn rút tiền thì 'người yêu' biến mất, tài khoản sàn bị đóng băng vĩnh viễn."
  }
];

export const HOTLINES = [
  { name: "Cảnh sát phản ứng nhanh", number: "113", desc: "Tố giác tội phạm khẩn cấp 24/7" },
  { name: "Cục An toàn thông tin - Bộ TTTT", number: "156", desc: "Tổng đài tiếp nhận phản ánh cuộc gọi & tin nhắn rác, lừa đảo" },
  { name: "Phòng An ninh mạng & PCTP CNC (A05)", number: "069.234.8560", desc: "Cục An ninh mạng và PCTP sử dụng công nghệ cao - Bộ Công an" },
  { name: "Cảnh báo an toàn thông tin mạng", url: "https://canhbao.khonggianmang.vn", desc: "Trang web cảnh báo chính thức của Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC)" }
];
''';

with open('src/data/scamsData.ts', 'w', encoding='utf-8') as f:
    f.write(scams_data_content)

print("Generated src/data/scamsData.ts successfully!")
