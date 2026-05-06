import { Masthead } from "./sections/01-masthead";
import { ColdOpen } from "./sections/02-cold-open";
import { Constellation } from "./sections/03-constellation";
import { Invariances } from "./sections/04-invariances";
import { Validation } from "./sections/05-validation";
import { Counterpoint } from "./sections/06-counterpoint";
import { Conviction } from "./sections/07-conviction";
import { Speedup } from "./sections/08-speedup";
import { Moat } from "./sections/09-moat";
import { Coda } from "./sections/10-coda";
import { KeywordMarquee } from "./sections/_marquee";

export default function Home() {
  return (
    <main className="grain pitch-fade" style={{ background: "var(--bg)" }}>
      <div className="shell" style={{ background: "var(--bg)" }}>
        <Masthead />
        <ColdOpen />
        <KeywordMarquee />
        <Constellation />
        <Invariances />
        <Validation />
        <Counterpoint />
        <Conviction />
        <Speedup />
        <Moat />
        <Coda />
      </div>
    </main>
  );
}
