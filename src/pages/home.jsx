import MainForm from './../components/main-form';
import WordRotate from './../components/ui/word-rotate';
import { useTheme } from '@/components/theme-provider';
import Particles from './../components/ui/particles';
import { useEffect, useState } from 'react';

const Home = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    
    <div className="flex flex-wrap flex-col min-h-screen items-center justify-center">
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={color}
        refresh
      />
      <div className="flex flex-col justify-start basis-1">
        <h1>
          <WordRotate 
            className="text-4xl lg:text-8xl font-bold text-black dark:text-white"
            words={["Selamat Datang!", "R I M A", "Kamus Rima Indonesia"]}
          />
        </h1>
      </div>
      <div className='h-10'></div>
      <MainForm
        autoFocus={true}
        home={false}
      />
      <div className='h-10'></div>
    </div>
  );
}

export default Home;