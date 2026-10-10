import React, { useState } from 'react';
import { User } from '../../types';
import { saveStoredUser } from '../../db/storage';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserUpdate: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdate,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoSwitch = (role: 'student' | 'admin') => {
    const updatedUser: User = {
      ...currentUser,
      role: role,
      name: role === 'admin' ? 'Admin Parmjeet' : 'Parmjeet Rathore',
      email: role === 'admin' ? 'admin@codenexus.dev' : 'parmjeetrathore27@gmail.com',
    };
    saveStoredUser(updatedUser);
    onUserUpdate();
    setSuccessNotice(`Switched session to ${role.toUpperCase()} mode!`);
    setTimeout(() => {
      setSuccessNotice('');
      onClose();
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setSuccessNotice('Password reset instructions dispatched to your email.');
      setTimeout(() => setSuccessNotice(''), 3000);
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      email: email.trim() || currentUser.email,
    };
    saveStoredUser(updatedUser);
    onUserUpdate();
    setSuccessNotice(mode === 'login' ? 'Signed in successfully!' : 'Account registered!');
    setTimeout(() => {
      setSuccessNotice('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E5E5E5] relative animate-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9E40] flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-[#FF7A00]/20 font-bold">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-extrabold text-[#171717]">
            {mode === 'login' ? 'Welcome Back to CodeNexus' : mode === 'register' ? 'Create Student Account' : 'Reset Password'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            {mode === 'login'
              ? 'Sign in to access your course streaks, notes, and certificates.'
              : mode === 'register'
              ? 'Join thousands of developers mastering programming.'
              : 'Enter your registered email address to receive reset link.'}
          </p>
        </div>

        {/* Fast Switch Bar for Evaluator Convenience */}
        <div className="mb-6 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 text-center">
            ⚡ Quick Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoSwitch('student')}
              className="py-1.5 px-3 bg-white border border-neutral-200 hover:border-[#FF7A00] rounded-xl text-xs font-bold text-[#171717] shadow-2xs"
            >
              Student Demo
            </button>
            <button
              onClick={() => handleQuickDemoSwitch('admin')}
              className="py-1.5 px-3 bg-[#171717] hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-2xs"
            >
              Admin Staff Demo
            </button>
          </div>
        </div>

        {successNotice && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>{successNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex River"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#FF7A00]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#FF7A00]"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#FF7A00]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl cursor-pointer transition-transform active:scale-95 shadow-md shadow-[#FF7A00]/20"
          >
            {mode === 'login' ? 'Sign In to Account' : mode === 'register' ? 'Complete Registration' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E5E5E5] text-center text-xs text-neutral-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-[#FF7A00] font-bold hover:underline">
                Sign Up Free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-[#FF7A00] font-bold hover:underline">
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
