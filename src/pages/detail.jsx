import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { get, ref, query as rdbQuery, limitToFirst, } from "firebase/database";
import { firestore, rdb } from "../../firebase";
import { segmenter } from '../segmenter';
import { codeToRimaType, RIMA } from '../utils';

const SearchDetails = () => {
  const [data, setData] = useState([]);
  const [rdbData, setRDBData] = useState([]);
  const { word, rimaTypeCode } = useParams();
  const { toast } = useToast();

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ description: "Teks berhasil disalin.", className: "max-w-[225px] bottom-4 absolute right-10" });
  }

  useEffect(() => {
    const { 
      lastSyllable,
      lastTwoSyllables,
      firstSyllable,
      secondLastSyllable,
      lastSound
    } = segmenter(word);

    const conditions = []

    switch (codeToRimaType[rimaTypeCode]) {
      case RIMA.AKHIR_SEMPURNA:
        conditions.push(where("lastSyllable", "==", lastSyllable));
        break;
      case RIMA.AKHIR_GANDA:
        conditions.push(where("lastTwoSyllables", "==", lastTwoSyllables));
        break;
      case RIMA.AKHIR_TAK_SEMPURNA:
        conditions.push(where("lastSound", "==", lastSound));
        conditions.push(where("lastSyllable", "!=", lastSyllable));
        break;
      case RIMA.AWAL:
        conditions.push(where("firstSyllable", "==", firstSyllable));
        break;
      // TODO: Fix the query for rima konsonan and rima akhir ganda tak sempurna
      default:
        // TODO: FIX THIS, STILL USING THE WRONG WAY TO QUERY
        conditions.push(where("lastSyllable", "==", lastSyllable));
        break;
    }

    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "entries"),
          limit(50),
          // orderBy("numOfSyllables", "desc"),
          ...conditions
        )
      );
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(items);
    };

    const fetchRDBData = async () => {
      const dataRef = ref(rdb, "entries");

      try {
        const snapshot = await get(rdbQuery(dataRef, limitToFirst(10)));
        if (snapshot.exists()) {
          setRDBData(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
    fetchRDBData();
  }, [word, rimaTypeCode]);

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

      {/* RDB Data */}
      <div className="p-5">
        <h1 className="text-xl font-semibold">RDB Data</h1>
        {rdbData.map((item, index) => (
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
      </div>
    </>
  );
}

export default SearchDetails;