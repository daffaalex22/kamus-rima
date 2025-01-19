import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { ArrowLeft, House, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const MainForm = ({ className, ...props }) => {
  const home = props?.home !== false;
  const back = props?.back === true;
  const resultFor = props?.resultFor;
  const autoFocus = props?.autoFocus;

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  useEffect(() => {
      if (inputRef.current && autoFocus) {
        inputRef.current.focus();
      }
  }, [])

  return (
    <div className="flex w-full max-w-sm space-x-2">
      {(home || back) && 
        <Button size="icon" variant="outline" onClick={() => home ? navigate("/") : navigate(`/search?word=${resultFor}`)}>
          {home && <House />}
          {back && <ArrowLeft />}
        </Button>
      }

      <Input 
        ref={inputRef}
        placeholder="Masukkan kata..."
        type="text"
        value={searchWord}
        onChange={handleChange}
      />
      <Button type="submit" onClick={() => navigate(`/search?word=${searchWord}`)}>
        <span className="hidden sm:inline">Temukan rima</span>
        <span className="inline sm:hidden"><Search /></span>
      </Button>
      <ModeToggle />
    </div>
  )
}

export default MainForm;