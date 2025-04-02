import { UseQueryResult } from '@tanstack/react-query';
import { useApp, setUser } from '@/store/app';
import { useApi } from '../useApi';

const selector = (state: { user: any }) => state.user;

export function useLoginQuery(): {
  user: any;
  setUser: (data: any) => void;
} & UseQueryResult {
  const { post, useQuery } = useApi();
  const user = useApp(selector);

  const query = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const data = await post('/auth/verify');

      setUser(data);

      return data;
    },
    enabled: !user,
  });

  return { user, setUser, ...query };
}
