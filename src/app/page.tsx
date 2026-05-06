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

export default function Home() {
  return (
    <main className="grain pitch-fade" style={{ background: "var(--bg)" }}>
      <div
        style={{
          margin: "0 auto",
          width: 1440,
          minWidth: 1440,
          background: "var(--bg)",
        }}
      >
        <Masthead />
        <ColdOpen />
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
