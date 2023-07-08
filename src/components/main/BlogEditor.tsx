'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import SignIn from 'components/widgets/SignIn';
import LogListWithEdit from 'components/widgets/LogListWithEdit';

const BlogEditor: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session ?? null);
      setLoading(false);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session ?? null);
      setLoading(false);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  };

  return (
    <div>
      <header>
        <h1>Monolog</h1>
      </header>
      <main>
        {isLoading ? (
          <div className="load-button">
            <button disabled>読込中…</button>
          </div>
        ) : !session ? (
          <SignIn onSignIn={handleSignIn} />
        ) : (
          <LogListWithEdit session={session} />
        )}
      </main>
    </div>
  );
};

export default BlogEditor;