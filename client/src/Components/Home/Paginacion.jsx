const Paginacion = ({ dogsPerPage, totalDogs, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <=  Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href="#!" onClick={()=>{paginate(number)}} className="page-link">
                            {number}
                        </a>
                    </li>
                ))
                }
            </ul>
        </nav>
    );
};

export default Paginacion;