import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Trophy, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-indigo-600">
              <Trophy className="w-8 h-8" />
              <span className="text-xl">Cuộc Thi Sinh Viên</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Trang chủ
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Giới thiệu
              </Link>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user?.fullName}
                  </span>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button onClick={() => navigate('/login')} variant="outline" size="sm">
                    Đăng nhập
                  </Button>
                  <Button onClick={() => navigate('/signup')} size="sm">
                    Đăng ký
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Cuộc Thi Sinh Viên. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}
