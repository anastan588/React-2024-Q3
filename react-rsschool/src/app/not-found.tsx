'use client';
import Link from 'next/link';

function NotFound() {
  return (
    <>
      <div className="notfound-container">
        <h1 className="notfound-title">Page not found</h1>
        <Link className="notfound-button" href="/">
          Main page
        </Link>
      </div>
    </>
  );
}

export default NotFound;
