import { useState } from 'react'

const Paginator = (props: {page: number, lastPage: number, pageChanged: (page: number) => void}) => {

    const handleNextPage = () => {
        if (props.page === props.lastPage) return
            
        props.pageChanged(props.page + 1)
    
    }
    const handlePreviousPage = () => {
        if (props.page === 1) return
        
        props.pageChanged(props.page - 1)
    }

    return (
        <nav className='pagination-nav'>
            <ul className="pagination">
                <li className="page-item">
                    <button 
                        className="page-link" 
                        onClick={handlePreviousPage}
                        disabled={props.page === 1}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={props.page === props.lastPage}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator