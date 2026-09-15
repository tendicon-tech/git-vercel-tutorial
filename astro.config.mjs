// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeTutorial from './src/lib/rehype-tutorial.mjs';

export default defineConfig({
  markdown: {
    processor: unified({ rehypePlugins: [rehypeTutorial] }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
