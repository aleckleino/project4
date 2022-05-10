import React, { useState, useEffect } from 'react';
import './styles.css';


const App = () => {
  const [query, setQuery] = useState('')

  // Define first button handler
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("This happend: ", event.target);
    console.log("id: ", query);
    GetBookByID();
  };

  // defing second button handler
  const handleClick = (event) => {
    event.preventDefault();
    console.log("This happend: ", event.target);
    GetBookData();
  };

  const [results, setResults] = useState([])
  const GetBookData = () => {
    fetch("http://localhost:3000/")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        const items = data;
        setResults(items)
      });
  };
  
//Search
const GetBookByID = () => {
  fetch("http://localhost:3000/" + query)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      const items = data;
      console.log("One book: ", data);
      setResults([items])
    });
};

//Delete
const deleteBook = () => {
  fetch("http://localhost:3000/" + query,{ method: 'DELETE' }) 
  .then(() => this.setState({ status: 'Delete successful' }));  
};

//Add
const addBook = () => {

  let jsonObject = JSON.parse(query);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonObject)
};
console.log(requestOptions)
fetch('http://localhost:3000/', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ title: data.title, author:data.author, released:data.released }));
};

//[{"title":"Harry Potter ja liekehtivä pikari","author":"J. K. Rowlingin","released":"2005"}]
//modify book
  const modifyBook = () => {
    console.log("Query: " + query)
    fetch("http://localhost:3000/" + query, {
      method: 'PUT'
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log("Results: ", data);
        const items = data;
        console.log("One book: ", data);
        setResults(items)
      });
  };

  // Books in array
  const BookArray = (props) => {
    const { data } = props;
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr key={props.id}>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Released</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr>
                <td key={i}> {item.title}</td>
                <td> {item.author} </td>
                <td> {item.released} </td>
                <td>{item._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <h1>Find or add books</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Search/delete books by ID and add them in JSON format: </label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="form-control"
              placeholder="Set id: "
              name="query"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleClick}
            >
              Search all
            </button>
            <button
              type="button"
              className="btn"
              onClick={deleteBook}
            >
              Delete book
            </button>
            <button
              type="button"
              className="btn"
              onClick={addBook}
            >
              Add book
            </button>
          </div>
        </form>
      </div>
      <BookArray data={results} />
    </div>
  );
  };



export default App;