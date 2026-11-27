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

(Note that components in the descriptions, not the folder names, is describing the group of devices found in a circuit such as the battery)

api/index.py →  Uses the Gemini API to return a paper drawn circuit to a JSON string as nodes and edges
src/App.tsx →  Manages the editing functionalities and holds the circuit
src/helpers.ts → Manages the alignment and coordination of each of the circuit components
src/main.tsx → Connects React code to the website 
src/parts.ts → Defines the necessary information for each of the circuit components
src/simulator.ts → Uses physics, mainly Kirchoff’s Current laws, to simulate how the circuit would behave
src/sketchConverter.ts → Categorizes the AI visual detection into universal and fixed component names
src/styles.css → Defines the style of the website
src/visionApi.ts → Sends photos uploaded by the user to the backend
src/components/Homepage.tsx → Creates the homepage of the website
src/components/PartDrawing.tsx → Defines how each component should look like in a circuit and accounts for the simulated values given during a circuit simulation
src/components.PartsPanel.tsx → Creates the sidebar using parts.ts so that components can be dragged and dropped to from the sidebar to create a circuit
src/components/SettingsCard.tsx → Creates and displays the settings of a component that you click in a circuit
src/components/Workplane.tsx → Renders the grid and components and handles mouse interactions such as zooming in/out or dropping and dragging components
Index.html → The html page in which main.tsx loads the website for CircuitTree
 

## How a photo becomes a circuit

1. visionApi.ts accesses the POST method in index.py
2. Gemini returns nodes (parts) and edges (wires).
4. `sketchConverter.ts` categorizes the AI detection into standard component names since the AI detection could be using different names:
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
