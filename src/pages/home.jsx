import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm space-x-2">
        <ModeToggle />
        <Input placeholder="Masukkan Kata" />
        <Button onClick={() => navigate("/search")}>Temukan Rima</Button>
      </div>
    </div>
  );
}

export default Home;