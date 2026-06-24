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
  // Extract frontmatter (YAML between ---) - simple split approach
  const parts = content.split('---');
  
  if (parts.length < 3) {
    console.warn(`No frontmatter found in ${path}`);
    console.warn('Content preview:', content.substring(0, 200));
    return null;
  }

  const frontmatter = parts[1].trim();
  const body = parts.slice(2).join('---').trim();
  const metadata = {};

  // Parse simple YAML-like frontmatter
  frontmatter.split(/\r?\n/).forEach(line => {
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
