// LogItemWithDelete.tsx
import React, { useState, useEffect } from 'react';

interface LogItemWithDeleteProps {
  log: {
    id: number;
    log_content: string;
    created_at: string;
    pinned: boolean;
  };
  onDelete: (id: number) => void;
  onPinToggle: (id: number, pinned: boolean) => void;
}

const LogItemWithDelete: React.FC<LogItemWithDeleteProps> = ({ log, onDelete, onPinToggle }) => {
  const [pinned, setPinned] = useState(log.pinned);

  const handleDelete = () => {
    onDelete(log.id);
  };

  const handlePinToggle = () => {
    const newPinned = !pinned;
    setPinned(newPinned);
    onPinToggle(log.id, newPinned);
  };

  useEffect(() => {
    setPinned(log.pinned);
  }, [log.pinned]);

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
      <div className="pin-container">
        <label>
          ピン：
          <input
            type="checkbox"
            checked={pinned}
            onChange={handlePinToggle}
          />
        </label>
      </div>
      <div className="delete-container">
        <button onClick={handleDelete}>削除</button>
      </div>
    </li>
  );
};

export default LogItemWithDelete;