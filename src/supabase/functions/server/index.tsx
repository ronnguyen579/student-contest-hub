import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cc9582ee/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize competitions data
async function initializeCompetitions() {
  const existingCompetitions = await kv.get('competitions:all');
  if (!existingCompetitions) {
    const initialCompetitions = [
      {
        id: '1',
        title: 'Cuộc Thi Lập Trình Hackathon 2025',
        description: 'Thử thách kỹ năng lập trình của bạn trong 48 giờ với các bài toán thực tế',
        fullDescription: `# Giới thiệu\nHackathon 2025 là cuộc thi lập trình lớn nhất dành cho sinh viên trong năm. Đây là cơ hội tuyệt vời để bạn thể hiện kỹ năng, học hỏi từ các chuyên gia và kết nối với cộng đồng công nghệ.\n\n## Thể lệ\n- Làm việc theo nhóm 3-5 người\n- Thời gian: 48 giờ liên tục\n- Sử dụng bất kỳ công nghệ nào bạn muốn\n- Phải có demo sản phẩm cuối cùng\n\n## Tiêu chí đánh giá\n1. Tính sáng tạo và độc đáo (30%)\n2. Kỹ thuật và chất lượng code (30%)\n3. Tính ứng dụng thực tế (25%)\n4. Presentation và demo (15%)\n\n## Giải thưởng\n- Giải Nhất: 30,000,000 VNĐ + Cơ hội thực tập tại các công ty công nghệ hàng đầu\n- Giải Nhì: 20,000,000 VNĐ\n- Giải Ba: 10,000,000 VNĐ\n- 5 giải khuyến khích: 2,000,000 VNĐ/giải`,
        image: 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBoYWNrYXRob258ZW58MXx8fHwxNzYzMzA1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Công nghệ',
        deadline: '30/12/2025',
        prize: '30,000,000 VNĐ',
        featured: true,
        tags: ['Lập trình', 'Hackathon', 'Nhóm', 'Công nghệ', 'AI', 'Web Development'],
      },
      {
        id: '2',
        title: 'Cuộc Thi Ý Tưởng Khởi Nghiệp',
        description: 'Biến ý tưởng thành hiện thực với sự hỗ trợ từ các nhà đầu tư và chuyên gia',
        fullDescription: `# Về cuộc thi\nCuộc Thi Ý Tưởng Khởi Nghiệp là nơi các sinh viên có thể trình bày ý tưởng kinh doanh của mình trước các nhà đầu tư và nhận được mentorship từ các doanh nhân thành công.\n\n## Yêu cầu tham gia\n- Sinh viên đang học tại các trường đại học tại Việt Nam\n- Có ý tưởng kinh doanh khả thi\n- Chuẩn bị bài thuyết trình 10 phút\n- Kế hoạch kinh doanh chi tiết\n\n## Quy trình\n1. Nộp hồ sơ và kế hoạch kinh doanh\n2. Vòng sơ loại: Đánh giá hồ sơ\n3. Vòng chung kết: Thuyết trình trực tiếp\n\n## Phần thưởng\n- Giải Nhất: 50,000,000 VNĐ + Vốn đầu tư tiềm năng lên đến 500,000,000 VNĐ\n- Giải Nhì: 30,000,000 VNĐ\n- Giải Ba: 20,000,000 VNĐ\n- Mentorship 6 tháng từ các chuyên gia`,
        image: 'https://images.unsplash.com/photo-1563807893646-b6598a2b6fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3NjMzMDE4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Kinh doanh',
        deadline: '15/01/2026',
        prize: '50,000,000 VNĐ',
        featured: true,
        tags: ['Khởi nghiệp', 'Startup', 'Kinh doanh', 'Đầu tư', 'Pitch', 'Innovation'],
      },
      {
        id: '3',
        title: 'Cuộc Thi Thiết Kế Đồ Họa',
        description: 'Thể hiện tài năng thiết kế của bạn qua các dự án sáng tạo',
        fullDescription: `# Giới thiệu cuộc thi\nCuộc Thi Thiết Kế Đồ Họa dành cho các sinh viên yêu thích nghệ thuật và thiết kế. Đây là cơ hội để bạn thể hiện phong cách riêng và nhận được sự công nhận từ cộng đồng.\n\n## Thể loại thi\n1. Logo Design\n2. Poster Design\n3. UI/UX Design\n4. Illustration\n\n## Yêu cầu\n- Nộp tối thiểu 3 tác phẩm\n- File định dạng AI, PSD hoặc Figma\n- Kèm theo mô tả ý tưởng\n\n## Tiêu chí chấm\n- Tính sáng tạo (40%)\n- Kỹ thuật thực hiện (30%)\n- Tính thẩm mỹ (20%)\n- Tính ứng dụng (10%)\n\n## Giải thưởng\n- Giải Nhất mỗi thể loại: 15,000,000 VNĐ\n- Giải Nhì mỗi thể loại: 10,000,000 VNĐ\n- Giải Ba mỗi thể loại: 5,000,000 VNĐ`,
        image: 'https://images.unsplash.com/photo-1762242664262-7f275eb8e007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjb250ZXN0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYzMzA1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Thiết kế',
        deadline: '20/01/2026',
        prize: '15,000,000 VNĐ',
        featured: true,
        tags: ['Thiết kế', 'Đồ họa', 'UI/UX', 'Sáng tạo', 'Nghệ thuật', 'Visual Design'],
      },
      {
        id: '4',
        title: 'Cuộc Thi Thuyết Trình Tiếng Anh',
        description: 'Rèn luyện kỹ năng giao tiếp và thuyết trình bằng tiếng Anh',
        fullDescription: `# Về cuộc thi\nCuộc Thi Thuyết Trình Tiếng Anh nhằm khuyến khích sinh viên phát triển kỹ năng giao tiếp quốc tế và tư duy phản biện.\n\n## Chủ đề\n- Education & Technology\n- Environmental Sustainability\n- Social Innovation\n- Global Leadership\n\n## Quy định\n- Thời gian thuyết trình: 7-10 phút\n- Q&A: 5 phút\n- Sử dụng slide thuyết trình\n- Không được đọc theo kịch bản\n\n## Vòng thi\n1. Vòng loại: Nộp video thuyết trình\n2. Vòng bán kết: 30 thí sinh xuất sắc nhất\n3. Chung kết: 10 thí sinh\n\n## Giải thưởng\n- Giải Nhất: 20,000,000 VNĐ + Học bổng khóa học tiếng Anh\n- Giải Nhì: 12,000,000 VNĐ\n- Giải Ba: 8,000,000 VNĐ`,
        image: 'https://images.unsplash.com/photo-1660794483744-d6c7ab2ac6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBldGl0aW9uJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2MzMwNTAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Kỹ năng mềm',
        deadline: '10/02/2026',
        prize: '20,000,000 VNĐ',
        featured: false,
        tags: ['Tiếng Anh', 'Thuyết trình', 'Public Speaking', 'Giao tiếp', 'Presentation'],
      },
      {
        id: '5',
        title: 'Cuộc Thi Dự Án Cộng Đồng',
        description: 'Tạo ra tác động tích cực cho cộng đồng và xã hội',
        fullDescription: `# Tổng quan\nCuộc Thi Dự Án Cộng Đồng khuyến khích sinh viên phát triển các dự án có ý nghĩa xã hội, mang lại giá trị thực tế cho cộng đồng.\n\n## Hướng dự án\n- Giáo dục cho trẻ em vùng cao\n- Bảo vệ môi trường\n- Hỗ trợ người khuyết tật\n- Phát triển nông thôn\n\n## Yêu cầu\n- Dự án phải được triển khai thực tế\n- Báo cáo kết quả và tác động\n- Video documentary về dự án\n- Kế hoạch phát triển dài hạn\n\n## Đánh giá\n- Tính khả thi (25%)\n- Tác động xã hội (30%)\n- Tính bền vững (25%)\n- Sáng tạo trong giải pháp (20%)\n\n## Giải thưởng\n- Giải Nhất: 40,000,000 VNĐ + Quỹ hỗ trợ tiếp tục dự án\n- Giải Nhì: 25,000,000 VNĐ\n- Giải Ba: 15,000,000 VNĐ`,
        image: 'https://images.unsplash.com/photo-1640163561346-7778a2edf353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHRlYW0lMjB3b3JraW5nfGVufDF8fHx8MTc2MzMwNTAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Xã hội',
        deadline: '28/02/2026',
        prize: '40,000,000 VNĐ',
        featured: false,
        tags: ['Cộng đồng', 'Xã hội', 'Tình nguyện', 'Môi trường', 'Giáo dục', 'Social Impact'],
      },
      {
        id: '6',
        title: 'Cuộc Thi Nghiên Cứu Khoa Học',
        description: 'Khám phá và nghiên cứu các vấn đề khoa học đương đại',
        fullDescription: `# Giới thiệu\nCuộc Thi Nghiên Cứu Khoa Học dành cho các sinh viên đam mê khoa học và muốn đóng góp vào sự phát triển của tri thức.\n\n## Lĩnh vực\n- Khoa học tự nhiên\n- Công nghệ thông tin\n- Y học và sức khỏe\n- Khoa học xã hội\n\n## Yêu cầu bài dự thi\n- Bài báo khoa học (8-12 trang)\n- Dữ liệu và phương pháp nghiên cứu rõ ràng\n- Tham khảo tài liệu chuẩn mực\n- Poster thuyết trình\n\n## Quy trình\n1. Nộp bài báo và abstract\n2. Phản biện bởi hội đồng khoa học\n3. Thuyết trình poster tại hội nghị\n\n## Giải thưởng\n- Giải Nhất mỗi lĩnh vực: 25,000,000 VNĐ + Xuất bản bài báo\n- Giải Nhì: 15,000,000 VNĐ\n- Giải Ba: 10,000,000 VNĐ`,
        image: 'https://images.unsplash.com/photo-1660795468951-0b37051eb1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29tcGV0aXRpb24lMjBhd2FyZHxlbnwxfHx8fDE3NjMzMDQ5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Nghiên cứu',
        deadline: '31/03/2026',
        prize: '25,000,000 VNĐ',
        featured: false,
        tags: ['Nghiên cứu', 'Khoa học', 'Học thuật', 'Y học', 'Công nghệ thông tin', 'Research'],
      },
    ];
    
    await kv.set('competitions:all', initialCompetitions);
    console.log('Competitions data initialized');
  }
}

// Initialize data on server start
initializeCompetitions();

// Initialize demo user
async function initializeDemoUser() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Check if demo user exists
    const existingDemoUser = await kv.get('users:demo');
    
    if (!existingDemoUser) {
      // Try to create demo user
      const { data, error } = await supabase.auth.admin.createUser({
        email: 'demo@competition.local',
        password: 'demo123',
        user_metadata: {
          username: 'demo',
          fullName: 'Demo User',
          optionalInfo: 'This is a demo account for testing'
        },
        email_confirm: true
      });
      
      if (data && data.user) {
        await kv.set(`users:${data.user.id}`, {
          id: data.user.id,
          username: 'demo',
          fullName: 'Demo User',
          optionalInfo: 'This is a demo account for testing',
          createdAt: new Date().toISOString()
        });
        console.log('Demo user created successfully');
      } else if (error && !error.message.includes('already exists')) {
        console.log('Error creating demo user:', error.message);
      }
    }
  } catch (error) {
    console.log('Demo user initialization error:', error);
  }
}

initializeDemoUser();

// ============= AUTH ROUTES =============

// Sign up endpoint
app.post("/make-server-cc9582ee/signup", async (c) => {
  try {
    const { username, password, fullName, optionalInfo } = await c.req.json();
    
    if (!username || !password || !fullName) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: `${username}@competition.local`, // Using username as email prefix
      password: password,
      user_metadata: { 
        username: username,
        fullName: fullName,
        optionalInfo: optionalInfo || ''
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: `Error creating user: ${error.message}` }, 400);
    }

    // Store additional user data in KV store
    await kv.set(`users:${data.user.id}`, {
      id: data.user.id,
      username: username,
      fullName: fullName,
      optionalInfo: optionalInfo || '',
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        username: username,
        fullName: fullName
      }
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: `Server error during signup: ${error.message}` }, 500);
  }
});

// Login endpoint
app.post("/make-server-cc9582ee/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    if (!username || !password) {
      return c.json({ error: 'Missing username or password' }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${username}@competition.local`,
      password: password,
    });

    if (error) {
      console.log('Login error:', error);
      return c.json({ error: `Login failed: ${error.message}` }, 401);
    }

    // Get user data from KV store
    const userData = await kv.get(`users:${data.user.id}`);

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      user: userData || {
        id: data.user.id,
        username: username,
        fullName: data.user.user_metadata?.fullName || username
      }
    });
  } catch (error) {
    console.log('Login error:', error);
    return c.json({ error: `Server error during login: ${error.message}` }, 500);
  }
});

// Get current user (verify session)
app.get("/make-server-cc9582ee/me", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    const userData = await kv.get(`users:${user.id}`);

    return c.json({ 
      success: true,
      user: userData || {
        id: user.id,
        username: user.user_metadata?.username || '',
        fullName: user.user_metadata?.fullName || ''
      }
    });
  } catch (error) {
    console.log('Get user error:', error);
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// ============= COMPETITION ROUTES =============

// Get all competitions
app.get("/make-server-cc9582ee/competitions", async (c) => {
  try {
    const competitions = await kv.get('competitions:all') || [];
    return c.json({ success: true, competitions });
  } catch (error) {
    console.log('Get competitions error:', error);
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Get competition by ID
app.get("/make-server-cc9582ee/competitions/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const competitions = await kv.get('competitions:all') || [];
    const competition = competitions.find((comp: any) => comp.id === id);
    
    if (!competition) {
      return c.json({ error: 'Competition not found' }, 404);
    }
    
    return c.json({ success: true, competition });
  } catch (error) {
    console.log('Get competition error:', error);
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// ============= COMMENT ROUTES =============

// Get comments for a competition
app.get("/make-server-cc9582ee/competitions/:id/comments", async (c) => {
  try {
    const id = c.req.param('id');
    const comments = await kv.get(`comments:${id}`) || [];
    return c.json({ success: true, comments });
  } catch (error) {
    console.log('Get comments error:', error);
    return c.json({ error: `Server error: ${error.message}` }, 500);
  }
});

// Post a comment (requires authentication)
app.post("/make-server-cc9582ee/competitions/:id/comments", async (c) => {
  try {
    const id = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Verify user
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    const { text } = await c.req.json();
    
    if (!text || text.trim() === '') {
      return c.json({ error: 'Comment text is required' }, 400);
    }

    // Get user data
    const userData = await kv.get(`users:${user.id}`);
    
    // Get existing comments
    const comments = await kv.get(`comments:${id}`) || [];
    
    // Create new comment
    const newComment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      competitionId: id,
      userId: user.id,
      username: userData?.username || user.user_metadata?.username || 'Anonymous',
      text: text.trim(),
      createdAt: new Date().toISOString()
    };
    
    // Add comment to list
    comments.push(newComment);
    await kv.set(`comments:${id}`, comments);
    
    return c.json({ success: true, comment: newComment });
  } catch (error) {
    console.log('Post comment error:', error);
    return c.json({ error: `Server error while posting comment: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);