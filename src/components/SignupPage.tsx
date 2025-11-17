import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [optionalInfo, setOptionalInfo] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !fullName) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    signup(username, password, fullName, optionalInfo).then((success) => {
      if (success) {
        toast.success('Đăng ký thành công!');
        navigate('/');
      } else {
        toast.error('Tên đăng nhập đã tồn tại hoặc có lỗi xảy ra');
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl">Đăng Ký Tài Khoản</CardTitle>
            <CardDescription>
              Tạo tài khoản để tham gia các cuộc thi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  Tên đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nhập họ và tên đầy đủ"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">Thông tin tùy chọn</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={optionalInfo}
                      onChange={(e) => setOptionalInfo(e.target.value)}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Đăng ký
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Đã có tài khoản? Đăng nhập ngay
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}