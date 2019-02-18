import React from 'react';

class Footer extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <footer class="site-footer">
        <ul class="link-list">
          <li class="link">
            <a href="https://widegamut.club/@kaishin">Mastodon</a>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <a href="https://github.com/kaishin">Github</a>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <a href="https://dribbble.com/kaishin">Dribbble</a>
          </li>
        </ul>
        <span class="copyright">
          <em>&copy;</em> 2009-{new Date().getFullYear()} {author}.
          <br />All Rights Reserved.
        </span>
      </footer>
    );
  }
}

export default Footer;
