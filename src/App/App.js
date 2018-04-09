import React, { Component } from 'react';
import './App.css';

/**
 * Main application.
 * @extends Component
 */
class App extends Component {
  /**
   * Initialize the application.
   * @param {Object} props - The application props.
   */
  constructor(props) {
    super(props);

    this.state = {
      contacts: Array(0),
      search: ''
    };

    this.updateContacts = this.updateContacts.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.reset = this.reset.bind(this);

    this.props.service.getContacts(this.updateContacts, this.state.search);
  }

  /**
   * Update contacts after a search.
   * @param {Object} data - The data to update from.
   */
  updateContacts(data) {
    this.setState({
      contacts: data.slice()
    });
  }

  /**
   * Updates state values from search form.
   * @param {Event} e - The default event.
   */
  searchChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Submits the search form and updates the contacts.
   * @param {Event} e - The default event.
   */
  searchSubmit(e) {
    e.preventDefault();
    this.props.service.getContacts(this.updateContacts, this.state.search);
  }

  /**
   * Resets the search form.
   * @param {Event} e - The default event.
   */
  reset(e) {
    this.setState({
      search: ''
    });
  }

  /**
   * Render the main application.
   */
  render() {
    return (
      <div>
        <div className="app-header">
          <h2>React Contacts</h2>
          <form onSubmit={this.searchSubmit}>
            <div>
              <input name="search" type="text"
                value={this.state.search}
                onChange={this.searchChange} />
            </div>
            <input type="submit" value="Search" />
            <input type="submit" value="Reset"
              onClick={this.reset} />
          </form>
        </div>
        <div className="app-content">
          {this.state.contacts.map(function(contact, key) {
            return (
              <div key={key} className='contact'>
                <h3>{contact.name}</h3>
                <ul>
                {contact.job_history.filter(history => history)
                  .map(function(company, key) {
                    return (<li key={key}>{company}</li>)
                  }
                )}
                </ul>
                <address>
                  {contact.company}<br/>
                  {contact.email}<br/>
                  {contact.city}, {contact.country}
                </address>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
