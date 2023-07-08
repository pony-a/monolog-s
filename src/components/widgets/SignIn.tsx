import React, { useState } from 'react';
import { supabase } from 'utils/supabase';

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the form from being submitted and page refresh

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error('サインインに失敗しました。');
      }

      // 認証に成功した場合、画面を更新する
      onSignIn();
    } catch (error) {
      console.error('サインインエラー:', error);
      setSignInError('サインインに失敗しました。');
    }
  };

  return (
    <>
      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">サインイン</button>
      </div>
      {signInError && <p>{signInError}</p>}
    </>
  );
};

export default SignIn;