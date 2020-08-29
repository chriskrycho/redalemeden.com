import React from 'react';
import Footer from '../footer';

import '../../css/normalize.css';
import '../../css/styles.css';
import 'typeface-inter';

export default ({ children }) => (
  <React.Fragment>
    <main class="longform-container">
      <header>
        <a className="back-to-home" href="/">
          <img className="author-avatar" src="/author-photo.jpg" alt="Reda Lemeden" />
          <h1 className="author-name">Reda Lemeden</h1>
        </a>
      </header>
      <article class="longform-content">{children}</article>
    </main>
    <Footer>
      <li className="link">
        <a href="/">Home</a>
        <span className="separator">/</span>
      </li>
    </Footer>
  </React.Fragment>
);
