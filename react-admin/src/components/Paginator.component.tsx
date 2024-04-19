import { useState } from 'react'

const Paginator = (props: {lastPage: number, pageChanged: (page: number) => void}) => {

    const [page, setPage] = useState(1)

    const handleNextPage = () => {
        if (page === props.lastPage) return
            setPage(page + 1)
            props.pageChanged(page + 1)
    
    }
    const handlePreviousPage = () => {
        if (page === 1) return
        setPage(page - 1)
        props.pageChanged(page - 1)
    }

    return (
        <nav className='pagination-nav'>
            <ul className="pagination">
                <li className="page-item">
                    <button 
                        className="page-link" 
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={page === props.lastPage}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator