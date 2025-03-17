import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { ArrowLeft, House, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MainForm = ({ 
  home = true, 
  back = false, 
  resultFor = '', 
  autoFocus = false 
}) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    if (!searchWord.trim()) return;
    navigate(`/search?word=${encodeURIComponent(searchWord.trim())}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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
        onKeyDown={handleKeyDown}
      />
      <Button 
        type="submit" 
        onClick={handleSearch}
        className="sm:pl-3"
      >
        <Search className="max-sm:hidden"/>
        <span className="hidden sm:inline">Temukan rima</span>
        <span className="inline sm:hidden"><Search /></span>
      </Button>
      <ModeToggle />
    </div>
  )
}

MainForm.propTypes = {
  className: PropTypes.string,
  home: PropTypes.bool,
  back: PropTypes.bool,
  resultFor: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default MainForm;