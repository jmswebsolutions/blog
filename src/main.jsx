import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Code2,
  Github,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Rocket,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { posts } from './data/posts';
import './styles.css';

const featuredPost = posts[0];
const recentPosts = posts.slice(1);

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Blog JMS Web Solutions">
          <span className="brand-mark">J</span>
          <span>
            <strong>JMS Blog</strong>
            <small>React, JavaScript and career</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#posts">Posts</a>
          <a href="#path">Path</a>
          <a href="#about">About</a>
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
              <a className="primary-action" href="#posts">
                Read posts
                <ArrowUpRight size={18} />
              </a>
              <a className="secondary-action" href="#path">
                View path
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Visual panel with code and study progress">
            <div className="code-window">
              <div className="window-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <pre>
                <code>{`const jonatan = {
  role: "Full-Stack Developer",
  tech: ["JavaScript", "React", "Node.js"],
  goals: "Get my first developer job",
  mindset: "Consistency > motivation 🚀"
};

export default jonatan;`}</code>
              </pre>
            </div>
            <div className="progress-panel">
              <span>Current plan</span>
              <strong>Strong fundamentals</strong>
              <div className="progress-track">
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="metrics-band" aria-label="Blog summary">
          <Metric icon={<BookOpenText size={22} />} value="03" label="starter posts" />
          <Metric icon={<Code2 size={22} />} value="React" label="main focus" />
          <Metric icon={<Target size={22} />} value="Daily" label="continuous learning" />
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
            <div>
              <span className="post-category">{featuredPost.category}</span>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <PostMeta post={featuredPost} />
            </div>
            <a href={`#${featuredPost.slug}`} className="read-link">
              Read feature
              <ArrowUpRight size={18} />
            </a>
          </article>

          <div className="post-grid">
            {recentPosts.map((post) => (
              <article className="post-card" id={post.slug} key={post.slug}>
                <span className="post-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <PostMeta post={post} />
                <div className="tag-list" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="learning-section" id="path">
          <div className="section-heading">
            <p className="eyebrow">
              <GraduationCap size={16} />
              Growth roadmap
            </p>
            <h2>My path to improve with consistency.</h2>
          </div>

          <div className="timeline">
            <LearningStep title="Fundamentals" text="Semantic HTML, responsive CSS, modern JavaScript, and Git." />
            <LearningStep title="React in practice" text="Components, state, props, hooks, routes, and API consumption." />
            <LearningStep title="Real projects" text="Publish studies, fix mistakes, document decisions, and improve UX." />
            <LearningStep title="Career" text="Build a portfolio, write about lessons learned, and develop professional rhythm." />
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

function Metric({ icon, value, label }) {
  return (
    <div className="metric">
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function PostMeta({ post }) {
  return (
    <div className="post-meta">
      <span>
        <CalendarDays size={16} />
        {post.date}
      </span>
      <span>
        <Layers3 size={16} />
        {post.readTime}
      </span>
    </div>
  );
}

function LearningStep({ title, text }) {
  return (
    <article className="timeline-step">
      <span />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
