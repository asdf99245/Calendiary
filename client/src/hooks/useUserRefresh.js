import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { silentRefresh } from '../api/authAPI';
import { userLogin } from '../modules/user';
import QUERY_KEY from '../libs/react-query/queryKey';

function useUserRefresh() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useQuery([QUERY_KEY.USER], silentRefresh, {
    retry: false,
    onSuccess: (res) => {
      const { user_id, user_name } = res.data;
      dispatch(userLogin({ user_id, user_name }));
      queryClient.invalidateQueries([QUERY_KEY.DIARIES]);
    },
  });
}

export default useUserRefresh;
