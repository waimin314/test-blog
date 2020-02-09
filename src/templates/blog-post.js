import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import HyvorTalk from 'hyvor-talk-react'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const group = this.props.data.allMarkdownRemark.group
    return (
      <div>
        <DefaultLayout>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <article className="article-page">
            <div className="page-content">
              {post.frontmatter.img && (
                <div className="page-cover-image">
                  <figure>
                    <Img
                      className="page-image"
                      key={post.frontmatter.img.childImageSharp.fluid.src}
                      fluid={post.frontmatter.img.childImageSharp.fluid}
                    />
                  </figure>
                </div>
              )}
              <div className="wrap-content">
                <header className="header-page">
                  <h1 className="page-title">{post.frontmatter.title}</h1>
                  <div className="page-date">
                    <span>{post.frontmatter.date}</span>
                  </div>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <div className="page-footer">
                  <div>
                    <ul className="tags" style={{ fontSize: '0.8rem' }}>
                      {group.map(tag => (
                        <li key={tag.fieldValue}>
                          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                            # {tag.fieldValue} ({tag.totalCount})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <HyvorTalk.Embed
                websiteId={process.env.HYVOR_WEB_ID}
                id=""
                loadMode="scroll"
              />
            </div>
          </article>
        </DefaultLayout>
        <div className="comment-body">
          {/* <HyvorTalk.Embed websiteId="217" id="" loadMode="scroll" /> */}
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY, MMM DD")
        tags
        img {
          childImageSharp {
            fluid(maxWidth: 3720) {
              aspectRatio
              base64
              sizes
              src
              srcSet
            }
          }
        }
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
