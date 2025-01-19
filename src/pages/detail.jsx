import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { codeToRimaType, fetchWordsRhymeWith } from '../utils';
import { Progress } from '@/components/ui/progress';
import MainForm from './../components/main-form';

const SearchDetails = () => {
  const [data, setData] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const { word, rimaTypeCode } = useParams();
  const { toast } = useToast();

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ 
      description: "Teks berhasil disalin.", 
      className: "sm:max-w-[225px] sm:absolute sm:bottom-4 sm:right-10" 
    });
  }

  useEffect(() => {
    if (loading) {
      setLoadingProgress(85);
    } else {
      setTimeout(() => {
        setLoadingProgress(100);
      }, 100);
    }
  }, [loading])
  

  useEffect(() => {
    fetchWordsRhymeWith(word, rimaTypeCode)
      .then(({ items, lastIndex: index }) => {
        setData(items);
        setLastIndex(index);
        setLoading(false);
      })
  }, [word, rimaTypeCode]);

  const handleMore = () => {
    setLoading(true);
    fetchWordsRhymeWith(word, rimaTypeCode, { lastIndex })
      .then(({ items, lastIndex: index }) => {
        setData(prevData => [...prevData, ...items]);
        setLastIndex(index);
        setLoading(false);
      })
  }

  return (
    <>
      <div className="py-6 sm:p-10">
        <Progress value={loadingProgress} className="fixed z-20 top-0 left-0 h-0.5 w-screen"/>
        <div className="sticky top-0 py-5 sm:p-5 left-0 w-full bg-background z-10 shadow-sm">
          <div className="flex items-center justify-center z-5 bg-background">
            <MainForm 
              home={false}
              back={true}
              resultFor={word}
            />
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
        <Button
          className='m-1 mt-2'
          onClick={() => handleMore()}
        >
          Lebih banyak...
        </Button>
      </div>
    </>
  );
}

export default SearchDetails;