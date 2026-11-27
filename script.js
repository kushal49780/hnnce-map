// 1. Campus Nodes: [0: Name, 1: Floor/Zone, 2: X, 3: Y, 4: Details, 5: Real GPS Lat/Lng]
const nodes = {
  // Front Gate (Left) & Behind Main Block (Canteen Gate, Canteen, ATM)
  MAIN_GATE:    ["Main Gate (Left)", "Front Entry", 65, 310, "Walk a few steps straight ahead to enter the Engineering Main Block.", "12.92536, 77.57885"],
  CANTEEN:      ["College Canteen", "Behind Main (Left)", 200, 515, "Behind Main Block, on the Left of Canteen Gate. Open 8 AM - 6 PM.", "12.92530, 77.57902"],
  CANTEEN_GATE: ["Canteen Gate", "Behind Main Block", 340, 515, "Gate behind Engineering Main Block (Canteen on Left, ATM on Right).", "12.92528, 77.57908"],
  ATM:          ["Campus ATM", "Behind Main (Right)", 480, 515, "Behind Main Block, on the Right of Canteen Gate. Open 24/7.", "12.92526, 77.57914"],

  // Engineering Main Building - Basement (-1)
  B_PHYSICS:    ["Physics Lab", "Basement (-1)", 200, 415, "Engineering Physics Lab in Main Building Basement.", "12.92542, 77.57895"],
  B_CLASS:      ["Basement Classrooms", "Basement (-1)", 340, 415, "Lecture classrooms in the Basement.", "12.92542, 77.57898"],
  B_LIBRARY:    ["Central Library", "Basement (-1)", 480, 415, "Main Library, reading room & VTU digital journals in Basement.", "12.92542, 77.57901"],

  // Engineering Main Building - Ground Floor
  G_OFFICE:     ["Admin Office (Left)", "Ground Floor", 200, 310, "Ground Floor Left: Principal Office, Admissions, Accounts & Exam Cell.", "12.92542, 77.57895"],
  G_WASHROOM:   ["Ground Washroom", "Ground Floor", 340, 310, "Washroom facility on the Ground Floor.", "12.92542, 77.57898"],
  G_MULTIMEDIA: ["Multimedia Hall (Right)", "Ground Floor", 480, 310, "Ground Floor Right: A/C Multimedia Seminar Hall.", "12.92542, 77.57901"],

  // Engineering Main Building - 1st Floor
  F1_CHEM:      ["Chemistry Lab", "1st Floor", 200, 215, "Engineering Chemistry Lab on the 1st Floor.", "12.92542, 77.57895"],
  F1_CSE:       ["Computer Science Lab", "1st Floor", 340, 215, "CSE Programming & Data Structures Lab on the 1st Floor.", "12.92542, 77.57898"],
  F1_STAFF:     ["1st Floor Staff & WR", "1st Floor", 480, 215, "1st Floor Faculty Staffroom and Washroom.", "12.92542, 77.57901"],

  // Engineering Main Building - 2nd Floor
  F2_CLASS:     ["2nd Floor Classrooms", "2nd Floor", 240, 125, "Engineering lecture classrooms on the 2nd Floor.", "12.92542, 77.57896"],
  F2_STAFF:     ["2nd Floor Staff & WR", "2nd Floor", 440, 125, "2nd Floor Faculty Staffroom and Washroom.", "12.92542, 77.57900"],

  // Engineering Main Building - 3rd Floor
  F3_TERRACE:   ["3rd Floor Terrace", "3rd Floor (Top)", 340, 45, "Open Terrace on the 3rd Floor of Main Building.", "12.92542, 77.57898"],

  // Back Gate -> MCA Block -> Sports Room -> Ground -> Degree & PUC Blocks
  BACK_GATE:    ["Back Gate", "Rear Entry (Top)", 720, 55, "Rear gate opening directly in front of the MCA Block.", "12.92578, 77.57902"],
  MCA_BLOCK:    ["MCA Block (3rd Sem/Lab)", "In Front of Back Gate", 660, 175, "3rd Sem classrooms (Right & Left), Staffroom (Left) & MCA Computer Lab.", "12.92568, 77.57900"],
  SPORTS_ROOM:  ["Sports Room & WR", "Below MCA Block", 660, 295, "Located below MCA Block: Sports equipment room and washrooms.", "12.92565, 77.57900"],
  GROUND:       ["College Ground", "Right of Campus", 840, 235, "Spacious outdoor College Ground on the right side of the campus.", "12.925572, 77.579086"],
  DEGREE_BLOCK: ["Degree Block (Left)", "Past MCA (Left)", 645, 455, "Walk a few steps past MCA Block — Degree Block is on the Left.", "12.92548, 77.57912"],
  PUC_BLOCK:    ["PUC Block (Right)", "Past MCA (Right)", 835, 455, "Walk a few steps past MCA Block — PUC Block is on the Right.", "12.92546, 77.57925"]
};

// 2. Campus Connections: [From, To, Meters, Flat/LiftAccessible]
const edges = [
  ["MAIN_GATE", "G_OFFICE", 20, true], ["CANTEEN_GATE", "CANTEEN", 15, true],
  ["CANTEEN_GATE", "ATM", 15, true], ["B_LIBRARY", "CANTEEN_GATE", 20, true],
  ["G_OFFICE", "G_WASHROOM", 18, true], ["G_WASHROOM", "G_MULTIMEDIA", 18, true],
  ["G_OFFICE", "B_PHYSICS", 20, true], ["B_PHYSICS", "B_CLASS", 18, true],
  ["B_CLASS", "B_LIBRARY", 18, true], ["G_MULTIMEDIA", "B_LIBRARY", 20, false],
  ["G_OFFICE", "F1_CHEM", 20, true], ["F1_CHEM", "F1_CSE", 18, true],
  ["F1_CSE", "F1_STAFF", 18, true], ["G_MULTIMEDIA", "F1_STAFF", 20, false],
  ["F1_CHEM", "F2_CLASS", 20, true], ["F2_CLASS", "F2_STAFF", 22, true],
  ["F1_STAFF", "F2_STAFF", 20, false], ["F2_CLASS", "F3_TERRACE", 20, false],
  ["F2_STAFF", "F3_TERRACE", 20, false], ["G_MULTIMEDIA", "MCA_BLOCK", 45, true],
  ["CANTEEN_GATE", "DEGREE_BLOCK", 40, true], ["BACK_GATE", "MCA_BLOCK", 20, true],
  ["BACK_GATE", "GROUND", 40, true], ["MCA_BLOCK", "SPORTS_ROOM", 15, false],
  ["MCA_BLOCK", "GROUND", 35, true], ["SPORTS_ROOM", "DEGREE_BLOCK", 30, true],
  ["SPORTS_ROOM", "PUC_BLOCK", 35, true], ["DEGREE_BLOCK", "PUC_BLOCK", 25, true]
];

// Build Connection List & Populate Dropdowns
const connections = {};
const startSel = document.getElementById("start");
const endSel = document.getElementById("end");

for (let id in nodes) {
  connections[id] = [];
  let label = nodes[id][0] + " (" + nodes[id][1] + ")";
  startSel.add(new Option(label, id));
  endSel.add(new Option(label, id));
}
endSel.value = "F1_CSE";

for (let i = 0; i < edges.length; i++) {
  let u = edges[i][0];
  let v = edges[i][1];
  let w = edges[i][2];
  let flat = edges[i][3];
  connections[u].push({ to: v, w: w, flat: flat });
  connections[v].push({ to: u, w: w, flat: flat });
}

// 3. Draw SVG Campus Map
function drawMap(route) {
  if (!route) route = [];
  const svg = document.getElementById("map");
  let html = `
    <rect x="135" y="12" width="415" height="445" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="145" y="30" font-size="11" font-weight="bold" fill="#1e3a8a">ENGINEERING MAIN BLOCK (BASEMENT TO 3F)</text>
    <rect x="570" y="12" width="335" height="535" rx="8" fill="#dcfce7" stroke="#86efac"/>
    <text x="580" y="30" font-size="11" font-weight="bold" fill="#166534">BACK GATE, MCA, GROUND, DEGREE & PUC</text>
  `;

  for (let i = 0; i < edges.length; i++) {
    let u = edges[i][0], v = edges[i][1], flat = edges[i][3];
    let active = false;
    for (let j = 0; j < route.length - 1; j++) {
      if ((route[j] === u && route[j + 1] === v) || (route[j] === v && route[j + 1] === u)) {
        active = true;
        break;
      }
    }
    html += `<line x1="${nodes[u][2]}" y1="${nodes[u][3]}" x2="${nodes[v][2]}" y2="${nodes[v][3]}"
      stroke="${active ? '#dc2626' : '#94a3b8'}" stroke-width="${active ? 5 : 2.5}"
      stroke-dasharray="${flat ? '0' : '5,5'}"/>`;
  }

  for (let id in nodes) {
    let name = nodes[id][0];
    let x = nodes[id][2];
    let y = nodes[id][3];
    let inRoute = route.indexOf(id) !== -1;

    html += `<g class="node" onclick="showInfo('${id}')">
      <circle cx="${x}" cy="${y}" r="10" fill="${inRoute ? '#dc2626' : '#1e3a8a'}"/>
      <text x="${x}" y="${y + 21}" text-anchor="middle" font-size="10" font-weight="bold">${name}</text>
    </g>`;
  }
  svg.innerHTML = html;
}

// 4. Queue-Based Route Finder (3rd Sem Data Structures - FIFO Queue)
function findRoute() {
  const start = startSel.value;
  const end = endSel.value;
  const noStairs = document.getElementById("noStairs").checked;
  const out = document.getElementById("output");

  if (start === end) {
    out.innerHTML = "You are already at <b>" + nodes[start][0] + "</b>.";
    drawMap([start]);
    return;
  }

  // Standard FIFO Queue (push to rear, shift from front)
  const queue = [[start, [start], 0]];
  const visited = [start];

  while (queue.length > 0) {
    let currentItem = queue.shift();
    let curr = currentItem[0];
    let path = currentItem[1];
    let totalDist = currentItem[2];

    if (curr === end) {
      let mins = Math.max(1, Math.ceil(totalDist / 60));
      let text = "<b>Approx. Distance:</b> " + totalDist + "m (~" + mins + " min)<br><b>Step-by-Step Route:</b><br>";
      for (let i = 0; i < path.length; i++) {
        let nodeId = path[i];
        text += (i + 1) + ". " + nodes[nodeId][0] + " <i>(" + nodes[nodeId][1] + ")</i><br>";
      }
      out.innerHTML = text;
      drawMap(path);
      return;
    }

    let neighbors = connections[curr];
    for (let i = 0; i < neighbors.length; i++) {
      let edge = neighbors[i];
      if (noStairs && !edge.flat) continue;

      if (visited.indexOf(edge.to) === -1) {
        visited.push(edge.to);
        let newPath = path.concat([edge.to]);
        queue.push([edge.to, newPath, totalDist + edge.w]);
      }
    }
  }

  out.innerHTML = "No lift/flat-only route available for this destination (accessible via stairs only).";
  drawMap([]);
}

// 5. Show Facility Details & Google Maps GPS Pin
function showInfo(id) {
  let name = nodes[id][0];
  let floor = nodes[id][1];
  let desc = nodes[id][4];
  let gps = nodes[id][5];
  document.getElementById("info").innerHTML =
    "<b>" + name + "</b> (" + floor + ")<br>" + desc +
    "<br><small><b>GPS:</b> " + gps + " | <a href='https://google.com" + gps + "' target='_blank'>View on Google Maps</a></small>";
}

// 6. Search Facility Bar
function searchPlace() {
  let q = document.getElementById("search").value.toLowerCase();
  if (q === "") return;

  for (let id in nodes) {
    if (nodes[id][0].toLowerCase().indexOf(q) !== -1 ||
        nodes[id][1].toLowerCase().indexOf(q) !== -1 ||
        nodes[id][4].toLowerCase().indexOf(q) !== -1) {
      showInfo(id);
      break;
    }
  }
}

// Initial Map Render
drawMap([]);