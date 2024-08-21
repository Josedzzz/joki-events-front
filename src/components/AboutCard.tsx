export default function AboutCard() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2">
      <div className="w-full max-w-md bg-custom-dark p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-400 text-center mb-6">
          About Us
        </h2>
        <p className="text-base text-slate-50 mb-4 text-justify">
          JokiEvents is a premier event management company specializing in
          ticket sales for concerts and events across Colombia. Our mission is
          to make event experiences accessible and seamless for our customers.
        </p>
        <p className="text-base text-slate-50 mb-4 text-justify">
          Our platform is designed to provide a user-friendly interface where
          customers can easily register, explore upcoming events, and secure
          their tickets with just a few clicks. We prioritize security and
          convenience, ensuring that your event experience begins the moment you
          log in.
        </p>
        <p className="text-base text-slate-50 text-justify">
          Although JokiEvents started as an educational project, it has been
          developed with a professional focus using technologies like Spring
          Boot, Java, TypeScript, HTML, CSS, TailwindCSS, MongoDB, among others.
        </p>
      </div>
    </main>
  );
}
