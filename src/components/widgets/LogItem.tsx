import React from 'react';

interface Log {
  id: number;
  log_content: string;
  created_at: string;
  pinned: boolean;
}

interface LogItemProps {
  log: Log;
}

const LogItem: React.FC<LogItemProps> = ({ log }) => {
  
  return (
    <li key={log.id}>
      <div className="pinned">
      {log.pinned && <span>ピン留めされたログ</span>}
      </div>
      <div>
        {log.log_content.split('\\n').map((line, index) => (
  <React.Fragment key={index}>
    {line}
    <br />
  </React.Fragment>
))}
      </div>
      <div className="time-container">
        <time>{new Date(log.created_at).toLocaleString()}</time>
      </div>
    </li>
  );
};

export default LogItem;