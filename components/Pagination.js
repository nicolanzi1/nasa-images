import React from 'react'

const Pagination = ({ photosPerPage, totalPhotos, paginate }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPhotos / photosPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className='wrapper'>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className='item'>
                        <a onClick={() => paginate(number)} href="#" className='link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
