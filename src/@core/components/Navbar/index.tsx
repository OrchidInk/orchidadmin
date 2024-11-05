import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaBell, FaCog, FaMoon, FaSun, FaExpand, FaLayerGroup, FaUserAlt, FaShieldAlt, FaHome, FaClipboard, FaChevronDown, FaCar, FaStore } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const currentPath = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const activeMenuItemStyle = 'text-teal-300 bg-gray-700';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md w-full">
        <div className="flex items-center space-x-4 w-full">
          <span className="text-2xl font-bold text-white">
            OR<span className="text-teal-400">CH</span>ID
          </span>
          <input
            type="text"
            placeholder="Хайх үгээ бичнэ үү"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="input input-bordered w-full max-w-md bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Right Side - Icons and Avatar */}
        <div className="flex items-center space-x-4 ml-6">
          <span>Мэдэгдэл</span>
          <FaBell className="cursor-pointer hover:text-teal-400" />
          <button
            onClick={toggleDarkMode}
            className="btn btn-ghost hover:bg-gray-700"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="btn btn-ghost hover:bg-gray-700">
            <FaCog />
          </button>
          <div className="dropdown">
            <label tabIndex={0} className="avatar cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-purple-500"></div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-800 text-white rounded-box w-52"
            >
              <li>
                <a onClick={() => handleNavigation('/profile')}>
                  <FaUserAlt />
                  Profile
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation('/settings')}>
                  <FaCog />
                  Settings
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation('/notifications')}>
                  <FaBell />
                  Notifications
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-teal-400"></div>

      {/* Navigation Menu */}
      <div className="flex items-center justify-center py-3 bg-gray-900 border-b-2 border-teal-400">
        <div className="flex space-x-8">
          {[
            {
              label: 'Dashboard',
              icon: <FaHome />,
              items: [
                { label: 'Анализ', path: '/dashboard' },
                { label: 'Орлого', path: '/dashboard/wallet' },
              ],
            },
            {
              label: 'Төрөл',
              icon: <FaStore />,
              items: [
                { label: 'Menu Нэмэх', path: '/menu/add' },
                { label: 'Menu харах', path: '/menu/list' },
                { label: 'Sub Category Нэмэх', path: '/subCategory/add' },
                { label: 'Sub Category харах', path: '/subCategory/list' },
              ],
            },
            {
              label: 'Бүтээгдэхүүн',
              icon: <FaBagShopping />,
              items: [
                { label: 'Нэмэх', path: '/product/add' },
                { label: 'Агуулах харах', path: '/product/inventory' },
              ],
            },
            {
              label: 'Байгуулга',
              icon: <FaClipboard />,
              items: [
                { label: 'Нэмэх', path: '/customer/calendar' },
                { label: 'Захиалга хийх', path: '/customer/email' },
                { label: 'Төлөвлөгөөт захиалга хийх', path: '/customer/files' },
              ],
            },
            {
              label: 'Хүргэлт',
              icon: <FaCar />,
              items: [
                { label: 'Төлөв', path: '/delivery/invoice' },
                { label: 'Буцаагдсан', path: '/delivery/faq' },
                { label: 'Хүргэлтийн бүс', path: '/delivery/hurgelt' },
              ],
            },
            {
              label: 'Хэрэглэгч',
              icon: <FaUserAlt />,
              items: [
                { label: 'Profile', path: '/account/profile' },
                { label: 'Settings', path: '/account/settings' },
              ],
            },
            {
              label: 'Web Site Banner',
              icon: <FaShieldAlt />,
              items: [
                { label: 'Нэмэх', path: '/auth/register' },
                { label: 'Солих', path: '/auth/login' },
              ],
            },
          ].map((menu, index) => (
            <div key={index} className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost text-teal-400 hover:text-teal-300 flex items-center space-x-2"
              >
                {menu.icon}
                <span>{menu.label}</span>
                <FaChevronDown />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-gray-800 text-white rounded-box w-52"
              >
                {menu.items.map((item, i) => (
                  <li key={i}>
                    <a
                      onClick={() => handleNavigation(item.path)}
                      className={currentPath === item.path ? activeMenuItemStyle : ''}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
