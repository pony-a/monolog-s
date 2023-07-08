// LogListWithEdit.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import LogItemWithDelete from 'components/widgets/LogItemWithDelete';
import LogForm from 'components/widgets/LogForm';

interface Log {
  id: number;
  log_content: string;
  created_at: string;
  pinned: boolean;
}

interface LogListWithEditProps {
  session: any;
}

const LogListWithEdit: React.FC<LogListWithEditProps> = ({ session }) => {
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
        .range(offset, offset + limit -1);

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

  const addLog = () => {
    reloadLogs();
  };

  const handlePinToggle = async (id: number) => {
    try {
      const logToUpdate = logs.find((log) => log.id === id);
      if (logToUpdate) {
        const { data, error } = await supabase
          .from('logs')
          .update({ pinned: !logToUpdate.pinned })
          .match({ id });
        if (error) {
          console.error('ピンの更新に失敗しました。');
        } else {
          reloadLogs();
        }
      }
    } catch (error) {
      console.error('ログの更新中にエラーが発生しました。');
    }
  };

  const deleteLog = async (id: number) => {
    const { data, error } = await supabase.from('logs').delete().match({ id });
    if (error) {
      console.error('ログの削除に失敗しました。');
    } else {
      reloadLogs();
    }
  };

const handleLoadMore = () => {
  if (!isLoading && hasMore) {
    setLoading(true);
    const newOffset = offset + 10;
    fetchLogs(10, newOffset);
    setOffset(newOffset);
  }
};

  useEffect(() => {
    if (session) {
      fetchLogs(10, 0);
    }
  }, [session]);

  return (
    <>
      {session && (
        <>
          <LogForm onAddLog={addLog} />
          <ul>
            {logs.map((log) => (
              <LogItemWithDelete
                key={log.id}
                log={log}
                onDelete={deleteLog}
                onPinToggle={handlePinToggle}
              />
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
      )}
    </>
  );
};

export default LogListWithEdit;