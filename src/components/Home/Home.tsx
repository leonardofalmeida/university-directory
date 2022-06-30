import { useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import './Home.scss';
import Card from '../Card/Card';
import debounce from '../../utils/debounce';
import {
  BASE_URL_UNIVERSITY_API,
  SEARCH_ENDPOINT,
} from '../../constants/baseUrl';
import NotFoundList from '../NotFoundList/NotFoundList';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { University } from '../../constants/interfaces';
import PAGE_SIZE from '../../constants/constants';

const Home = () => {
  const [data, setData] = useState<University[]>([]);
  const [term, setTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fecthData = async (url: string) => {
    setIsLoading(true);
    await axios
      .get(url)
      .then(response => setData(response.data))
      .catch(err => setError(err))
      .finally(() => {
        setIsLoading(false);
        setCurrentPage(1);
      });
  };

  const getUrlEnconded = (param: string) => {
    const encodedSearchValue: string = encodeURIComponent(param);
    return `${BASE_URL_UNIVERSITY_API}${SEARCH_ENDPOINT}?name=${encodedSearchValue}`;
  };

  const resetValues = () => {
    setTerm('');
    setData([]);
  };

  const searchItems = (searchValue: string) => {
    if (searchValue === '') {
      resetValues();
      return;
    }
    setTerm(searchValue);
    fecthData(getUrlEnconded(searchValue));
  };

  const debounceHandler = useCallback(debounce(searchItems, 300), []);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const showNotFoundList = () => {
    return !isLoading && term;
  };

  const showCardsList = () => {
    if (isLoading) return <SpinnerLoading />;
    return (
      <div className="list">
        {currentData.map(item => (
          <Card item={item} />
        ))}
      </div>
    );
  };

  const showPagination = () => {
    if (currentData.length > 0) {
      return (
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PAGE_SIZE}
          onPageChange={page => setCurrentPage(page)}
        />
      );
    }
    if (showNotFoundList()) return <NotFoundList />;
  };

  if (error)
    return (
      <h1 className="error">Something wrong happened, refresh the page!</h1>
    );

  return (
    <div className="flex">
      <Header searchItems={debounceHandler} />
      {term && (
        <h4 className="term-searched">Search results for {`'${term}'`}</h4>
      )}
      <hr className="full-width" />
      {showPagination()}
      {showCardsList()}
    </div>
  );
};

export default Home;
