import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../components/seo'
import DefaultLayout from '../components/layouts/default'
import find from 'lodash/find'
import { Link, graphql } from 'gatsby'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    function swiftVersion(tags) {
      var tag = tags.find(function (tag) {
        return tag.includes('Swift-')
      })

      if (typeof tag === "undefined") {
        return false
      } else {
        return tag.replace('-', ' ')
      }
    }

    return (
      <DefaultLayout>
        <Seo title={post.frontmatter.title} />
        <Helmet bodyAttributes={{class: "post-page blog-page"}}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sintony:400,700|Titillium+Web:600,700"/>
        </Helmet>
           
        <article className="content blog-content">
          <header className="post-header">
            <div className="post-category">{post.frontmatter.category}</div>
            <h1 className="post-title">
              <Link className="post-link" to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </h1>
          </header>

          <aside className="post-metadata">
            <time date={post.frontmatter.date}>
              {post.frontmatter.formattedDate}
            </time>
            <span className="separator"> &mdash; </span>
            <span className="reading-time">{post.timeToRead}min read</span>
          </aside>

          <section className="full-post-content">
            {swiftVersion(post.frontmatter.tags) && <span className="swift-version">The code snippets in this article are written using the <strong>{swiftVersion(post.frontmatter.tags)}</strong> syntax.</span>} 
            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="feedback-box">
              Have feedback? Send it to <a target="_blank" href="https://twitter.com/intent/tweet?screen_name=kaishin">@kaishin</a>.
            </div>
          </section>
        </article>
      </DefaultLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date
        category
        tags
        formattedDate: date(formatString: "MMM D, YYYY")
      }
    }
  }
`
