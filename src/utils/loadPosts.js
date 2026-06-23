// Auto-load all markdown posts from the posts directory
const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

export async function loadPosts() {
  const posts = [];

  for (const path in postModules) {
    const content = await postModules[path]();
    const post = parsePost(content, path);
    if (post) {
      posts.push(post);
    }
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parsePost(content, path) {
  // Extract frontmatter (YAML between ---)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.warn(`No frontmatter found in ${path}`);
    return null;
  }

  const [, frontmatter, body] = frontmatterMatch;
  const metadata = {};

  // Parse simple YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      // Remove quotes if present
      metadata[key] = value.replace(/^["']|["']$/g, '');
    }
  });

  // Parse tags array
  if (metadata.tags) {
    metadata.tags = metadata.tags
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map(tag => tag.trim().replace(/^["']|["']$/g, ''));
  }

  return {
    ...metadata,
    content: body.trim(),
    slug: metadata.slug || path.split('/').pop().replace('.md', ''),
  };
}
