import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  Github,
  Layers3,
  Mail,
  Menu,
  Rocket,
  Search,
  Sparkles,
  Clock,
} from 'lucide-react';
import { loadPosts } from './utils/loadPosts';
import PostPage from './components/PostPage';
import './styles.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Blog JMS Web Solutions">
          <span className="brand-mark">J</span>
          <span>
            <strong>JMS Blog</strong>
            <small>React, JavaScript and career</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="#posts">Posts</Link>
          <Link to="#about">About</Link>
        </nav>

        <a className="icon-button" href="https://github.com/" aria-label="GitHub">
          <Github size={19} />
        </a>

        <button className="menu-button" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={16} />
              Programming growth journal
            </p>
            <h1>Building my journey as a React developer.</h1>
            <p className="hero-lead">
              A professional blog to document real learning, organize studies, and show daily progress in JavaScript,
              React, front-end development, and web projects.
            </p>
            <div className="hero-actions">
              <Link to="#posts" className="primary-action">
                Read posts
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="content-section" id="posts">
          <div className="section-heading">
            <p className="eyebrow">
              <Search size={16} />
              Latest lessons
            </p>
            <h2>Posts that track my progress.</h2>
          </div>

          <article className="featured-post">
            {featuredPost.image && (
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
            )}
            <div>
              <span className="post-category">{featuredPost.category}</span>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <PostMeta post={featuredPost} />
            </div>
            <Link to={`/post/${featuredPost.slug}`} className="read-link">
              Read feature
              <ArrowUpRight size={18} />
            </Link>
          </article>

          <div className="post-grid">
            {recentPosts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.image && (
                  <div className="card-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                <span className="post-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <PostMeta post={post} />
                <div className="tag-list" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link to={`/post/${post.slug}`} className="read-link">
                  Read more
                  <ArrowUpRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div>
            <p className="eyebrow">
              <Rocket size={16} />
              About the blog
            </p>
            <h2>A place to learn in public.</h2>
          </div>
          <p>
            This blog was created to follow my growth as a developer. With each new study session, I will turn notes
            into clear posts that show what I learned, where I got stuck, and how I solved problems using React,
            JavaScript, and front-end technologies.
          </p>
          <a className="contact-link" href="mailto:contato@jmswebsolutions.com.br">
            <Mail size={18} />
            contato@jmswebsolutions.com.br
          </a>
        </section>
      </main>
    </>
  );
}

function PostMeta({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
