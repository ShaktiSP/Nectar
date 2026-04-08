import { useState, useCallback, useEffect } from 'react';
import { isConnected } from '../appUtils/Networkutils';
import { parseApiError } from '../appUtils/Errorutils';
import { CategoryApiModel } from '../data/CategoryModel';
import { getCategories } from '../api/CategoryApi';

const INITIAL_STATE = {
  status: 'idle',
  data: [] as CategoryApiModel[],
  error: null as string | null,
};

const useCategories = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const fetchCategories = useCallback(async () => {
    const online = await isConnected();

    if (!online) {
      setState({
        status: 'error',
        data: [],
        error: 'No internet connection',
      });
      return;
    }
    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      const apiData = await getCategories();
      setState({
        status: 'success',
        data: apiData,
        error: null,
      });
      console.log(apiData,"fjdhdhdhdh")
    } catch (err) {
      const message = parseApiError(err);

      setState({
        status: 'error',
        data: [],
        error: message,
      });
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, []);
  return {
    categories: state.data,
    status: state.status,
    error: state.error,

    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',

    refetch: fetchCategories,
  };
};

export default useCategories;