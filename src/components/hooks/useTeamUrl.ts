import { usePathname } from 'next/navigation';

export function useTeamUrl() {
  const pathname = usePathname();
  const [, teamId] = pathname.match(/^\/teams\/([a-f0-9-]+)/) || [];

  function renderTeamUrl(url: string) {
    return teamId ? `/teams/${teamId}${url}` : url;
  }

  return { teamId, renderTeamUrl, pathname };
}
