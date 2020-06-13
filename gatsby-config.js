require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Wai Min's Blog`,
    description: `I am a Software Engineer learning front-end development. This website serves as my portfolio as well as my technical blog`,
    author: `Wai Min`,
    siteUrl: `https://waimin.me`,
    social: {
      twitter: ``,
      facebook: ``,
      github: `waimin314`,
      linkedin: `wai-min-b40921112`,
      email: ``,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.Google_Analytics_KEY}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: '500px',
              backgroundColor: 'none',
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wai Min's blog`,
        short_name: `Wai Min's blog`,
        start_url: `/`,
        background_color: `#1aaddb`,
        theme_color: `#1aaddb`,
        display: `minimal-ui`,
        icon: `./static/myAvatar.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
