import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { RimaCard } from '../components/rima-card';
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWordsRhymeWith, RIMA_CODE } from '../utils';

const Search = () => {
  const [searchParams] = useSearchParams();
  const word = searchParams.get("word");
  
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  // Getting the rima data of `word` here
  const [RASData, setRASData] = useState([]);
  const [RATSData, setRATSData] = useState([]);
  const [RAGData, setRAGData] = useState([]);
  const [RAData, setRAData] = useState([]);
  // const [RAGTSData, setRAGTSData] = useState([]);
  // const [RKData, setRKData] = useState([]);

  useEffect(() => {
    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_SEMPURNA, 
      { limit: 5 }
    ).then(({ items }) => setRASData(items)); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_TAK_SEMPURNA, 
      { limit: 5 }
    ).then(({ items }) => setRATSData(items)); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AKHIR_GANDA, 
      { limit: 5 }
    ).then(({ items }) => setRAGData(items)); 

    fetchWordsRhymeWith(
      word,
      RIMA_CODE.AWAL, 
      { limit: 5 }
    ).then(({ items }) => setRAData(items)); 

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
      <Toaster />
      <div className="sticky top-0 p-5 left-0 w-full bg-background z-10 shadow-sm">
        <div className="flex items-center justify-center z-5 bg-background">
          <div className="flex w-full max-w-sm space-x-2 bg-inherit">
            <ModeToggle />
            <Input 
              placeholder="Masukkan Kata"
              type="text"
              value={searchWord}
              onChange={handleChange}
            />
            <Button type="submit" onClick={() => navigate(`/search?word=${searchWord}`)}>Temukan Rima</Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex min-h-full items-start justify-evenly mt-14">
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAData}
            title="Rima Awal"
            description="Persamaan bunyi pada suku kata pertama"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RASData}
            title="Rima Akhir Sempurna"
            description="Persamaan bunyi pada suku kata terakhir"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RATSData}
            title="Rima Akhir Tak Sempurna"
            description="Persamaan bunyi pada bagian suku kata terakhir"
          />
        </div>
      </div>
      <div className="flex min-h-full items-start justify-evenly mt-14">
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAGData}
            title="Rima Akhir Ganda"
            description="Persamaan bunyi pada dua suku kata terakhir"
          />
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