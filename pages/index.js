import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#A8BCA1] flex flex-col items-center">
      <img
        src="/hero-image.jpg"
        alt="FrenchiePal Banner"
        className="w-full max-h-60 object-cover"
      />
      <h1 className="text-3xl font-bold text-white mt-4">🐶 FrenchiePal</h1>
      <p className="text-white mb-4">Il tuo assistente virtuale per Bulldog Francesi e amici a 4 zampe!</p>
      <ChatWidget />
    </main>
  );
}
