import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function LoginPage() {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    // Check if redirected from quick login
    if (location.state?.username) {
      setUsername(location.state.username);
      setPassword(location.state.password || '');
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    login(username, password).then((success) => {
      if (success) {
        toast.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-4">
              <LogIn className="w-6 h-6 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl">Đăng Nhập</CardTitle>
            <CardDescription>
              Đăng nhập để truy cập các tính năng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Chưa có tài khoản? Đăng ký ngay
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">Tài khoản demo:</p>
              <p className="text-xs text-gray-600">Username: <code className="bg-white px-2 py-1 rounded">demo</code></p>
              <p className="text-xs text-gray-600">Password: <code className="bg-white px-2 py-1 rounded">demo123</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}