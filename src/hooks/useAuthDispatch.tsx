import { useContext } from 'react';

import { AuthDispatchContext, SetToken } from '../contexts/AuthProvider';

const useAuthDispatch = (): SetToken => {
  const context = useContext<SetToken | null>(AuthDispatchContext);

  if (context === null) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export default useAuthDispatch;
