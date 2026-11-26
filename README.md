# CircuiTree

Model your own circuits on the diagram, or draw them on paper and upload a photo to see your circuit come to life on the site!

- **Frontend:** React + TypeScript + Vite (`src/`)
- **Backend:** Python + FastAPI + Gemini (`api/index.py`)
- **Hosting:** Vercel (`vercel.json`)

## Running the Program

Open https://circuitree.vercel.app/. That's all! No setup required.

## How to use it

- **Add parts:** drag them from the Components panel (or click them)
- **Move parts:** drag them around
- **Make a wire:** click a pin (the little squares), then click another pin. Press Esc to cancel.
- **Rotate / delete:** select a part, then press `R` or `Delete`
- **Move around:** drag the background, scroll to zoom
- **Run it:** press **Start Simulation**, then click a switch's slider to flip it
- **From a drawing:** press **Upload Sketch** and pick a photo of a hand-drawn circuit
- **Save / load:** Export and Import (try loading `examples/led-circuit.json`)
- **Arduino:** Plug in all your wires and components and then write code for your Arduino! Add ports to the Arduino as you go!

## Files


index.py        Uses the Gemini API to return a paper drawn circuit to a JSON string as nodes and edges

DO THE REST IN THE FORMAT OF INDEX.PY
| `src/App.tsx` | Holds the circuit (parts + wires) and all the buttons |
| `src/parts.ts` | Info about every part: size, pins, LED colors |
| `src/simulator.ts` | The physics! Figures out current and voltage for every part |
| `src/sketchConverter.ts` | Turns Gemini's `{ nodes, edges }` into our parts and wires |
| `src/visionApi.ts` | Uploads the photo to the backend |
| `src/helpers.ts` | Small math helpers (grid snapping, pin positions when rotated) |
| `src/components/Workplane.tsx` | The grid: dragging, wiring, zooming |
| `src/components/PartDrawing.tsx` | What each part looks like |
| `src/components/PartsPanel.tsx` | The Components panel on the right |
| `src/components/SettingsCard.tsx` | Settings + live readings for the selected part |

## How a photo becomes a circuit

1. visionApi.ts accesses the POST method in index.py
2. Gemini returns nodes (parts) and edges (wires).

3. I HAVE NOT CHANGED #4. BOWEN U GOT THAT
4. `sketchConverter.ts` cleans that up, because the AI doesn't always use the same names:
   - Part types: "battery", "VCC", "9V source" all become a battery; "diode"/"LED" become an LED, etc.
   - Pins: "+", "positive", "anode", "pin1" are all understood.
   - Values: "9V", "330Ω", "4.7k" are read as numbers.
   - Ground symbols get connected to the battery's minus side.
   - Anything we don't support yet (like capacitors) is skipped, and the app tells you.
5. The parts show up on the workplane where you can fix anything the AI got wrong.

## How the simulator works

1. Pins that are wired together get grouped into **nodes** (all the same voltage).
2. Every part acts like a resistor. Batteries also push with a voltage.
3. **Kirchhoff's Current Law**: current into a node = current out. Writing that for every
   node gives a system of equations, which we solve with **Gaussian elimination**.
4. LEDs only work one way, so we guess which ones are on, solve, check, and repeat.

It also warns you about short circuits, LEDs without a resistor, and overheating resistors.
