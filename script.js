// 1. Campus Nodes: [0: Name, 1: Floor/Zone, 2: Latitude, 3: Longitude, 4: Details]
const nodes = {
  MAIN_GATE:    ["Main Gate (Front Entrance)", "Primary Entry for All", 12.92536, 77.57885, "Primary Front Entrance Gate for all students, staff, and visitors."],
  CANTEEN:      ["College Canteen", "Behind Main (Left)", 12.92530, 77.57902, "Behind Main Block, on the Left of Canteen Gate. Open 8 AM - 6 PM."],
  CANTEEN_GATE: ["Canteen Gate", "Behind Main Block", 12.92528, 77.57908, "Gate behind Engineering Main Block (Canteen on Left, ATM on Right)."],
  ATM:          ["Campus ATM", "Behind Main (Right)", 12.92526, 77.57914, "Behind Main Block, on the Right of Canteen Gate. Open 24/7."],

  B_PHYSICS:    ["Physics Lab", "Basement (-1)", 12.92541, 77.57894, "Engineering Physics Lab in Main Building Basement."],
  B_CLASS:      ["Basement Classrooms", "Basement (-1)", 12.92542, 77.57897, "Lecture classrooms in the Basement."],
  B_LIBRARY:    ["Central Library", "Basement (-1)", 12.92543, 77.57900, "Main Library, reading room & VTU digital journals in Basement."],

  G_OFFICE:     ["Admin Office (Left)", "Ground Floor", 12.92544, 77.57893, "Ground Floor Left: Principal Office, Admissions, Accounts & Exam Cell."],
  G_WASHROOM:   ["Ground Washroom", "Ground Floor", 12.92545, 77.57896, "Washroom facility on the Ground Floor."],
  G_MULTIMEDIA: ["Multimedia Hall (Right)", "Ground Floor", 12.92546, 77.57899, "Ground Floor Right: A/C Multimedia Seminar Hall."],

  F1_CHEM:      ["Chemistry Lab", "1st Floor", 12.92547, 77.57894, "Engineering Chemistry Lab on the 1st Floor."],
  F1_CSE:       ["Computer Science Lab", "1st Floor", 12.92548, 77.57897, "CSE Programming & Data Structures Lab on the 1st Floor."],
  F1_STAFF:     ["1st Floor Staff & WR", "1st Floor", 12.92549, 77.57900, "1st Floor Faculty Staffroom and Washroom."],

  F2_CLASS:     ["2nd Floor Classrooms", "2nd Floor", 12.92550, 77.57895, "Engineering lecture classrooms on the 2nd Floor."],
  F2_STAFF:     ["2nd Floor Staff & WR", "2nd Floor", 12.92551, 77.57899, "2nd Floor Faculty Staffroom and Washroom."],
  F3_TERRACE:   ["3rd Floor Terrace", "3rd Floor (Top)", 12.92552, 77.57897, "Open Terrace on the 3rd Floor of Main Building."],

  BACK_GATE:    ["Back Gate (Rear)", "Rear Access", 12.92578, 77.57902, "Rear gate opening directly in front of the MCA Block."],
  MCA_BLOCK:    ["MCA Block (3rd Sem/Lab)", "In Front of Back Gate", 12.92568, 77.57900, "3rd Sem classrooms (Right & Left), Staffroom (Left) & MCA Computer Lab."],
  SPORTS_ROOM:  ["Sports Room & WR", "Below MCA Block", 12.92564, 77.57902, "Located below MCA Block: Sports equipment room and washrooms."],
  GROUND:       ["College Ground", "Right of Campus", 12.925572, 77.579086, "Spacious outdoor College Ground on the right side of the campus."],
  DEGREE_BLOCK: ["Degree Block (Left)", "Past MCA (Left)", 12.92548, 77.57914, "Walk a few steps past MCA Block — Degree Block is on the Left."],
  PUC_BLOCK:    ["PUC Block (Right)", "Past MCA (Right)", 12.92546, 77.57925, "Walk a few steps past MCA Block — PUC Block is on the Right."]
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

// 3. Initialize Interactive Map at HNN College of Engineering
const campusCenter = [12.92552, 77.57903];
const map = L.map("map").setView(campusCenter, 19);

const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution: "© OpenStreetMap"
}).addTo(map);

const satelliteLayer = L.tileLayer("https://arcgisonline.com{z}/{y}/{x}", {
  maxZoom: 21,
  attribution: "© Esri Satellite"
});

L.control.layers({ "Street Map": streetLayer, "Satellite View": satelliteLayer }).addTo(map);

// 4. Build Connections, Dropdowns & Map Pins
const connections = {};
const startSel = document.getElementById("start");
const endSel = document.getElementById("end");
let routeLine = null;
let userMarker = null;

for (let id in nodes) {
  connections[id] = [];
  let name = nodes[id][0];
  let floor = nodes[id][1];
  let lat = nodes[id][2];
  let lng = nodes[id][3];
  let desc = nodes[id][4];

  startSel.add(new Option(`${name} (${floor})`, id));
  endSel.add(new Option(`${name} (${floor})`, id));

  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${name}</b><br><i>${floor}</i><br>${desc}`);
  marker.on("click", () => showInfo(id));
}
endSel.value = "F1_CSE";

edges.forEach(([u, v, w, flat]) => {
  connections[u].push({ to: v, w, flat });
  connections[v].push({ to: u, w, flat });
});

// 5. Queue-Based Route Finder + Red Polyline on Map
function findRoute() {
  const start = startSel.value;
  const end = endSel.value;
  const noStairs = document.getElementById("noStairs").checked;
  const out = document.getElementById("output");

  if (routeLine) map.removeLayer(routeLine);

  if (start === end) {
    out.innerHTML = `You are already at <b>${nodes[start][0]}</b>.`;
    map.setView([nodes[start][2], nodes[start][3]], 20);
    return;
  }

  const queue = [[start, [start], 0]];
  const visited = [start];

  while (queue.length > 0) {
    let [curr, path, totalDist] = queue.shift();

    if (curr === end) {
      let distText = totalDist >= 1000 ? (totalDist / 1000).toFixed(2) + " km" : totalDist + " m";
      let mins = Math.max(1, Math.ceil(totalDist / 60));

      let html = `<b>Distance:</b> ${distText} (~${mins} min walk)<br><b>Step-by-Step Route:</b><br>`;
      const latLngs = [];

      path.forEach((id, i) => {
        html += `${i + 1}. ${nodes[id][0]} <i>(${nodes[id][1]})</i><br>`;
        latLngs.push([nodes[id][2], nodes[id][3]]);
      });

      out.innerHTML = html;

      routeLine = L.polyline(latLngs, { color: "#dc2626", weight: 6, opacity: 0.9 }).addTo(map);
      map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });
      return;
    }

    connections[curr].forEach(edge => {
      if (noStairs && !edge.flat) return;
      if (visited.indexOf(edge.to) === -1) {
        visited.push(edge.to);
        queue.push([edge.to, [...path, edge.to], totalDist + edge.w]);
      }
    });
  }

  out.innerHTML = "No lift/flat-only route available for this destination.";
}

// 6. Live Phone GPS Blue Dot & Recenter Functions
function locateUser() {
  if (!navigator.geolocation) {
    alert("GPS is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.circleMarker([latitude, longitude], {
        radius: 9, fillColor: "#2563eb", color: "#ffffff", weight: 3, fillOpacity: 1
      }).addTo(map).bindPopup("<b>You are here (Live GPS)</b>").openPopup();
      map.setView([latitude, longitude], 19);
    },
    () => alert("Please allow Location access in your browser to show your live GPS dot.")
  );
}

function recenterCampus() {
  if (routeLine) map.removeLayer(routeLine);
  map.setView(campusCenter, 19);
  document.getElementById("output").innerHTML = "Map recentered to HNN College of Engineering Campus.";
}

function showInfo(id) {
  const [name, floor, lat, lng, desc] = nodes[id];
  document.getElementById("info").innerHTML =
    `<b>${name}</b> (${floor})<br>${desc}<br><small><b>GPS:</b> ${lat}, ${lng}</small>`;
}

function searchPlace() {
  const q = document.getElementById("search").value.toLowerCase();
  if (!q) return;
  for (let id in nodes) {
    if (nodes[id][0].toLowerCase().includes(q) || nodes[id][1].toLowerCase().includes(q) || nodes[id][4].toLowerCase().includes(q)) {
      showInfo(id);
      map.setView([nodes[id][2], nodes[id][3]], 20);
      break;
    }
  }
}
