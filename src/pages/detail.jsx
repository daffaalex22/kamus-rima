import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';

const words = {
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

const SearchDetails = () => {
  const { word, rimaType } = useParams();
  const { toast } = useToast();

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ description: "Teks berhasil disalin.", className: "max-w-[225px] bottom-4 absolute right-10" });
  }

  return (
    <>
      <Toaster />
      <div className="sticky top-0 p-5 left-0 w-full bg-background z-10 shadow-sm">
        <div className="flex items-center justify-center z-5 bg-background">
          <div className="flex w-full max-w-sm space-x-2 bg-inherit">
            <ModeToggle />
            <Input placeholder="Masukkan Kata" />
            <Button type="submit">Temukan Rima</Button>
          </div>
        </div>
        <br />
        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">{rimaType.replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, " ")} untuk: <i>{word}</i></h4>
      </div>

      {/* Content */}
      {Object.keys(words).map(key => (
        words[key].map(w => (
          <Button 
            key={w.title} 
            variant='outline' 
            className='m-1 mt-2'
            onClick={() => handleCopy(w.title)}
          >
            {w.title}
          </Button>
        ))
      ))}
    </>
  );
}

export default SearchDetails;