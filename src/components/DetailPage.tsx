import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from './AuthContext';
import { competitionAPI, commentAPI } from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar, Trophy, Tag, ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import ReactMarkdown from 'react-markdown';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Comment {
  id: string;
  competitionId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

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
}

export default function DetailPage() {
  const { id } = useParams();
  const { user, accessToken, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCompetition();
      loadComments();
    }
  }, [id]);

  const loadCompetition = async () => {
    try {
      const data = await competitionAPI.getById(id!);
      setCompetition(data);
    } catch (error) {
      console.error('Error loading competition:', error);
      toast.error('Không thể tải thông tin cuộc thi');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await commentAPI.getComments(id!);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để bình luận');
      return;
    }

    if (!comment.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận');
      return;
    }

    try {
      const newComment = await commentAPI.postComment(id!, comment, accessToken!);
      setComments([newComment, ...comments]);
      setComment('');
      toast.success('Đã thêm bình luận');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Không thể thêm bình luận');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return 'Vừa xong';
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

  if (!competition) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-2xl mb-4">Không tìm thấy cuộc thi</h1>
          <Link to="/">
            <Button>Quay lại trang chủ</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>

          {/* Competition Header */}
          <div className="mb-8">
            <Badge className="mb-4">{competition.category}</Badge>
            <h1 className="text-4xl mb-4">{competition.title}</h1>
            <p className="text-xl text-gray-600">{competition.description}</p>
          </div>

          {/* Competition Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={competition.image}
              alt={competition.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Competition Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hạn đăng ký</p>
                  <p className="font-semibold">{competition.deadline}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giải thưởng</p>
                  <p className="font-semibold">{competition.prize}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lĩnh vực</p>
                  <p className="font-semibold">{competition.category}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competition Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Chi Tiết Cuộc Thi</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-indigo max-w-none">
              <ReactMarkdown>{competition.fullDescription}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <CardTitle>Bình luận ({comments.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Comment Form */}
              {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Viết bình luận của bạn..."
                        rows={3}
                        className="mb-2"
                      />
                      <Button type="submit">
                        <Send className="w-4 h-4 mr-2" />
                        Gửi bình luận
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">
                    Vui lòng đăng nhập để bình luận
                  </p>
                  <Link to="/login">
                    <Button>Đăng nhập</Button>
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>{c.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">@{c.username}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                              {formatDate(c.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{c.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}