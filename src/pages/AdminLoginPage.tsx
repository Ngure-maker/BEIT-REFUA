import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAuth } from '../admin/AuthContext';
import { useSEO } from '@/hooks/useSEO';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function AdminLoginPage() {
  useSEO({
    title: 'Admin Login | Beit-Refuah',
    description: 'Secure admin login for Beit-Refuah management dashboard',
    url: '/auth/login',
    noIndex: true,
    noFollow: true,
  });

  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await login(data);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-forest-deep text-forest-foreground p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest to-forest-deep" />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link to="/" className="inline-block mb-8" aria-label="Beit-Refuah Home">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
              <span className="font-display text-2xl font-bold text-gold">BR</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Welcome Back
          </h1>
          <p className="text-lg text-forest-foreground/80 mb-8">
            Access the Beit-Refuah administration dashboard to manage programs, 
            stories, impact reports, and community engagement.
          </p>
          <div className="flex items-center gap-4 text-forest-foreground/70">
            <div className="h-px flex-1 bg-forest-foreground/20" />
            <Shield className="size-8 text-gold" aria-hidden="true" />
            <div className="h-px flex-1 bg-forest-foreground/20" />
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-forest-foreground/60">
          <div className="flex items-center gap-2">
            <Lock className="size-4" aria-hidden="true" />
            <span>Secure Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="size-4" aria-hidden="true" />
            <span>Role-Based</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4" aria-hidden="true" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-cream">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-6" aria-label="Beit-Refuah Home">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-deep">
                  <span className="font-display text-xl font-bold text-gold">BR</span>
                </div>
              </Link>
              <h2 className="font-display text-3xl text-forest mb-2">Admin Dashboard</h2>
              <p className="text-muted-foreground">Sign in to manage your content</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700"
                  role="alert"
                >
                  <AlertCircle className="size-5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={cn(
                      'w-full h-12 pl-12 pr-4 rounded-lg border bg-white text-forest placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
                      'transition-colors',
                      errors.email ? 'border-red-300 focus:ring-red-300' : 'border-border'
                    )}
                    disabled={isSubmitting || authLoading}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-forest">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={cn(
                      'w-full h-12 pl-12 pr-12 rounded-lg border bg-white text-forest placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
                      'transition-colors',
                      errors.password ? 'border-red-300 focus:ring-red-300' : 'border-border'
                    )}
                    disabled={isSubmitting || authLoading}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-forest transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1.5 text-sm text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-gold focus:ring-gold focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="/auth/forgot-password" className="text-sm text-gold hover:text-gold/80 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || authLoading}
                className={cn(
                  'w-full h-12 rounded-lg font-semibold uppercase tracking-[0.08em] transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
                  isSubmitting || authLoading
                    ? 'bg-forest-deep/50 text-forest-foreground/50 cursor-not-allowed'
                    : 'bg-forest-deep text-forest-foreground hover:bg-forest-deep/90 shadow-lg hover:shadow-xl'
                )}
              >
                {isSubmitting || authLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                <Link to="/" className="text-gold hover:underline">
                  ← Back to Website
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;