import React from "react";
import axios from "axios";
import "../App.css";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      bookSearchResults: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const bookSearchInput = this.state.value;

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q="${bookSearchInput}"`,
        {}
      )
      .then((result) => {
        let searchResults = result.data.items;

        let formattedResults = [];

        //if there are no search results, clear old results
        if (!searchResults) {
          this.setState({ bookSearchResults: [] });
          return;
        }

        searchResults.forEach((item) => {
          let bookItem = {};

          bookItem.title = item.volumeInfo.title;
          bookItem.authors = item.volumeInfo.authors;
          bookItem.description = item.volumeInfo.description;
          bookItem.image = item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : "";
          bookItem.link = item.volumeInfo.infoLink;
          formattedResults.push(bookItem);
        });

        this.setState({ bookSearchResults: formattedResults });
      });
  }

  handleSave(bookItem) {
    //bookitem = {} in bookSearchResults array
    //query your backend with axios, hit an Express endpoint
    //POST
    //send over book data
    //temp alert
    alert("Save Button");
    //axios.post("/api/books", bookItem);
  }

  render() {
    const allBooks = this.state.bookSearchResults;

    return (
      <div>
        <div className="booksearch">
          <p>Book Search</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Book
              <input
                className="booksearch-search"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input className="booksearch-button" type="submit" value="Submit" />
          </form>
        </div>

        <div>
          <p>Results</p>

          {allBooks.length > 0 &&
            allBooks.map((bookItem, idx) => {
              return (
                <div key={idx}>
                  <div className="bookitem">
                    <div className="bookitem-header">
                      <span>
                        <h3 className="bookitem-title">{bookItem.title}</h3>
                        <h4>
                          {bookItem.authors && bookItem.authors.join(" ")}
                        </h4>
                      </span>
                      <span>
                        <button className="booksearch-view-button">
                          <a target="_blank" href={bookItem.link}>
                            View
                          </a>
                        </button>
                        <button onClick={() => this.handleSave(bookItem)}>
                          Save
                        </button>
                      </span>
                    </div>
                    <div className="bookitem-body">
                      <div>
                        <img alt="image of book cover" src={bookItem.image} />
                      </div>
                      <div>{bookItem.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Search;

/*
Summary

to do:
- fix mongodb - need to add "googlebooks" collection. make sure schema works properly
- Search component: need to map over this.state.bookSearchResults
	- helpful link: https://medium.com/javascript-in-plain-english/how-to-loop-through-arrays-in-react-3eaa8a14445
- create Saved Component
 -if you have mongodb setup: use componentDidMount (react lifecycle) -> grab data via express endpoint -> use setState to add data to state -> in render/return, map over data
 	-also add express endpoints
 -if no mongodb: create dummy data in Saved component state 
 (this.state = { savedBooks: [
   {title: "Love in the time of Cholera", authors: ["Gabriel Garcia Marquez"]},
   {title: "The Institute", authors: ["Stephen King"], description: "There is a secret government lab that uses kids' supernatural abilities to hurt criminals." ]}]
  }
   - map over it, render book details
- add View / Save buttons in Search component 
- add View / Delete buttons in Saved component
  -for help with adding buttons - https://reactjs.org/docs/handling-events.html

EX:
        <div>
          RESULTS: this.state.bookSearchResults.length > 0 &&
          this.state.bookSearchResults.map(book => {<div>{book.title}</div>})
        </div>




FOLDER STRUCTURE:
 /components
	Search.js (already done)
	Saved.js
 /server
	/api
		index.js (controller/routes/ endpoints)
        
*/
