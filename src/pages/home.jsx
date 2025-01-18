import MainForm from './../components/main-form';

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <MainForm 
        home={false}
      />
    </div>
  );
}

export default Home;