import { useEffect, useState } from 'react';
import './Home.css'

const Paginacion = ({ page, setPage, maximo, dataSource}) => {
    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1)
        window.scrollTo(0, 0);
    }

    const previousPage = () => {
        setInput(parseInt(input)  - 1);
        setPage(parseInt(page) - 1)
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setInput(1);
        setPage(1)
      }, [dataSource]);

    return(
        <div className='container-pagination'>
            <button disabled={page === 1 || page < 1} onClick={previousPage} className='previousPage'>prev</button>
            <input readOnly name='page' autoComplete='off' value={input}/>
            <p>de {Math.ceil(maximo)}</p>
            <button disabled={page === Math.ceil(maximo) || page > Math.ceil(maximo) }  onClick={nextPage} className='nextPage'>next</button>
        </div>
    );
};

export default Paginacion;