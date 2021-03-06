import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../../components/seo';
import Img from 'gatsby-image';
import StandaloneLayout from '../../components/layouts/standalone.js';
import { graphql } from 'gatsby';

class SyndicatePage extends React.Component {
  render() {
    const icon = this.props.data.icon.imageSharp;
    const screenshots = this.props.data.screenshots.edges;

    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: 'page-syndicate page-product' }} />

        <Seo
          title="Syndicate"
          description="Safari extension that brings the RSS button back to the toolbar."
          keywords={[ 'safari', 'extension', 'rss', 'feed' ]}
        />
        <header class="main-header">
          <h1 class="main-title">
            <div class="main-title-icon">
              <Img fluid={icon.fluid} className="icon" alt="Syndicate icon" />
            </div>
            <div class="main-title-copy">
              <span class="title">Syndicate</span>
              <span class="tagline">Safari extension that brings the RSS button back to the toolbar.</span>
            </div>
          </h1>
        </header>
        <main>
          <p>
            <Img
              fluid={screenshots[0].screenshot.imageSharp.fluid}
              className="screenshot"
              alt="A screenshot of Syndicate"
            />
          </p>

          <div class="description">
            Using the toolbar button, finding and subscribing to any RSS feed is just one click away. Unlike the opaque
            built-in RSS functionality in Safari, Syndicate exposes every feed in the current page, giving you more
            visibility and control.
          </div>

          <p>
            <Img
              className="screenshot"
              fluid={screenshots[1].screenshot.imageSharp.fluid}
              alt="A screenshot of Syndicate with badge"
            />
          </p>

          <div class="description">
            You can also enable a badge on the toolbar icon to make RSS discovery easier. The badge is disabled by
            default.
          </div>

          <p>
            <Img
              className="screenshot"
              fluid={screenshots[2].screenshot.imageSharp.fluid}
              alt="A screenshot of Syndicate with multiple feeds"
            />
          </p>

          <div class="description">
            Syndicate was built with multiple-feed sites in mind. It even fetches the feed title using{' '}
            <a href="https://developers.google.com/feed/">Google Feed API</a>. You can toggle this feature off in the
            extension preferences, or use Safari's private browsing mode.
          </div>

          <p>
            <Img
              className="screenshot"
              fluid={screenshots[3].screenshot.imageSharp.fluid}
              alt="A screenshot of Syndicate with selected URL"
            />
          </p>

          <div class="description">
            Double-click the URL field and hit <kbd>Cmd+C</kbd> to copy the feed URL. Useful for sharing or debugging.
          </div>

          <a class="button" href="https://github.com/kaishin/syndicate/releases/download/v1.0.0/Syndicate.safariextz">
            Download <span class="details">(1.0.0)</span>
          </a>
        </main>

        <footer>
          <span class="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved.</span>
          <a href="https://github.com/kaishin/syndicate">Source Code</a>
        </footer>
      </StandaloneLayout>
    );
  }
}

export const query = graphql`
  query SyndicateQuery {
    icon: file(relativePath: { regex: "/syndicate-icon.png/" }) {
      imageSharp: childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    screenshots: allFile(filter: { relativePath: { regex: "/syndicate.*screenshot/" } }) {
      edges {
        screenshot: node {
          imageSharp: childImageSharp {
            fluid(jpegProgressive: true, maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default SyndicatePage;
