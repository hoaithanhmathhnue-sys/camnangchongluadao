import { GoogleGenAI } from '@google/genai';

export type AiProvider = 'gemini' | 'agent-platform';

export const GEMINI_FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
] as const;

export const AGENT_PLATFORM_FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
] as const;

export const DEFAULT_GEMINI_MODEL = 'gemini-3.6-flash';
export const DEFAULT_AGENT_PLATFORM_MODEL = 'gemini-2.5-flash';

// Storage keys theo chuẩn api.md
export const STORAGE_KEYS = {
  GEMINI_KEY: 'gemini_api_key',
  AGENT_PLATFORM_KEY: 'agent_platform_api_key',
  PROVIDER: 'google_ai_provider',
  SELECTED_MODEL: 'google_ai_model',
  SELECTION_SOURCE: 'google_ai_provider_selection_source',
};

/**
 * Client factory tập trung theo chuẩn api.md
 * Không được gọi new GoogleGenAI() trực tiếp bên ngoài factory này.
 */
export const createGoogleAiClient = (apiKey: string, provider: AiProvider): GoogleGenAI => {
  if (provider === 'agent-platform') {
    // Cờ kỹ thuật bắt buộc của SDK để định tuyến tới aiplatform.googleapis.com
    return new GoogleGenAI({ vertexai: true, apiKey });
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Phân tích lỗi API chính xác, không nhầm lẫn giữa 503 (quá tải) và sai API Key
 */
export const parseApiError = (error: any): string => {
  const message = error?.message || (typeof error === 'string' ? error : '') || '';
  const serialized = typeof error === 'object' ? JSON.stringify(error) : '';
  const combined = `${message} ${serialized}`.toLowerCase();

  if (
    combined.includes('429') ||
    combined.includes('resource_exhausted') ||
    combined.includes('quota')
  ) {
    return 'QUOTA_EXCEEDED';
  }

  if (
    combined.includes('503') ||
    combined.includes('unavailable') ||
    combined.includes('high demand') ||
    combined.includes('overloaded') ||
    combined.includes('try again later') ||
    combined.includes('500') ||
    combined.includes('504')
  ) {
    return 'MODEL_OVERLOADED';
  }

  if (
    combined.includes('api_key_invalid') ||
    combined.includes('401') ||
    combined.includes('permission_denied') ||
    combined.includes('unauthenticated')
  ) {
    return 'INVALID_API_KEY';
  }

  if (combined.includes('404') || combined.includes('not_found')) {
    return 'NOT_FOUND';
  }

  return 'UNKNOWN';
};

/**
 * Trả về danh sách model có thứ tự fallback
 * Model người dùng chọn luôn đứng đầu và loại bỏ trùng lặp
 */
export const getOrderedModels = (selectedModel?: string, provider: AiProvider = 'gemini'): string[] => {
  const fallbackList = provider === 'agent-platform'
    ? [...AGENT_PLATFORM_FALLBACK_MODELS]
    : [...GEMINI_FALLBACK_MODELS];

  if (!selectedModel) {
    return fallbackList;
  }

  return [selectedModel, ...fallbackList.filter((m) => m !== selectedModel)];
};

export interface RealtimeScamItem {
  title: string;
  source: string;
  publishedDate?: string;
  summary: string;
  warningSigns: string[];
  advice: string;
  url?: string;
}

export interface ScamUpdateResult {
  updatedAt: string;
  modelUsed: string;
  totalFound: number;
  items: RealtimeScamItem[];
  rawSummary?: string;
}

export interface ScamAnalysisResult {
  isScam: boolean;
  confidenceScore: number; // 0 - 100
  riskLevel: 'AN TOÀN' | 'ĐÁNG NGỜ' | 'NGUY HIỂM CAO' | 'CỰC KỲ NGUY HIỂM';
  dangerColor: string;
  identifiedTactics: string[];
  analysisReasoning: string;
  warningSignsFound: string[];
  emergencyActions: string[];
  hotlines: { name: string; number: string }[];
  modelUsed: string;
}

/**
 * Tính năng AI 1: Cập nhật thông tin lừa đảo trực tuyến mới nhất qua Google Search Grounding
 */
export const fetchRealtimeScamUpdates = async (
  apiKey: string,
  provider: AiProvider = 'gemini',
  selectedModel?: string
): Promise<ScamUpdateResult> => {
  const client = createGoogleAiClient(apiKey, provider);
  const models = getOrderedModels(selectedModel, provider);

  const prompt = `Bạn là chuyên gia an ninh mạng hàng đầu của Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC) và Cục An toàn thông tin Việt Nam.
Hãy tìm kiếm trên Internet các thủ đoạn và vụ việc lừa đảo trực tuyến, lừa đảo công nghệ cao mới nhất phát sinh tại Việt Nam trong vòng 30 - 60 ngày gần đây (đặc biệt là các thủ đoạn liên quan đến Deepfake AI, mạo danh cơ quan nhà nước, bẫy việc làm, tài chính số, mã độc ngân hàng...).

Yêu cầu xuất kết quả theo định dạng JSON chuẩn (application/json) như sau:
{
  "totalFound": 4,
  "items": [
    {
      "title": "Tên thủ đoạn hoặc vụ việc lừa đảo mới",
      "source": "Tên nguồn tin (ví dụ: VTV, Tuổi Trẻ, VnExpress, Cục An toàn thông tin, Bộ Công an)",
      "publishedDate": "Thời gian (ví dụ: Tháng 10/2026 hoặc gần đây)",
      "summary": "Tóm tắt chi tiết diễn biến thủ đoạn của kẻ lừa đảo",
      "warningSigns": ["Dấu hiệu 1", "Dấu hiệu 2"],
      "advice": "Lời khuyên phòng tránh khẩn cấp cho người dân và học sinh",
      "url": "Đường link tham khảo nếu có"
    }
  ],
  "rawSummary": "Nhận định chung về xu hướng tội phạm công nghệ cao trong tháng này"
}`;

  let lastError: any = null;

  for (const model of models) {
    try {
      // Với Gemini API, kích hoạt Google Search Grounding nếu SDK hỗ trợ
      const config: any = {
        responseMimeType: 'application/json',
      };

      // Chỉ bật googleSearch cho gemini provider
      if (provider === 'gemini') {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config,
      });

      const responseText = response.text || '';
      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // Fallback extract json block if wrapped in markdown
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error('Không thể phân tích dữ liệu cập nhật từ AI.');
        }
      }

      return {
        updatedAt: new Date().toLocaleString('vi-VN'),
        modelUsed: model,
        totalFound: parsed.totalFound || parsed.items?.length || 0,
        items: parsed.items || [],
        rawSummary: parsed.rawSummary || 'Cập nhật thành công các thủ đoạn mới nhất.',
      };
    } catch (err: any) {
      lastError = err;
      const errType = parseApiError(err);
      if (errType === 'INVALID_API_KEY') {
        throw new Error('API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại trong Cài đặt.');
      }
      if (errType === 'QUOTA_EXCEEDED') {
        throw new Error('Đã hết quota hoặc vượt giới hạn tốc độ API. Vui lòng đợi rồi thử lại.');
      }
      // MODEL_OVERLOADED hoặc lỗi mạng -> tiếp tục thử model tiếp theo trong chuỗi fallback
      console.warn(`Model ${model} thất bại (${errType}), đang chuyển sang model dự phòng...`);
    }
  }

  throw lastError || new Error('Tất cả các model AI đều đang bận. Vui lòng thử lại sau.');
};

/**
 * Tính năng AI 2: Tư vấn & Thẩm định hành vi lừa đảo qua văn bản hoặc giọng nói
 */
export const analyzeScamScenario = async (
  apiKey: string,
  scenarioText: string,
  provider: AiProvider = 'gemini',
  selectedModel?: string
): Promise<ScamAnalysisResult> => {
  const client = createGoogleAiClient(apiKey, provider);
  const models = getOrderedModels(selectedModel, provider);

  const prompt = `Bạn là Trợ lý An toàn Số và Chuyên gia An ninh mạng thuộc Cục An toàn thông tin.
Người dùng (học sinh, phụ huynh hoặc người dân) đang gửi đến một tình huống nghi ngờ mà họ vừa gặp phải (qua tin nhắn, cuộc gọi, email, mạng xã hội hoặc lời mời việc làm/tài chính):

=== NỘI DUNG TÌNH HUỐNG CẦN THẨM ĐỊNH ===
"${scenarioText}"
========================================

Hãy phân tích toàn diện, đối chiếu với 24 thủ đoạn lừa đảo phổ biến trong Cẩm nang An toàn số Việt Nam và trả về kết quả dưới định dạng JSON (application/json):
{
  "isScam": true/false,
  "confidenceScore": 95, // điểm từ 0 đến 100 (độ tin cậy của kết luận lừa đảo)
  "riskLevel": "CỰC KỲ NGUY HIỂM", // Chọn một trong: "AN TOÀN", "ĐÁNG NGỜ", "NGUY HIỂM CAO", "CỰC KỲ NGUY HIỂM"
  "identifiedTactics": ["Tên thủ đoạn 1 (ví dụ: Giả danh Công an)", "Thủ đoạn 2 nếu có"],
  "analysisReasoning": "Giải thích chi tiết vì sao đây là hành vi lừa đảo, kẻ xấu đang nhắm đến mục đích gì, tâm lý nào bị thao túng",
  "warningSignsFound": ["Dấu hiệu vi phạm 1 phát hiện trong nội dung", "Dấu hiệu 2"],
  "emergencyActions": [
    "Hành động khẩn cấp 1 (ví dụ: Tuyệt đối không chuyển tiền)",
    "Hành động khẩn cấp 2 (ví dụ: Khóa thẻ ngân hàng tạm thời nếu đã lỡ nhập thông tin)",
    "Hành động 3"
  ]
}`;

  let lastError: any = null;

  for (const model of models) {
    try {
      const config: any = {
        responseMimeType: 'application/json',
      };

      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config,
      });

      const responseText = response.text || '';
      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error('Không thể phân tích dữ liệu thẩm định từ AI.');
        }
      }

      const score = typeof parsed.confidenceScore === 'number' ? parsed.confidenceScore : 85;
      let level: 'AN TOÀN' | 'ĐÁNG NGỜ' | 'NGUY HIỂM CAO' | 'CỰC KỲ NGUY HIỂM' = parsed.riskLevel || 'ĐÁNG NGỜ';
      let color = 'text-amber-500 bg-amber-500/10 border-amber-500/30';

      if (level === 'AN TOÀN' || score < 30) {
        level = 'AN TOÀN';
        color = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      } else if (level === 'ĐÁNG NGỜ' || (score >= 30 && score < 70)) {
        level = 'ĐÁNG NGỜ';
        color = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      } else if (level === 'NGUY HIỂM CAO' || (score >= 70 && score < 90)) {
        level = 'NGUY HIỂM CAO';
        color = 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      } else {
        level = 'CỰC KỲ NGUY HIỂM';
        color = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      }

      return {
        isScam: Boolean(parsed.isScam),
        confidenceScore: score,
        riskLevel: level,
        dangerColor: color,
        identifiedTactics: parsed.identifiedTactics || ['Thủ đoạn lừa đảo qua mạng'],
        analysisReasoning: parsed.analysisReasoning || 'Phát hiện nhiều dấu hiệu bất thường trùng khớp với các kịch bản lừa đảo đã được cảnh báo.',
        warningSignsFound: parsed.warningSignsFound || ['Yêu cầu chuyển tiền hoặc cung cấp thông tin bảo mật khẩn cấp'],
        emergencyActions: parsed.emergencyActions || [
          'Tuyệt đối không chuyển tiền vào tài khoản người lạ',
          'Không chia sẻ mã OTP hoặc mật khẩu đăng nhập',
          'Xác minh trực tiếp qua số điện thoại chính thức',
        ],
        hotlines: [
          { name: 'Cảnh sát 113', number: '113' },
          { name: 'Đường dây nóng Cục An toàn thông tin', number: '156' },
          { name: 'Cục An ninh mạng (A05)', number: '069.234.8560' },
        ],
        modelUsed: model,
      };
    } catch (err: any) {
      lastError = err;
      const errType = parseApiError(err);
      if (errType === 'INVALID_API_KEY') {
        throw new Error('API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại trong Cài đặt.');
      }
      if (errType === 'QUOTA_EXCEEDED') {
        throw new Error('Đã hết quota hoặc vượt giới hạn tốc độ API. Vui lòng đợi rồi thử lại.');
      }
      console.warn(`Model ${model} phân tích thất bại (${errType}), chuyển fallback...`);
    }
  }

  throw lastError || new Error('Tất cả các model AI đều đang bận. Vui lòng thử lại sau.');
};
