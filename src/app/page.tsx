import DotGrid from "@/components/features/DotGrid";

export default function Home() {
  return (
    <main className="w-full h-screen relative">
      <DotGrid
        dotSize={2}
        gap={15}
        baseColor="#5227FF"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={50}
        shockStrength={50}
        resistance={750}
        returnDuration={1.5}
        style={undefined}
      />
    </main>
  );
}
