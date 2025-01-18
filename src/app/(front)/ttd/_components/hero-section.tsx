export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="animate-gradient-x bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-[400px] flex items-center justify-center">
        <div className="text-center text-white space-y-4 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Things To Do</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Découvrez les meilleurs événements et activités à faire au Togo. Des concerts aux ateliers, trouvez votre prochaine
            aventure ici.
          </p>
        </div>
      </div>
    </div>
  );
};
