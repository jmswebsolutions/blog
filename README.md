# Blog JMS Web Solutions

First version of a personal/professional blog for documenting daily learning in React, JavaScript, and web development.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages publishing

This project already includes a workflow in `.github/workflows/deploy.yml` that automatically publishes the build to GitHub Pages when there is a push to the `main` branch.

In GitHub:

1. Go to `Settings > Pages`.
2. Under `Build and deployment`, choose `GitHub Actions`.
3. To use `https://blog.jmswebsolutions.com.br/`, configure DNS with a `CNAME` record pointing to your GitHub Pages address and keep the `public/CNAME` file.
4. To use `https://jmswebsolutions.com.br/blog`, the main domain must also be configured to serve that subpath. With pure GitHub Pages, the most direct path is usually the `blog` subdomain.

## Where to edit posts

The starter posts live in `src/data/posts.js`. To add a new learning note, copy an existing object and update its title, date, category, tags, and content.
