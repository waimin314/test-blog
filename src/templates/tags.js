import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link, graphql } from 'gatsby'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <div className="tags-wrapper">
      <h1>{tagHeader}</h1>
      <ul className="tags">
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <ul>
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            </ul>
          )
        })}
        <ul>
          <li>
            <Link to="/TagsPage">All tags</Link>
          </li>
        </ul>
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <div>
        <ul className="tags">
          <li>
            {' '}
            <Link style={{ borderColor: 'black' }} to={`/`}>{`◄ HOME`}</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
