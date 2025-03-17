import { RimaCard } from '../components/rima-card';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { RIMA, RIMA_CODE } from '../utils';
import MainForm from './../components/main-form';
import { Progress } from '@/components/ui/progress';
import { useRhymes } from '@/lib/hooks/use-rhymes';

const Search = () => {
  const [searchParams] = useSearchParams();
  const word = searchParams.get("word");
  const [loadingProgress, setLoadingProgress] = useState(10);

  // Using React Query hooks
  const rasQuery = useRhymes(word, RIMA_CODE.AKHIR_SEMPURNA, { limit: 5 });
  const ratsQuery = useRhymes(word, RIMA_CODE.AKHIR_TAK_SEMPURNA, { limit: 5 });
  const ragQuery = useRhymes(word, RIMA_CODE.AKHIR_GANDA, { limit: 5 });
  const raQuery = useRhymes(word, RIMA_CODE.AWAL, { limit: 5 });

  const loading = useMemo(() => ({
    [RIMA.AKHIR_SEMPURNA]: rasQuery.isLoading,
    [RIMA.AKHIR_TAK_SEMPURNA]: ratsQuery.isLoading,
    [RIMA.AKHIR_GANDA]: ragQuery.isLoading,
    [RIMA.AWAL]: raQuery.isLoading,
  }), [rasQuery.isLoading, ratsQuery.isLoading, ragQuery.isLoading, raQuery.isLoading]);

  useEffect(() => {
    const loadedCount = Object.values(loading).filter(l => !l).length;
    setLoadingProgress(10 + (loadedCount * 22.5));
  }, [loading]);

  return (
    <>
      <div className="py-6 sm:p-10">
        <Progress value={loadingProgress} className="fixed z-20 top-0 left-0 h-0.5 w-screen"/>
        <div className="sticky top-0 py-5 sm:p-5 left-0 w-full bg-background z-10 shadow-sm">
          <div className="flex items-center justify-center z-5 bg-background">
            <MainForm />
          </div>
          <h4 className="scroll-m-20 mt-5 text-md font-semibold tracking-tight">Menampilkan hasil untuk: <i>{word}</i></h4>
        </div>

        {/* Content */}
        <div className="flex flex-wrap min-h-full items-start justify-evenly mt-4 sm:mt-8">
          <div className="flex mb-6 w-full max-w-sm space-x-2">
            <RimaCard
              key={RIMA.AWAL}
              loading={loading[RIMA.AWAL]}
              data={raQuery.data?.items || []}
              title="Rima Awal"
              description="Persamaan bunyi pada suku kata pertama"
            />
          </div>
          <div className="flex mb-6 w-full max-w-sm space-x-2">
            <RimaCard
              key={RIMA.AKHIR_SEMPURNA}
              loading={loading[RIMA.AKHIR_SEMPURNA]}
              data={rasQuery.data?.items || []}
              title="Rima Akhir Sempurna"
              description="Persamaan bunyi pada suku kata terakhir"
            />
          </div>
          <div className="flex mb-6 w-full max-w-sm space-x-2">
            <RimaCard
              key={RIMA.AKHIR_TAK_SEMPURNA}
              loading={loading[RIMA.AKHIR_TAK_SEMPURNA]}
              data={ratsQuery.data?.items || []}
              title="Rima Akhir Tak Sempurna"
              description="Persamaan bunyi pada bagian suku kata terakhir"
            />
          </div>
          <div className="flex w-full max-w-sm space-x-2">
            <RimaCard
              key={RIMA.AKHIR_GANDA}
              loading={loading[RIMA.AKHIR_GANDA]}
              data={ragQuery.data?.items || []}
              title="Rima Akhir Ganda"
              description="Persamaan bunyi pada dua suku kata terakhir"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;