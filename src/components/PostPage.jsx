import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, Tag } from 'lucide-react';
import { loadPosts } from '../utils/loadPosts';
import '../styles.css';

function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then(posts => {
      const foundPost = posts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to home
          </Link>
          <h1>Post not found</h1>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  const renderContent = (content) => {
    // Simple markdown-like rendering
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');
    
    return <div className="post-content" dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />;
  };

  return (
    <div className="post-page">
      <div className="post-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <article className="full-post">
          {post.image && (
            <div className="post-cover">
              <img src={post.image} alt={post.title} />
            </div>
          )}
          <header className="post-header">
            <span className="post-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>
                <CalendarDays size={16} />
                {formatDate(post.date)}
              </span>
              <span>
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
            <div className="tag-list">
              {post.tags.map((tag) => (
                <span key={tag}>
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="post-body">
            {renderContent(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
}

export default PostPage;
