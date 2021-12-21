import React from 'react'
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="admin-sidebar-cont">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white">
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link href='/admin/'>
                        <a className='nav-link text-white'>Dashboard</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link collpse-menu collapsed text-white" href="#" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="collapse" data-target="#book-menu">
                    Books
                    </a>
                    <div id="book-menu" className="collapse mx-3">
                    <Link href='/admin/books/allBooks'>
                        <a className='nav-link text-white'>All Books</a>
                    </Link>
                    <Link href='/admin/books/addBook'>
                        <a className='nav-link text-white'>Add Book</a>
                    </Link>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collpse-menu collapsed text-white" href="#" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="collapse" data-target="#card-menu">
                    Cards
                    </a>
                    <div id="card-menu" className="collapse mx-3">
                    
                    <Link href='/admin/cards/addCard'>
                        <a className='nav-link text-white'>Add Card</a>
                    </Link>
                    <Link href='/admin/cards/allCards'>
                        <a className='nav-link text-white'>All Cards</a>
                    </Link>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collpse-menu collapsed text-white" href="#" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="collapse" data-target="#puzzle-menu">
                    Puzzles
                    </a>
                    <div id="puzzle-menu" className="collapse mx-3">
                    <Link href='/admin/puzzles/allPuzzles'>
                        <a className='nav-link text-white'>All Puzzles</a>
                    </Link>
                    <Link href='/admin/puzzles/addPuzzle'>
                        <a className='nav-link text-white'>Add Puzzle</a>
                    </Link>
                    <Link href='/admin/puzzles/addFourTypePuzzle'>
                        <a className='nav-link text-white'>Add Puzzle with Four Parts</a>
                    </Link>
                    </div>
                </li>
        
                </ul>
                <hr/>
            </div>
        </div>
    )
}

export default Sidebar
