import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { RimaCard } from '../components/rima-card';
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const RAS = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const RATS = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const RAG = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const RAGTS = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const RAW = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const RK = {
  1: [
    {
      title: 'kan',
      numOfSyllables: 1
    },
    {
      title: 'ban',
      numOfSyllables: 1
    },
    {
      title: 'tan',
      numOfSyllables: 1
    },
  ],
  2: [
    {
      title: 'akan',
      numOfSyllables: 2
    },
    {
      title: 'makan',
      numOfSyllables: 2
    },
    {
      title: 'santan',
      numOfSyllables: 2
    },
  ],
  3: [
    {
      title: 'selokan',
      numOfSyllables: 3
    },
    {
      title: 'penampan',
      numOfSyllables: 3
    },
    {
      title: 'rambutan',
      numOfSyllables: 3
    },
  ],
  4: [
    {
      title: 'perampokan',
      numOfSyllables: 4
    },
    {
      title: 'pengunggahan',
      numOfSyllables: 4
    },
    {
      title: 'perambanan',
      numOfSyllables: 4
    },
    {
      title: 'pengakuan',
      numOfSyllables: 4
    },
    
    {
      title: 'kenyamanan',
      numOfSyllables: 4
    },
    {
      title: 'keamanan',
      numOfSyllables: 4
    },
    {
      title: 'pengaturan',
      numOfSyllables: 4
    },
  ]
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const word = searchParams.get("word");
  
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  // Getting the rima data of `word` here

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
            data={RAS}
            title="Rima Akhir Sempurna"
            description="Persamaan bunyi pada suku kata terakhir"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RATS}
            title="Rima Akhir Tak Sempurna"
            description="Persamaan bunyi pada bagian suku kata terakhir"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAG}
            title="Rima Akhir Ganda"
            description="Persamaan bunyi pada dua suku kata terakhir"
          />
        </div>
      </div>
      <div className="flex min-h-full items-start justify-evenly mt-14">
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAGTS}
            title="Rima Akhir Ganda Tak Sempurna"
            description="Persamaan bunyi pada bagian dua suku kata terakhir"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RAW}
            title="Rima Awal"
            description="Persamaan bunyi pada suku kata pertama"
          />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard
            data={RK}
            title="Rima Konsonan"
            description="Urutan konsonan yang sama"
          />
        </div>
      </div>
    </>
  );
}

export default Search;