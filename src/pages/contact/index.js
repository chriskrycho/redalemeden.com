import React from 'react';
import Helmet from 'react-helmet';
import DefaultLayout from '../../components/layouts/default.js';
import Seo from '../../components/seo';
import PageHeader from '../../components/page-header';
import { navigateTo } from 'gatsby-link';

function encode(data) {
  return Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.setMessageSourceFromURI(),
    };
  }

  setMessageSourceFromURI = () => {
    return this.getQueryVariable('source') !== false
      ? 'Subject: Feedback about "' + decodeURIComponent(this.getQueryVariable('source')) + '"\n\n'
      : '';
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getQueryVariable = (variable) => {
    if (typeof window === 'undefined') return false;
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'contact-page' }} />
        <Seo title="Contact" />
        <section className="content">
          <div className="container">
            <PageHeader title="Get in Touch">
              Have feedback or just want to say hi? Use the form below to get in touch. I will do my best to reply
              within a reasonable timeframe.
            </PageHeader>
            <form
              name="contact"
              method="POST"
              action="/contact/thank-you"
              data-netlify-honeypot="bot-field"
              data-netlify="true"
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <fieldset>
                <label>
                  <input placeholder="Your Name" type="text" name="name" required={true} onChange={this.handleChange} />
                </label>
                <label>
                  <input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    required={true}
                    onChange={this.handleChange}
                  />
                </label>
                <label className="textarea">
                  <textarea
                    placeholder="Your Message..."
                    name="message"
                    id="message"
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                </label>
              </fieldset>
              <label className="hidden">
                Don’t fill this out if you're human: <input name="bot-field" onChange={this.handleChange} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </DefaultLayout>
    );
  }
}

export default ContactPage;
