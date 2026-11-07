import Calculator from "./calculator";

export default function Home() {
  return (
    <main>
      <header className="page-heading">
        <p className="eyebrow">A BRIGHTER WAY TO COUNT</p>
        <h1>Make room for a little math.</h1>
        <p className="intro">Simple sums, with a little extra color.</p>
      </header>
      <Calculator />
      <p className="page-note">A little clarity for whatever you’re working out.</p>
    </main>
  );
}
