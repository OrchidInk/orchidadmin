import { ReactNode } from 'react';
import Header from '../Navbar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Header/>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
