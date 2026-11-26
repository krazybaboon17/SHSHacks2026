type HomepageProps = {
  onStart: () => void;
  onUploadSketch: () => void;
  onTryExample: () => void;
};

export default function Homepage({ onStart, onUploadSketch, onTryExample }: HomepageProps) {
  return (
    <div className="homepage">
      <img src="/logo.png" alt="CircuitTree logo" className="homepage-logo" />

      <h1>CircuitTree</h1>
      <p>An AI-powered website for designing, simulating, and visualizing electronic circuits.</p>
      <div className="homepage-buttons">
        <button onClick={onStart}>Start New Project</button>
        <button onClick={onUploadSketch}>Upload Sketch</button>
        <button onClick={onTryExample}>Try Example Circuit</button>
      </div>
      <div className="how-it-works">
  <h2>How it works</h2>
  <div className="how-cards">
    <div className="how-card">
      <span className="how-number">01</span>
      <h3>Build or snap a photo</h3>
      <p>Drag parts from the components panel onto the workplane — or upload a photo of a circuit you sketched on paper and let the AI read it.</p>
    </div>
    <div className="how-card">
      <span className="how-number">02</span>
      <h3>Wire it pin-to-pin</h3>
      <p>Click one pin, then another, and CircuitTree draws the wire. Rotate, recolor, and rearrange parts until the schematic looks right.</p>
    </div>
    <div className="how-card">
      <span className="how-number">03</span>
      <h3>Simulate and watch it run</h3>
      <p>Hit simulate and the circuit solves itself — LEDs light up, bulbs glow, and every part reads live voltage and current readings.</p>
    </div>
  </div>
  <div className="features">
  <h2>Features</h2>
  <div className="how-cards">
    <div className="how-card">
      <h3>Drag-and-drop parts</h3>
      <p>Pull batteries, resistors, LEDs, and more from the components panel straight onto the workplane.</p>
    </div>
    <div className="how-card">
      <h3>Pin-to-pin wiring</h3>
      <p>Click one pin, then another, and the wire draws itself. Rearrange anything and the wires follow.</p>
    </div>
    <div className="how-card">
      <h3>Live simulation</h3>
      <p>Hit simulate and watch current flow — LEDs light up and every part reads live voltage and current.</p>
    </div>
    <div className="how-card">
      <h3>Photo to circuit</h3>
      <p>Snap a photo of a hand-drawn circuit and AI reads it into a working schematic.</p>
    </div>
  </div>
  <footer className="homepage-footer">
  <p>CircuitTree — Built for SHSHacks 2026</p>
  <p>Krishiv Mehta · Saharsh Kaparthi · Akhil Kora · Samuel He · Josiah "Jojo" Chen · Bowen Li</p>
</footer>

</div>

</div>

    </div>
  );
}
