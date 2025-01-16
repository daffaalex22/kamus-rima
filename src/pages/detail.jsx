import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { codeToRimaType, fetchWordsRhymeWith } from '../utils';

const SearchDetails = () => {
  const [data, setData] = useState([]);
  const { word, rimaTypeCode } = useParams();
  const { toast } = useToast();

  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ description: "Teks berhasil disalin.", className: "max-w-[225px] bottom-4 absolute right-10" });
  }

  useEffect(() => {
    fetchWordsRhymeWith(word, rimaTypeCode).then((items) => {
      setData(items);
    })
  }, [word, rimaTypeCode]);

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
        <br />
        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">{codeToRimaType[rimaTypeCode].replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, " ")} untuk: <i>{word}</i></h4>
      </div>

      {/* Content */}
      {data.map((item, index) => (
          <Button 
            key={index} 
            variant='outline' 
            className='m-1 mt-2'
            onClick={() => handleCopy(item.title)}
          >
            {item.title}
          </Button>
        ))
      }

    </>
  );
}

export default SearchDetails;