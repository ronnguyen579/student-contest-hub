import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import CompetitionCard from './CompetitionCard';
import { useAuth } from './AuthContext';
import { competitionAPI } from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Trophy, Users, Award, TrendingUp, Search, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Competition {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  deadline: string;
  prize: string;
  featured: boolean;
  tags?: string[];
}

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const data = await competitionAPI.getAll();
      setCompetitions(data);
    } catch (error) {
      console.error('Error loading competitions:', error);
      toast.error('Không thể tải danh sách cuộc thi');
    } finally {
      setLoading(false);
    }
  };

  // Get all unique tags
  const allTags = Array.from(new Set(competitions.flatMap(c => c.tags || [])));

  // Filter competitions
  const filteredCompetitions = competitions.filter(c => {
    const matchesSearch = searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => c.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const featuredCompetitions = filteredCompetitions.filter(c => c.featured);
  const allCategories = ['Tất cả', ...new Set(filteredCompetitions.map(c => c.category))];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate('/login', { state: { username, password } });
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">
                Nền Tảng Cuộc Thi Dành Cho Sinh Viên
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Khám phá và tham gia các cuộc thi hấp dẫn, thể hiện tài năng và giành giải thưởng giá trị
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" onClick={() => navigate('/about')}>
                  Tìm hiểu thêm
                </Button>
                {!isAuthenticated && (
                  <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10" onClick={() => navigate('/signup')}>
                    Đăng ký ngay
                  </Button>
                )}
              </div>
            </div>

            {!isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle>Đăng nhập / Đăng ký</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                      <TabsTrigger value="signup">Đăng ký</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleQuickLogin} className="space-y-4 mt-4">
                        <Input
                          placeholder="Tên đăng nhập"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" className="w-full">
                          Đăng nhập
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="signup">
                      <div className="mt-4 text-center space-y-4">
                        <p className="text-gray-600">
                          Tạo tài khoản để tham gia các cuộc thi
                        </p>
                        <Button className="w-full" onClick={() => navigate('/signup')}>
                          Đăng ký tài khoản
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-3xl text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Cuộc thi</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">Sinh viên</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-3xl text-yellow-600 mb-2">2 tỷ+</div>
              <div className="text-gray-600">Giải thưởng</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Cuộc Thi Nổi Bật</h2>
            <p className="text-xl text-gray-600">
              Những cuộc thi đang được quan tâm nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map(competition => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        </div>
      </section>

      {/* All Competitions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Tất Cả Cuộc Thi</h2>
            <p className="text-xl text-gray-600">
              Khám phá đa dạng các lĩnh vực và thể loại
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm theo tên, mô tả hoặc lĩnh vực..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Tags Filter */}
                {allTags.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm text-gray-700">Lọc theo tag:</label>
                      {selectedTags.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleClearFilters}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Xóa bộ lọc ({selectedTags.length})
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`cursor-pointer transition-all ${
                            selectedTags.includes(tag)
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Tìm thấy <span className="font-semibold">{filteredCompetitions.length}</span> cuộc thi
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="Tất cả" className="space-y-8">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {allCategories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {allCategories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCompetitions
                    .filter(c => category === 'Tất cả' || c.category === category)
                    .map(competition => (
                      <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                </div>
                {filteredCompetitions.filter(c => category === 'Tất cả' || c.category === category).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>Không tìm thấy cuộc thi nào phù hợp với bộ lọc</p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-4"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}