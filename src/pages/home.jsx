import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm space-x-2">
        <ModeToggle />
        <Input 
          placeholder="Masukkan Kata"
          type="text"
          value={searchWord}
          onChange={handleChange}
        />
        <Button onClick={() => navigate(`/search?word=${searchWord}`)}>Temukan Rima</Button>
      </div>
    </div>
  );
}

export default Home;