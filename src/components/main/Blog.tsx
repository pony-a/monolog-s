'use client'
import React from 'react';
import LogListWithoutEdit from 'components/widgets/LogListWithoutEdit';

const Blog: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Monolog</h1>
      </header>
      <main>
        <LogListWithoutEdit />
      </main>
    </div>
  );
};

export default Blog;