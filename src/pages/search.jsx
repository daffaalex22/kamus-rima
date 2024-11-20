import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from "@/components/ui/input";
import { RimaCard } from '../components/rima-card';
import { Toaster } from "@/components/ui/toaster";

const Search = () => {
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
      </div>

      {/* Content */}
      <div className="flex min-h-full items-start justify-evenly mt-14">
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard title="Rima Akhir Ganda"></RimaCard>
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard />
        </div>
      </div>
      <div className="flex min-h-full items-start justify-evenly mt-14">
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard />
        </div>
        <div className="flex w-full max-w-sm space-x-2">
          <RimaCard />
        </div>
      </div>
    </>
  );
}

export default Search;