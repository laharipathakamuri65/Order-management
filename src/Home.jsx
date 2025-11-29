import React from 'react';
import { Link } from 'react-router-dom';
//this is home page component
// it will be used to display the home page content
// or a welcome message in the application
export default function Home() {
  return (
    <div className="home-page">
      <h2>Home Page </h2>
      <p>Welcome to the home page!</p>
      <p>Please use the below Quick links to access other pages in our application!</p>
      <ul className="hyper-links">
        <li>
          <Link to="/about">About Page</Link> — Learn about the application.
        </li>
        <li>
          <Link to="/js-features">JS Features</Link> — Examples (async/await, promises).
        </li>
        <li>
          <Link to="/contact">Contact Page</Link> — Contact information.
        </li>
        <li>
          <Link to="/productslist">Products List Page</Link> — Browse and edit products.
        </li>
        <li>
          <Link to="/userdetails">User Details Page</Link> — View and edit users.
        </li>
      </ul>
    </div>
  )
}
