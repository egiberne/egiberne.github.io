import { defineConfig } from 'vitepress'
// import { genFeed } from './genFeed.js'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "egiberne's blog",
  description: "About Microsoft 365 Apps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Blog', link: '/posts/Blog' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/posts/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/posts/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/egiberne' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/egiberne' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Emerick Giberne'
    }



  }
})
