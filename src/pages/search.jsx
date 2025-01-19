import { RimaCard } from '../components/rima-card';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWordsRhymeWith, RIMA, RIMA_CODE } from '../utils';
import MainForm from './../components/main-form';
import { Progress } from '@/components/ui/progress';

const Search = () => {
  const [searchParams] = useSearchParams();
  const word = searchParams.get("word");

  // Getting the rima data of `word` here
  const [RASData, setRASData] = useState([]);
  const [RATSData, setRATSData] = useState([]);
  const [RAGData, setRAGData] = useState([]);
  const [RAData, setRAData] = useState([]);
  // const [RAGTSData, setRAGTSData] = useState([]);
  // const [RKData, setRKData] = useState([]);

  const [loading, setLoading] = useState({
    [RIMA.AKHIR_SEMPURNA]: true,
    [RIMA.AWAL]: true,
    [RIMA.AKHIR_GANDA]: true,
    [RIMA.AKHIR_TAK_SEMPURNA]: true,
  });

  const [loadingProgress, setLoadingProgress] = useState(10);

  useEffect(() => {
    Object.keys(loading).forEach((key, index) => {
      if (loading[key]) return
      setTimeout(() => setLoadingProgress(prev => prev + 22.5), index * 100);
    })
  }, [loading])
  

  useEffect(() => {
    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_SEMPURNA, 
      { limit: 5 }
    ).then(({ items }) => {
      setRASData(items);
      setLoading((prev) => ({ ...prev, [RIMA.AKHIR_SEMPURNA]: false }));
    }); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_TAK_SEMPURNA, 
      { limit: 5 }
    ).then(({ items }) => {
      setRATSData(items);
      setLoading((prev) => ({ ...prev, [RIMA.AKHIR_TAK_SEMPURNA]: false }));
    }); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_GANDA, 
      { limit: 5 }
    ).then(({ items }) => {
      setRAGData(items)
      setLoading((prev) => ({ ...prev, [RIMA.AKHIR_GANDA]: false }));
    }); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AWAL, 
      { limit: 5 }
    ).then(({ items }) => {
      setRAData(items);
      setLoading((prev) => ({ ...prev, [RIMA.AWAL]: false }));
    }); 

    // fetchWordsRhymeWith(
    //   word,
    //   RIMA_CODE.AKHIR_GANDA_TAK_SEMPURNA, 
    //   { limit: 5 }
    // ).then(({ items }) => setRAGTSData(items)); 

    // fetchWordsRhymeWith(
    //   word,
    //   RIMA_CODE.KONSONAN, 
    //   { limit: 5 }
    // ).then(({ items }) => setRKData(items)); 
  }, [word])


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
              loading={loading[RIMA.AWAL]}
              data={RAData}
              title="Rima Awal"
              description="Persamaan bunyi pada suku kata pertama"
            />
          </div>
          <div className="flex mb-6 w-full max-w-sm space-x-2">
            <RimaCard
              loading={loading[RIMA.AKHIR_SEMPURNA]}
              data={RASData}
              title="Rima Akhir Sempurna"
              description="Persamaan bunyi pada suku kata terakhir"
            />
          </div>
          <div className="flex mb-6 w-full max-w-sm space-x-2">
            <RimaCard
              loading={loading[RIMA.AKHIR_TAK_SEMPURNA]}
              data={RATSData}
              title="Rima Akhir Tak Sempurna"
              description="Persamaan bunyi pada bagian suku kata terakhir"
            />
          </div>
          <div className="flex w-full max-w-sm space-x-2">
            <RimaCard
              loading={loading[RIMA.AKHIR_GANDA]}
              data={RAGData}
              title="Rima Akhir Ganda"
              description="Persamaan bunyi pada dua suku kata terakhir"
            />
          </div>
        </div>
        {/* <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAGTSData}
            title="Rima Akhir Ganda Tak Sempurna"
            description="Persamaan bunyi pada bagian dua suku kata terakhir"
          />
        </div> */}
        {/* <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RKData}
            title="Rima Konsonan"
            description="Urutan konsonan yang sama"
          />
        </div> */}
      </div>
    </>
  );
}

export default Search;