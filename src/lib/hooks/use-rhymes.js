import { useQuery } from '@tanstack/react-query';
import { fetchWordsRhymeWith, fetchDefinition } from '@/utils';

export function useRhymes(word, rimaTypeCode, options = {}) {
  return useQuery({
    queryKey: ['rhymes', word, rimaTypeCode, options],
    queryFn: () => fetchWordsRhymeWith(word, rimaTypeCode, options),
    enabled: !!word && !!rimaTypeCode,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message?.includes('404');
    },
  });
}

export function useDefinition(word) {
  return useQuery({
    queryKey: ['definition', word],
    queryFn: () => fetchDefinition(word),
    enabled: !!word,
    staleTime: 24 * 60 * 60 * 1000, // Definitions can be cached for longer
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message?.includes('404');
    },
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
}
