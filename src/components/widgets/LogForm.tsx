// LogForm.tsx
import React, { useState } from 'react';
import { supabase } from 'utils/supabase';

interface LogFormProps {
  onAddLog: () => void;
}

const MAX_CONTENT_LENGTH = 1000;

const LogForm: React.FC<LogFormProps> = ({ onAddLog }) => {
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addLog = async () => {
    if (content.length > MAX_CONTENT_LENGTH) {
      setErrorMessage('投稿内容は1000文字以内で入力してください。');
      return;
    }

    try {
      const escapedContent = content.replace(/\n/g, '\\n');
      const { data, error } = await supabase.from('logs').insert([
        { log_content: escapedContent, created_at: new Date().toISOString(), pinned },
      ]);
      if (error) {
        console.error('ログの投稿に失敗しました。');
      } else {
        setContent('');
        setPinned(false);
        onAddLog(); // onAddLogコールバックを呼び出す
      }
    } catch (error) {
      console.error('ログの投稿中にエラーが発生しました。');
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label>
        ピンする：
        <input
          type="checkbox"
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
        />
      </label>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={addLog}>投稿</button>
    </div>
  );
};

export default LogForm;