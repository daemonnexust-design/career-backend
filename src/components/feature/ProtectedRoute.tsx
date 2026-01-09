import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      const user = session?.user;
      const isConfirmed = !!user?.email_confirmed_at;

      setAuthenticated(!!session);
      setEmailConfirmed(isConfirmed);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      const user = session?.user;
      const isConfirmed = !!user?.email_confirmed_at;

      setAuthenticated(!!session);
      setEmailConfirmed(isConfirmed);
      setLoading(false); // Ensure loading is off after state change
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If email is not confirmed, redirect to verify-email (unless already on verify-email? No, this route is only for children)
  if (!emailConfirmed) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
}
