export interface Competition {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  deadline: string;
  prize: string;
  featured: boolean;
}

export const competitions: Competition[] = [
  {
    id: '1',
    title: 'Cuộc Thi Lập Trình Hackathon 2025',
    description: 'Thử thách kỹ năng lập trình của bạn trong 48 giờ với các bài toán thực tế',
    fullDescription: `
# Giới thiệu
Hackathon 2025 là cuộc thi lập trình lớn nhất dành cho sinh viên trong năm. Đây là cơ hội tuyệt vời để bạn thể hiện kỹ năng, học hỏi từ các chuyên gia và kết nối với cộng đồng công nghệ.

## Thể lệ
- Làm việc theo nhóm 3-5 người
- Thời gian: 48 giờ liên tục
- Sử dụng bất kỳ công nghệ nào bạn muốn
- Phải có demo sản phẩm cuối cùng

## Tiêu chí đánh giá
1. Tính sáng tạo và độc đáo (30%)
2. Kỹ thuật và chất lượng code (30%)
3. Tính ứng dụng thực tế (25%)
4. Presentation và demo (15%)

## Giải thưởng
- Giải Nhất: 30,000,000 VNĐ + Cơ hội thực tập tại các công ty công nghệ hàng đầu
- Giải Nhì: 20,000,000 VNĐ
- Giải Ba: 10,000,000 VNĐ
- 5 giải khuyến khích: 2,000,000 VNĐ/giải
    `,
    image: 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBoYWNrYXRob258ZW58MXx8fHwxNzYzMzA1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Công nghệ',
    deadline: '30/12/2025',
    prize: '30,000,000 VNĐ',
    featured: true,
  },
  {
    id: '2',
    title: 'Cuộc Thi Ý Tưởng Khởi Nghiệp',
    description: 'Biến ý tưởng thành hiện thực với sự hỗ trợ từ các nhà đầu tư và chuyên gia',
    fullDescription: `
# Về cuộc thi
Cuộc Thi Ý Tưởng Khởi Nghiệp là nơi các sinh viên có thể trình bày ý tưởng kinh doanh của mình trước các nhà đầu tư và nhận được mentorship từ các doanh nhân thành công.

## Yêu cầu tham gia
- Sinh viên đang học tại các trường đại học tại Việt Nam
- Có ý tưởng kinh doanh khả thi
- Chuẩn bị bài thuyết trình 10 phút
- Kế hoạch kinh doanh chi tiết

## Quy trình
1. Nộp hồ sơ và kế hoạch kinh doanh
2. Vòng sơ loại: Đánh giá hồ sơ
3. Vòng chung kết: Thuyết trình trực tiếp

## Phần thưởng
- Giải Nhất: 50,000,000 VNĐ + Vốn đầu tư tiềm năng lên đến 500,000,000 VNĐ
- Giải Nhì: 30,000,000 VNĐ
- Giải Ba: 20,000,000 VNĐ
- Mentorship 6 tháng từ các chuyên gia
    `,
    image: 'https://images.unsplash.com/photo-1563807893646-b6598a2b6fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3NjMzMDE4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Kinh doanh',
    deadline: '15/01/2026',
    prize: '50,000,000 VNĐ',
    featured: true,
  },
  {
    id: '3',
    title: 'Cuộc Thi Thiết Kế Đồ Họa',
    description: 'Thể hiện tài năng thiết kế của bạn qua các dự án sáng tạo',
    fullDescription: `
# Giới thiệu cuộc thi
Cuộc Thi Thiết Kế Đồ Họa dành cho các sinh viên yêu thích nghệ thuật và thiết kế. Đây là cơ hội để bạn thể hiện phong cách riêng và nhận được sự công nhận từ cộng đồng.

## Thể loại thi
1. Logo Design
2. Poster Design
3. UI/UX Design
4. Illustration

## Yêu cầu
- Nộp tối thiểu 3 tác phẩm
- File định dạng AI, PSD hoặc Figma
- Kèm theo mô tả ý tưởng

## Tiêu chí chấm
- Tính sáng tạo (40%)
- Kỹ thuật thực hiện (30%)
- Tính thẩm mỹ (20%)
- Tính ứng dụng (10%)

## Giải thưởng
- Giải Nhất mỗi thể loại: 15,000,000 VNĐ
- Giải Nhì mỗi thể loại: 10,000,000 VNĐ
- Giải Ba mỗi thể loại: 5,000,000 VNĐ
    `,
    image: 'https://images.unsplash.com/photo-1762242664262-7f275eb8e007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjb250ZXN0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYzMzA1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Thiết kế',
    deadline: '20/01/2026',
    prize: '15,000,000 VNĐ',
    featured: true,
  },
  {
    id: '4',
    title: 'Cuộc Thi Thuyết Trình Tiếng Anh',
    description: 'Rèn luyện kỹ năng giao tiếp và thuyết trình bằng tiếng Anh',
    fullDescription: `
# Về cuộc thi
Cuộc Thi Thuyết Trình Tiếng Anh nhằm khuyến khích sinh viên phát triển kỹ năng giao tiếp quốc tế và tư duy phản biện.

## Chủ đề
- Education & Technology
- Environmental Sustainability
- Social Innovation
- Global Leadership

## Quy định
- Thời gian thuyết trình: 7-10 phút
- Q&A: 5 phút
- Sử dụng slide thuyết trình
- Không được đọc theo kịch bản

## Vòng thi
1. Vòng loại: Nộp video thuyết trình
2. Vòng bán kết: 30 thí sinh xuất sắc nhất
3. Chung kết: 10 thí sinh

## Giải thưởng
- Giải Nhất: 20,000,000 VNĐ + Học bổng khóa học tiếng Anh
- Giải Nhì: 12,000,000 VNĐ
- Giải Ba: 8,000,000 VNĐ
    `,
    image: 'https://images.unsplash.com/photo-1660794483744-d6c7ab2ac6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBldGl0aW9uJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2MzMwNTAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Kỹ năng mềm',
    deadline: '10/02/2026',
    prize: '20,000,000 VNĐ',
    featured: false,
  },
  {
    id: '5',
    title: 'Cuộc Thi Dự Án Cộng Đồng',
    description: 'Tạo ra tác động tích cực cho cộng đồng và xã hội',
    fullDescription: `
# Tổng quan
Cuộc Thi Dự Án Cộng Đồng khuyến khích sinh viên phát triển các dự án có ý nghĩa xã hội, mang lại giá trị thực tế cho cộng đồng.

## Hướng dự án
- Giáo dục cho trẻ em vùng cao
- Bảo vệ môi trường
- Hỗ trợ người khuyết tật
- Phát triển nông thôn

## Yêu cầu
- Dự án phải được triển khai thực tế
- Báo cáo kết quả và tác động
- Video documentary về dự án
- Kế hoạch phát triển dài hạn

## Đánh giá
- Tính khả thi (25%)
- Tác động xã hội (30%)
- Tính bền vững (25%)
- Sáng tạo trong giải pháp (20%)

## Giải thưởng
- Giải Nhất: 40,000,000 VNĐ + Quỹ hỗ trợ tiếp tục dự án
- Giải Nhì: 25,000,000 VNĐ
- Giải Ba: 15,000,000 VNĐ
    `,
    image: 'https://images.unsplash.com/photo-1640163561346-7778a2edf353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHRlYW0lMjB3b3JraW5nfGVufDF8fHx8MTc2MzMwNTAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Xã hội',
    deadline: '28/02/2026',
    prize: '40,000,000 VNĐ',
    featured: false,
  },
  {
    id: '6',
    title: 'Cuộc Thi Nghiên Cứu Khoa Học',
    description: 'Khám phá và nghiên cứu các vấn đề khoa học đương đại',
    fullDescription: `
# Giới thiệu
Cuộc Thi Nghiên Cứu Khoa Học dành cho các sinh viên đam mê khoa học và muốn đóng góp vào sự phát triển của tri thức.

## Lĩnh vực
- Khoa học tự nhiên
- Công nghệ thông tin
- Y học và sức khỏe
- Khoa học xã hội

## Yêu cầu bài dự thi
- Bài báo khoa học (8-12 trang)
- Dữ liệu và phương pháp nghiên cứu rõ ràng
- Tham khảo tài liệu chuẩn mực
- Poster thuyết trình

## Quy trình
1. Nộp bài báo và abstract
2. Phản biện bởi hội đồng khoa học
3. Thuyết trình poster tại hội nghị

## Giải thưởng
- Giải Nhất mỗi lĩnh vực: 25,000,000 VNĐ + Xuất bản bài báo
- Giải Nhì: 15,000,000 VNĐ
- Giải Ba: 10,000,000 VNĐ
    `,
    image: 'https://images.unsplash.com/photo-1660795468951-0b37051eb1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29tcGV0aXRpb24lMjBhd2FyZHxlbnwxfHx8fDE3NjMzMDQ5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Nghiên cứu',
    deadline: '31/03/2026',
    prize: '25,000,000 VNĐ',
    featured: false,
  },
];
