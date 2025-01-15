import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from "firebase/firestore";
import { get, ref, query as rdbQuery, limitToFirst, } from "firebase/database";
import { firestore, rdb } from "../../firebase";

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
  const [data, setData] = useState([]);
  const [rdbData, setRDBData] = useState([]);
  const { word, rimaType } = useParams();
  const { toast } = useToast();

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ description: "Teks berhasil disalin.", className: "max-w-[225px] bottom-4 absolute right-10" });
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "entries"),
          limit(10)
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
  }, []);

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

      {/* Data */}
      <div className="p-5">
        <h1 className="text-xl font-semibold">Data</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>

      {/* RDB Data */}
      <div className="p-5">
        <h1 className="text-xl font-semibold">RDB Data</h1>
        <ul>
          {rdbData.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchDetails;