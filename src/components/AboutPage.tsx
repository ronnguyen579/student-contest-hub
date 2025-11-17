import Layout from './Layout';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Mail, Phone, GraduationCap } from 'lucide-react';

interface TeamMember {
  name: string;
  studentId: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Nguyễn Khải Toàn',
    studentId: '25127158',
    role: 'Product Owner',
    bio: 'Chịu trách nhiệm định hướng sản phẩm và đảm bảo giá trị mang lại cho người dùng. Có khả năng phân tích yêu cầu và tạo ra product backlog hiệu quả. Luôn lắng nghe feedback và tối ưu trải nghiệm người dùng.',
    avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/566252843_1334651521487628_6998919804419401349_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeFeVOFf24UwZ-tsH8-QkHpdlKzpJpy97E-UrOkmnL3sT004leizv7GfGiv6F8Mz2Vqbo4taE025zZ2mY5q4Fklw&_nc_ohc=jWrR5xiy9YAQ7kNvwFwG9Em&_nc_oc=AdkkXjNYxbpKjN8o--DVq4_nL-rpojERkQGK0o5mo5yIZ_sgDJwd_mHhzsXf5Wn8ehKp4D1WxH-o4Mczk3dpr3jr&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=RrHbBFbW_1nQzw71wAfkPA&oh=00_AfjDlfDzAdUwWDR-Ej_j0nv548paG2HIrY-T98yF7sBVBw&oe=691FC361',
    email: 'nktoan2508@clc.fitus.edu.vn',
    skills: ['Product Management', 'User Research', 'Agile', 'Jira'],
  },
  {
    name: 'Võ Trần Nhật Hạ',
    studentId: '25127043',
    role: 'Scrum Master',
    bio: 'Hỗ trợ team áp dụng Scrum framework hiệu quả. Đảm bảo quy trình làm việc suôn sẻ và loại bỏ các rào cản cho team. Tổ chức các buổi daily standup, sprint planning và retrospective.',
    avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/540697633_800157189133089_7157891565473003526_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeErzH4Ich5AJe0fYyNog-zxxvTrBhp-Nn7G9OsGGn42ftlgMNkdHXiCu5LmxnAJ9-bO1eksmwFKj2IbAcP8olpT&_nc_ohc=HSSSjuGykIQQ7kNvwFdQH3P&_nc_oc=AdlQnJKdj14sdLN5aMwMoTp2hNPKKp5hDhyOW1l8Xngixk8jnzkpfLh4HG5hIZ4gRBZM13bwtjY4OBe1kIbPMgMT&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=6VxoV9uf3YH6J2xfY9pcIw&oh=00_AfhCF-NuLNCmAhr8w_qrxnr4zjBgepIdoeSeoYbYxsmHBw&oe=691FD1B8',
    email: 'vtnha2532@clc.fitus.edu.vn',
    skills: ['Scrum', 'Agile', 'Team Facilitation', 'Coaching'],
  },
  {
    name: 'Mai Trung Hiếu',
    studentId: '25127329',
    role: 'Scrum Master',
    bio: 'Đồng hành cùng team trong việc áp dụng các phương pháp Agile. Tạo môi trường làm việc tích cực và khuyến khích sự hợp tác giữa các thành viên. Liên tục cải tiến quy trình làm việc.',
    avatar: 'https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/558128872_1980768262769194_4444543286951810760_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHytVhTDD88d4D0V1k5ffLpVh6WTO7Hw2dWHpZM7sfDZwoWC9sFigOQov322LT9YIfPLlUeuU_A5gqZNCkfaBMs&_nc_ohc=PDuHDk6MvlEQ7kNvwH8Lcoh&_nc_oc=AdmtfQTmd7AvF8DKLqcEfkHu3N45OrsENE10BuLloDGpT9sOfvyQNfHoJulF2jevF_WvY8R2kj3bOaAlNRADkVEn&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=BHoLMoswCwSRaHslqCP9cA&oh=00_AfiOR_4eqmhicixtpswnRilYguhE_kH1ofinLxW1t2JDLw&oe=691FA510',
    email: 'mthieu2537@clc.fitus.edu.vn',
    skills: ['Scrum', 'Kanban', 'Sprint Planning', 'Retrospectives'],
  },
  {
    name: 'Hiếu Anh Thư',
    studentId: '25127240',
    role: 'Backend Developer',
    bio: 'Chuyên phát triển backend với kinh nghiệm xây dựng API RESTful và quản lý cơ sở dữ liệu. Đảm bảo hiệu suất và bảo mật cho hệ thống. Luôn tìm kiếm giải pháp tối ưu nhất.',
    avatar: 'https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/489759121_1772339499999481_4285065207911563376_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=669761&_nc_eui2=AeHeLJRBAe3smdM5rWqdrvSF27BawxsHFbTbsFrDGwcVtDabzUykKn9JknJOZev3JM_prIFdlqkzJYDe3FAgsrei&_nc_ohc=0JM0mkwtfgkQ7kNvwFS_qaR&_nc_oc=Adn48FzBOBDmNtuAm1D0o0G2uElUXriyRCRC9HcKk6_QM96o3tmxspawOUYmH1i7y67giZVqzx9LXyQZb4Imw9W0&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=uv57WjI1PGk_xj3ZXqnG_w&oh=00_AfiF6lzAECDmKmXTSFzfLTaana55pdBCXlioNF1AuJvTSQ&oe=691FAA0F',
    email: 'hathu2518@clc.fitus.edu.vn',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'API Design'],
  },
  {
    name: 'Nguyễn Quốc Khánh',
    studentId: '25127076',
    role: 'Frontend Developer',
    bio: 'Đam mê tạo ra giao diện người dùng đẹp mắt và responsive. Có kinh nghiệm với React và các framework hiện đại. Chú trọng đến UX và accessibility trong mọi sản phẩm.',
    avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/581841659_1516340586293804_3138000359126933339_n.png?_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFcBxALm5JVUz73A7WThFwea_stXtuSJHtr-y1e25Ikex6HUNUj75FZ16oM0XaWSKKsGsP898Q2ce-GUJvuWTAV&_nc_ohc=0i1dRD99TaAQ7kNvwEF2wz4&_nc_oc=AdmPhV8dNWfzOLt_UueAsH07XQsZMo5XmTqzokASxSrLoqEXOWROqCflGSaXTRRpYBDBGJxwASeSV1KzyeIGZmLI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&oh=03_Q7cD3wEy0x43A_zsz7zu6dXlkDJOkIDJBy3SQxWAVT5zL-zTzQ&oe=69417337',
    email: 'nqkhanh2510@clc.fitus.edu.vn',
    skills: ['React', 'TypeScript', 'CSS', 'Responsive Design'],
  },
  {
    name: 'Trần Kiến Quốc',
    studentId: '25127456',
    role: 'Backend Developer',
    bio: 'Tập trung vào phát triển backend và tối ưu hóa hiệu suất hệ thống. Có kinh nghiệm với microservices và cloud architecture. Luôn cập nhật các công nghệ backend mới nhất.',
    avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/580566907_1645089263122402_6878575250182840908_n.png?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGaMO0XF8ehTg-mJwgMwUK8oFvYjvegATigW9iO96ABOD-LXrvSS74PvZ7qAQzUnMQVteOPemPfX8n6tftRbL8t&_nc_ohc=WSb9KjSIwpIQ7kNvwFGyhVL&_nc_oc=Adn-o1AT678mn7WpTFpWgWc329Uq_wwFam8D9PSx0LUPMLBROCog3sSa-NW_gNbdgNW6dhqBtymm9FSPok2tQq8F&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&oh=03_Q7cD3wFZIuDWynzRU4_M9QcW8GNhhpcArkXz9jJI9tZ9qNnTAw&oe=69414E06',
    email: 'tkquoc2526@clc.fitus.edu.vn',
    skills: ['Python', 'Django', 'MongoDB', 'Redis'],
  },
  {
    name: 'Trương Hồng Minh',
    studentId: '25127425',
    role: 'Frontend Developer',
    bio: 'Chuyên về frontend development với focus vào performance và user experience. Thích thú với animation và interactive design. Luôn theo đuổi pixel-perfect implementation.',
    avatar: 'https://scontent-hkg1-1.xx.fbcdn.net/v/t1.15752-9/582971214_693710210472971_6862590945281007576_n.png?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHMTlR0HTuraC6u5MCIhNLuU15ROWDvdghTXlE5YO92CDHjmj2iXaNwAWSzUr6ylvftszEis8zwa78tJgGA_Zcn&_nc_ohc=rURxX1sLGTYQ7kNvwGC5Rla&_nc_oc=Adl-5pXWpFf8GY1DVIm5qZZL4cVqQHTLkEz4C_uFvOixf2xe0MGSDEkvFze6nwHy5I6rmwO515j2LINWWIk5L2T2&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&oh=03_Q7cD3wGqayl5CXapjucWtKbgB3aDPvQJk50vR-e7vkbcuaOhUw&oe=694158A0',
    email: 'thminh2518@clc.fitus.edu.vn',
    skills: ['Vue.js', 'JavaScript', 'Tailwind', 'Animation'],
  },
  {
    name: 'Đàm Anh Tuấn',
    studentId: '25127542',
    role: 'Fullstack Developer',
    bio: 'Có khả năng làm việc với cả frontend và backend. Đam mê xây dựng sản phẩm từ đầu đến cuối. Linh hoạt và sẵn sàng học hỏi các công nghệ mới để giải quyết vấn đề.',
    avatar: 'https://scontent-hkg1-2.xx.fbcdn.net/v/t1.15752-9/580557777_2653703328313400_8088473170526452016_n.png?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHky7vrxw7b3MwOdWKhZMV_3blCzwg22GvduULPCDbYa2xaPvQAppdWJ0mhjf384h8pLJefa1NTeZF_yAW7XicY&_nc_ohc=McQuvVM9Q2QQ7kNvwE0U0LT&_nc_oc=AdkQdhxoixpZTgEsvdTrXif8RNkTjIyL8OpActBachvlkJk9taAfWS0ldKHGi70UOXD6aNL_Qj7ZjhEeMOzqpKUx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&oh=03_Q7cD3wEVijPYeHTdkoUHktWkU0uSNxYJ3HY_1ymBs3fDE9FBxQ&oe=69417AF3',
    email: 'datuan2535@clc.fitus.edu.vn',
    skills: ['React', 'Node.js', 'Full Stack', 'DevOps'],
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4">Giới Thiệu Nhóm</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi là nhóm sinh viên đam mê công nghệ, mong muốn tạo ra một nền tảng 
              giúp kết nối sinh viên với các cơ hội tham gia cuộc thi và phát triển bản thân.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <CardHeader className="relative pb-0">
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-32 h-32 border-4 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="pt-16 text-center">
                    <h3 className="mb-1">{member.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-indigo-600 mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">{member.studentId}</span>
                    </div>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${member.email}`} className="hover:text-indigo-600">
                        {member.email}
                      </a>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Kỹ năng:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Info */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl">Về Dự Án</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2">Mục tiêu</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tạo ra một nền tảng tập trung các thông tin về cuộc thi dành cho sinh viên, 
                  giúp sinh viên dễ dàng tìm kiếm, đăng ký và tham gia các cuộc thi phù hợp với 
                  sở thích và khả năng của mình.
                </p>
              </div>
              
              <div>
                <h3 className="mb-2">Tính năng chính</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Hiển thị danh sách cuộc thi với thông tin chi tiết</li>
                  <li>Hệ thống đăng nhập/đăng ký người dùng</li>
                  <li>Tính năng bình luận và tương tác</li>
                  <li>Phân loại cuộc thi theo lĩnh vực</li>
                  <li>Giao diện thân thiện và responsive</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2">Công nghệ sử dụng</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>React Router</Badge>
                  <Badge>Shadcn/ui</Badge>
                  <Badge>Local Storage</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}