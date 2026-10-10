import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Flame, 
  Award, 
  User as UserIcon, 
  Menu, 
  X, 
  BookOpen, 
  Play, 
  CheckSquare, 
  FolderGit2, 
  Compass, 
  ShieldAlert,
  LogOut,
  Sparkles
} from 'lucide-react';
import { User } from '../../types';
import { calculateLevel } from '../../db/storage';

interface NavbarProps {
  currentUser: User;
  activeView: string;
  setActiveView: (view: string) => void;
  openSearch: () => void;
  openAuth: () => void;
  onToggleRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeView,
  setActiveView,
  openSearch,
  openAuth,
  onToggleRole,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const levelInfo = calculateLevel(currentUser.xp);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    // { id: 'playground', label: 'Playground', badge: 'Live' },
    { id: 'practice', label: 'Practice' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'projects', label: 'Projects' },
    { id: 'paths', label: 'Learning Paths' },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9E40] flex items-center justify-center text-white shadow-md shadow-[#FF7A00]/20 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-[#171717] group-hover:text-[#FF7A00] transition-colors">
                Neo It
                </span>
                <span className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-widest -mt-1">
                  Learn • Code • Build
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#FF7A00] bg-[#FFF9F3]'
                        : 'text-[#171717] hover:text-[#FF7A00] hover:bg-neutral-50'
                    }`}
                  >
                    {item.label}
                    {/* {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FF7A00] text-white font-bold uppercase tracking-wider animate-pulse">
                        {item.badge}
                      </span>
                    )} */}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & User Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-white text-neutral-600 hover:text-[#171717] transition-all shadow-xs"
              title="Search documentation and topics (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline font-medium">Search topics...</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-neutral-300 text-neutral-500 font-semibold shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold"
              title={`${currentUser.currentStreak} day learning streak!`}
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-600 animate-bounce" />
              <span>{currentUser.currentStreak}d</span>
            </div>

            {/* XP Points & Level Pill */}
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-[#E5E5E5] cursor-pointer transition-colors"
              title={`${currentUser.xp} XP - ${levelInfo.title}`}
            >
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-xs font-bold text-[#171717]">{currentUser.xp} XP</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-[#FF7A00] text-white rounded">
                Lv {levelInfo.level}
              </span>
            </div>

            {/* User Profile / Dashboard Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#FF7A00]"
                />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E5E5] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-[#E5E5E5]">
                    <p className="text-sm font-bold text-[#171717] truncate">{currentUser.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{currentUser.email}</p>
                    <div className="mt-2 text-xs flex items-center justify-between">
                      <span className="text-[#FF7A00] font-semibold">{levelInfo.title}</span>
                      <span className="text-neutral-400 font-mono">Role: {currentUser.role}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#171717] hover:bg-neutral-50 flex items-center gap-2 font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-neutral-500" />
                      Student Dashboard
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#171717] hover:bg-neutral-50 flex items-center gap-2 font-medium"
                    >
                      <ShieldAlert className="w-4 h-4 text-neutral-500" />
                      Admin Content CMS
                    </button>

                    <button
                      onClick={() => {
                        onToggleRole();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#FF7A00] hover:bg-orange-50 flex items-center gap-2 font-semibold"
                    >
                      <span>⚡ Switch to {currentUser.role === 'student' ? 'Admin' : 'Student'} mode</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-[#E5E5E5]">
                    <button
                      onClick={() => {
                        openAuth();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-neutral-400" />
                      Switch Account / Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 hover:text-[#171717] hover:bg-neutral-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E5E5] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between p-3 bg-[#FFF9F3] rounded-lg mb-3">
            <div>
              <p className="font-bold text-sm text-[#171717]">{currentUser.name}</p>
              <p className="text-xs text-neutral-500">{levelInfo.title} • {currentUser.xp} XP</p>
            </div>
            <span className="text-xs px-2 py-1 bg-[#FF7A00] text-white font-bold rounded">
              Lv {levelInfo.level}
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activeView === item.id
                  ? 'bg-[#FF7A00] text-white'
                  : 'text-[#171717] hover:bg-neutral-100'
              }`}
            >
              <span>{item.label}</span>
              {/* {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#FF7A00] font-bold">
                  {item.badge}
                </span>
              )} */}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E5E5E5] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-neutral-500" />
              My Learning Dashboard
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-neutral-500" />
              Admin Content Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
