# Sinh Viên Secondhand Design System (Warm & Community-Driven)

- **Project:** Nền tảng Trao đổi & Mua bán Đồ Secondhand Sinh viên
- **Brand Color:** `#D35400` (Terracotta / Cam gạch ấm)
- **Style Direction:** Ấm áp, mộc mạc, gần gũi, an toàn và đề cao tính cộng đồng sinh viên.

---

## 1) Design Principles

- **Warm & Low-Glare Surfaces:** Sử dụng nền kem ấm `#FAF6F0` và sắc chữ nâu đất `#2D241E` thay cho nền trắng tinh và chữ đen tuyền `#000000`. Giảm hiện tượng chói lóa khi lướt web ban đêm ở ký túc xá, tạo cảm giác mộc mạc, chân thực.
- **Soft & Friendly Geometry:** Thay thế hoàn toàn các góc nhọn cơ học bằng hệ bo góc mềm (`8px` – `14px`) và dạng viên thuốc (`pill radius`). Giao diện tạo cảm giác dễ chịu, khuyến khích sự chia sẻ và gắn kết sinh viên.
- **Eco & Campus Transparency:** Đặt trọng tâm vào các hành vi đặc thù: tặng đồ 0đ, giao lưu giáo trình, công khai độ mới sản phẩm và hiển thị rõ ràng vị trí khuôn viên trường/KTX để giao dịch trực tiếp.
- **Gentle & Trustworthy Motion:** Chuyển động nhẹ nhàng (gentle lift `translateY(-1px)` đến `-2px`) mang lại cảm giác an tâm, tránh các hiệu ứng nảy mạnh hoặc giật gắt mang tính thương mại dồn dập.

---

## 2) Color System

### Core Palette

| Role | Token | Hex | Hướng dẫn ứng dụng |
| :--- | :--- | :--- | :--- |
| Brand Primary | `--brand-500` | `#D35400` | Nút hành động chính (Đăng tin, Mua ngay), liên kết quan trọng, trạng thái active. |
| Brand Hover | `--brand-600` | `#B94600` | Hiệu ứng hover/nhấn giữ cho nút hành động chính. |
| Brand Active | `--brand-700` | `#9C3B00` | Trạng thái active khi nhấn nút chính. |
| Secondary / Eco | `--secondary-500` | `#1E824C` | Nhãn & nút "Đổi đồ", "Tặng 0đ", huy hiệu uy tín, trạng thái thành công. |
| Secondary Hover | `--secondary-600` | `#16683C` | Hover cho các hành động liên quan đến trao đổi/sinh thái. |
| Accent / Highlight | `--accent-500` | `#E67E22` | Badge giảm giá, pass rẻ, tin nổi bật, cảnh báo nhẹ. |
| Background Canvas | `--bg-canvas` | `#FAF6F0` | Nền toàn trang (kem mộc, hạn chế mỏi mắt). |
| Surface Card/Modal | `--surface-card` | `#FFFFFF` | Nền thẻ sản phẩm, dropdown menu, modal nổi bật trên nền canvas. |
| Surface Muted / Inset | `--surface-muted` | `#F3E9DD` | Nền ô input nhập liệu, nền thẻ phụ, avatar mặc định. |
| Surface Accent Tint | `--surface-accent` | `#FDF3E1` | Nền banner gợi ý, dải màu chuyển nhẹ, hover của nút secondary. |
| Text Primary | `--text-primary` | `#2D241E` | Tiêu đề, tên vật phẩm, giá tiền (nâu đen ấm thay vì đen thuần). |
| Text Secondary / Muted | `--text-muted` | `#756A63` | Mô tả ngắn, thời gian đăng, tên trường/khu KTX người đăng. |
| Text Disabled | `--text-disabled` | `#9E928A` | Văn bản placeholder, nhãn nút bị vô hiệu hóa. |
| Border / Divider | `--border-subtle` | `#E6DACD` | Đường viền thẻ, viền input mặc định, đường phân chia nội dung. |

### Semantic Colors

| Role | Token | Hex | Hướng dẫn ứng dụng |
| :--- | :--- | :--- | :--- |
| Success / Eco Badge | `--success-500` | `#1E824C` | Xác nhận gửi yêu cầu đổi thành công, hoàn tất giao dịch. |
| Success Background | `--success-50` | `#E8F5E9` | Nền toast/alert thành công. |
| Warning / Campus Alert | `--warning-500` | `#E67E22` | Cảnh báo hẹn gặp an toàn, tin đang chờ duyệt. |
| Warning Background | `--warning-50` | `#FDF3E1` | Nền hộp thông báo an toàn giao dịch tại trường. |
| Error / Danger | `--error-500` | `#C0392B` | Báo cáo bài đăng gian lận, cảnh báo rủi ro, lỗi form. |
| Error Background | `--error-50` | `#FBECEB` | Nền thông báo lỗi và cảnh báo lừa đảo. |

---

## 3) Typography

Kết hợp hai bộ font chuẩn Unicode tối ưu hiển thị tiếng Việt, vừa chỉn chu vừa trẻ trung:

- **Heading:** `Be Vietnam Pro` (Cấu trúc chắc chắn, ấm áp, hiển thị dấu tiếng Việt rõ ràng)
- **Body / UI:** `Plus Jakarta Sans` (Nét bo cong hiện đại, độ thoáng tốt, dễ đọc danh mục và thông số)

```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

### Type Scale

| Token | Font Family | Size / Line Height | Weight | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| `--text-display` | Be Vietnam Pro | 40px / 48px | Bold (700) | Banner trang chủ, khẩu hiệu chiến dịch dọn KTX |
| `--text-h1` | Be Vietnam Pro | 32px / 40px | Bold (700) | Tiêu đề trang chi tiết sản phẩm, tiêu đề trang quản lý |
| `--text-h2` | Be Vietnam Pro | 24px / 32px | Semibold (600) | Tiêu đề khối chuyên mục ("Đồ tặng 0đ", "Sách giáo trình") |
| `--text-h3` | Be Vietnam Pro | 18px / 26px | Semibold (600) | Tiêu đề thẻ sản phẩm, tiêu đề modal/hộp thoại |
| `--text-body-lg` | Plus Jakarta Sans | 16px / 24px | Regular (400) | Giới thiệu, mô tả chi tiết bài viết, lưu ý giao dịch |
| `--text-body` | Plus Jakarta Sans | 15px / 22px | Regular (400) | Nội dung mô tả thẻ sản phẩm, form field input |
| `--text-body-sm` | Plus Jakarta Sans | 13px / 18px | Regular (400) | Vị trí KTX, tên trường đại học, thời gian đăng tin |
| `--text-caption` | Plus Jakarta Sans | 12px / 16px | Medium (500) | Badge độ mới ("Mới 90%"), nhãn trạng thái giao dịch |

---

## 4) Warm Shadow System

Tránh bóng đen gắt (`rgba(0,0,0,...)`). Toàn bộ bóng được đổ theo tông nâu đất `--text-primary` (`#2D241E`) để hòa quyện tự nhiên trên nền kem ấm:

| Token | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--shadow-warm-xs` | `0 1px 3px rgba(45, 36, 30, 0.04)` | Chip danh mục, badge trạng thái |
| `--shadow-warm-sm` | `0 2px 8px rgba(45, 36, 30, 0.05)` | Thẻ sản phẩm ở trạng thái nghỉ, thanh tìm kiếm |
| `--shadow-warm-md` | `0 4px 14px rgba(45, 36, 30, 0.08)` | Thẻ sản phẩm khi hover, dropdown menu bộ lọc |
| `--shadow-warm-lg` | `0 8px 24px rgba(45, 36, 30, 0.12)` | Modal xác nhận đổi đồ, toast thông báo nổi |
| `--shadow-focus` | `0 0 0 3px rgba(211, 84, 0, 0.18)` | Vòng glow khi focus ô input hoặc nút bấm |

---

## 5) Border Radius System

Hệ bo góc mềm mại, gần gũi, loại bỏ hoàn toàn các góc sắc nhọn:

| Token | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--radius-xs` | `6px` | Checkbox, nhãn metadata phụ, icon background nhỏ |
| `--radius-sm` | `8px` | Ô input, thanh search, nút phụ, toast notification |
| `--radius-md` | `10px` | Nút chính (Primary/Eco Button), dropdown menu |
| `--radius-lg` | `14px` | Thẻ sản phẩm (Product Card), khối banner nhỏ |
| `--radius-xl` | `20px` | Modal giao dịch, bottom sheet trên mobile, banner lớn |
| `--radius-pill` | `9999px` | Badges tình trạng ("Đổi đồ", "0đ"), chip lọc, avatar |

---

## 6) Effects and Motion

### Surface Effects
- Phân cách các section bằng khoảng trống (white-space) thay vì kẻ viền cứng.
- Sử dụng viền mảnh nhẹ nhàng khi cần bao khung: `border: 1px solid var(--border-subtle)` (`#E6DACD`).
- Vùng banner nổi bật sử dụng chuyển màu êm dịu:
  ```css
  background: linear-gradient(180deg, #FAF6F0 0%, #FDF3E1 100%);
  ```

### Interaction Effects
- **Hover State:** Thẻ sản phẩm và nút bấm nhấc nhẹ lên để tạo chiều sâu tự nhiên:
  `transform: translateY(-2px);` kết hợp chuyển bóng từ `--shadow-warm-sm` sang `--shadow-warm-md`.
- **Press State:** Co nhẹ khi click: `transform: scale(0.98);`.
- **Transitions:**
  - Nhanh (Buttons, Icons, Links): `150ms ease-out`
  - Tiêu chuẩn (Card hover, Accordion): `250ms cubic-bezier(0.25, 0.8, 0.25, 1)`

---

## 7) Component-Level Rules

### Buttons
- **Primary Button (Đăng tin, Mua ngay, Xác nhận):**
  - Nền `#D35400`, chữ `#FFFFFF`, bo góc `10px` (`--radius-md`).
  - Hover: Nền `#B94600`, `transform: translateY(-1px)`.
  - Active: Nền `#9C3B00`, `transform: scale(0.98)`.
- **Secondary / Outline Button (Lọc danh mục, Nhắn tin):**
  - Nền trong suốt hoặc `#FAF6F0`, viền `1.5px solid #D35400`, chữ `#D35400`, bo góc `10px`.
  - Hover: Nền `#FDF3E1`.
- **Eco / Trade Button (Đặc thù: "Đổi đồ", "Nhận tặng 0đ"):**
  - Nền `#1E824C`, chữ `#FFFFFF`, bo góc `10px`.
  - Hover: Nền `#16683C`.
- **Disabled Button:**
  - Nền `#E6DACD`, chữ `#9E928A`, con trỏ `not-allowed`.

### Product Cards (Thẻ trung tâm của sàn sinh viên)
- **Khung thẻ:** Nền `#FFFFFF`, viền `1px solid #EFE6DC`, bo góc `14px` (`--radius-lg`), `overflow: hidden`, bóng `--shadow-warm-sm`.
- **Ảnh sản phẩm (Thumbnail):** Tỉ lệ 1:1 hoặc 4:3. Khi sản phẩm đã hoàn tất giao dịch, giảm `opacity: 0.5` kèm overlay chữ "Đã trao đổi".
- **Hệ thống Badges trên ảnh:**
  - **Góc trên (Loại giao dịch):** Dạng viên thuốc (`--radius-pill`), đệm `4px 10px`, font size `12px` đậm.
    - Đổi đồ: Nền `#1E824C`, chữ trắng.
    - Pass rẻ: Nền `#E67E22`, chữ trắng.
    - Tặng miễn phí 0đ: Nền `#27AE60`, chữ trắng.
  - **Góc dưới (Độ mới):** Nền `rgba(45, 36, 30, 0.7)`, chữ trắng, bo góc `6px` (`--radius-xs`), nội dung ví dụ: "Mới 90%".
- **Nội dung thẻ:**
  - **Tên vật phẩm:** Màu `#2D241E`, font-weight 600, tối đa 2 dòng (`line-clamp-2`).
  - **Giá / Nhu cầu đổi:** Màu `#D35400`, font-size `16px`, font-weight 700 (hoặc hiển thị "Giao lưu giáo trình KTX").
  - **Metadata người đăng:** Avatar nhỏ + Tên sinh viên, đi kèm icon định vị và vị trí cụ thể (VD: *KTX Khu B, ĐHQG*), màu `#756A63`, font-size `13px`.

### Inputs & Campus Search Bar
- **Trạng thái mặc định:** Nền `#FFFFFF` (hoặc `#F3E9DD` trên nền trắng), viền `1px solid #E6DACD`, bo góc `8px` (`--radius-sm`), chữ `#2D241E`, placeholder `#9E928A`.
- **Trạng thái Focus:** Viền `1.5px solid #D35400`, bóng `--shadow-focus`.
- **Trạng thái Lỗi:** Viền `1.5px solid #C0392B`, thông báo lỗi bên dưới màu `#C0392B`, font-size `12px`.
- **Campus Search Bar:** Tích hợp icon kính lúp màu `#756A63`, hỗ trợ ghim chip lọc nhanh theo khu vực (Khu A, Khu B, Cơ sở 1).

### Community Safety Alerts (Hộp nhắc nhở an toàn sinh viên)
- **Alert An toàn giao dịch:** Nền `#FDF3E1`, viền `1px solid #F5D7B2`, bo góc `10px` (`--radius-md`). Icon khiên/bóng đèn màu `#D35400`. Chữ `#2D241E`: *"Ưu tiên hẹn gặp trực tiếp tại sảnh KTX hoặc căn tin trường để kiểm tra đồ trước khi trao đổi."*
- **Alert Cảnh báo rủi ro:** Nền `#FBECEB`, viền `1px solid #F5C6CB`, icon `#C0392B`, chữ `#5C1D16`.

### Toast Notifications
- Nền `#FFFFFF`, bo góc `8px` (`--radius-sm`), viền trái `4px solid`, bóng `--shadow-warm-lg`.
- **Success:** Viền trái & icon `#1E824C`.
- **Error:** Viền trái & icon `#C0392B`.
- **Info / Đề nghị đổi:** Viền trái & icon `#E67E22`.

---

## 8) Anti-Patterns

- **Không dùng góc bo sắc nhọn (0px – 4px):** Tránh tạo cảm giác khô khan, mang tính công nghiệp kỹ thuật thay vì một cộng đồng trường học thân thiện.
- **Không dùng màu đen thuần `#000000` và xám lạnh `#F4F5F7`:** Làm mất đi độ mộc mạc và cảm giác ấm áp đặc trưng của Palette 4.
- **Không dùng bóng đổ màu đen gắt (`rgba(0,0,0,0.2)`):** Bóng đen làm đục nền kem ấm; luôn pha bóng từ sắc nâu `--text-primary`.
- **Không giấu thông tin địa điểm (Ký túc xá / Phân hiệu):** Vị trí là yếu tố tiên quyết giúp sinh viên trao đổi trực tiếp không cần trung gian vận chuyển.
- **Không dùng animation giật nảy (flashy/bouncy):** Giữ chuyển động điềm tĩnh, mượt mà để củng cố sự tin cậy.

---

## 9) Implementation Note

Tất cả các thành phần UI khi hiện thực hóa qua Tailwind CSS hoặc CSS Tokens cần kế thừa nền canvas `--bg-canvas` (`#FAF6F0`) và hệ bo góc từ `--radius-sm` trở lên để đảm bảo tính đồng nhất trên toàn hệ thống.