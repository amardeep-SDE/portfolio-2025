const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 -left-20 w-72 h-72 bg-gradient-to-r from-blue-200 via-teal-200 to-indigo-200 rounded-full mix-blend-multiply animate-blob"></div>

      <div className="absolute top-0 -right-20 w-72 h-72 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>

      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-200 via-green-200 to-blue-200 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default AnimatedBackground;
