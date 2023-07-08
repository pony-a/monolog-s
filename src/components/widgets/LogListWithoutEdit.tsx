// LogListWithoutEdit.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import LogItem from 'components/widgets/LogItem';

interface Log {
  id: number;
  log_content: string;
  created_at: string;
  pinned: boolean;
}

const LogListWithoutEdit: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const reloadLogs = () => {
    setLogs([]);
    setLoading(true);
    setHasMore(true);
    setOffset(0);
    fetchLogs(10, 0);
  };

  const fetchLogs = async (limit: number, offset: number) => {
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setLogs((prevLogs) => [...prevLogs, ...data]);
        if (data.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('ログの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading) {
    setLoading(true);
    const newOffset = offset + 10;
    fetchLogs(10, newOffset);
    setOffset(newOffset);
    }
    };

  useEffect(() => {
    fetchLogs(10, 0);
  }, []);

  return (
    <>
      <ul>
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </ul>
      <div className="load-button">
        {isLoading ? (
          <button disabled>読込中…</button>
        ) : hasMore ? (
          <button onClick={handleLoadMore}>もっと見る</button>
        ) : logs.length === 0 ? (
          <button disabled>ログはまだありません</button>
        ) : (
          <button disabled>ログはここまで</button>
        )}
        </div>
    </>
  );
};

export default LogListWithoutEdit;