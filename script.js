// 1. Campus Nodes: Name, Floor/Zone, Latitude, Longitude, Details
const nodes = {
  MAIN_GATE:    { name: "Main Gate (Front Entrance)", floor: "Primary Entry for All", lat: 12.92536, lng: 77.57885, desc: "Primary Front Entrance Gate for all students, staff, and visitors." },
  CANTEEN:      { name: "College Canteen", floor: "Behind Main (Left)", lat: 12.92530, lng: 77.57902, desc: "Behind Main Block, on the Left of Canteen Gate. Open 8 AM - 6 PM." },
  CANTEEN_GATE: { name: "Canteen Gate", floor: "Behind Main Block", lat: 12.92528, lng: 77.57908, desc: "Gate behind Engineering Main Block (Canteen on Left, ATM on Right)." },
  ATM:          { name: "Campus ATM", floor: "Behind Main (Right)", lat: 12.92526, lng: 77.57914, desc: "Behind Main Block, on the Right of Canteen Gate. Open 24/7." },

  B_PHYSICS:    { name: "Physics Lab", floor: "Basement (-1)", lat: 12.92541, lng: 77.57894, desc: "Engineering Physics Lab in Main Building Basement." },
  B_CLASS:      { name: "Basement Classrooms", floor: "Basement (-1)", lat: 12.92542, lng: 77.57897, desc: "Lecture classrooms in the Basement." },
  B_LIBRARY:    { name: "Central Library", floor: "Basement (-1)", lat: 12.92543, lng: 77.57900, desc: "Main Library, reading room & VTU digital journals in Basement." },

  G_OFFICE:     { name: "Admin Office (Left)", floor: "Ground Floor", lat: 12.92544, lng: 77.57893, desc: "Ground Floor Left: Principal Office, Admissions, Accounts & Exam Cell." },
  G_WASHROOM:   { name: "Ground Washroom", floor: "Ground Floor", lat: 12.92545, lng: 77.57896, desc: "Washroom facility on the Ground Floor." },
  G_MULTIMEDIA: { name: "Multimedia Hall (Right)", floor: "Ground Floor", lat: 12.92546, lng: 77.57899, desc: "Ground Floor Right: A/C Multimedia Seminar Hall." },

  F1_CHEM:      { name: "Chemistry Lab", floor: "1st Floor", lat: 12.92547, lng: 77.57894, desc: "Engineering Chemistry Lab on the 1st Floor." },
  F1_CSE:       { name: "Computer Science Lab", floor: "1st Floor", lat: 12.92548, lng: 77.57897, desc: "CSE Programming & Data Structures Lab on the 1st Floor." },
  F1_STAFF:     { name: "1st Floor Staff & WR", floor: "1st Floor", lat: 12.92549, lng: 77.57900, desc: "1st Floor Faculty Staffroom and Washroom." },

  F2_CLASS:     { name: "2nd Floor Classrooms", floor: "2nd Floor", lat: 12.92550, lng: 77.57895, desc: "Engineering lecture classrooms on the 2nd Floor." },
  F2_STAFF:     { name: "2nd Floor Staff & WR", floor: "2nd Floor", lat: 12.92551, lng: 77.57899, desc: "2nd Floor Faculty Staffroom and Washroom." },
  F3_TERRACE:   { name: "3rd Floor Terrace", floor: "3rd Floor (Top)", lat: 12.92552, lng: 77.57897, desc: "Open Terrace on the 3rd Floor of Main Building." },

  BACK_GATE:    { name: "Back Gate (Rear)", floor: "Rear Access", lat: 12.92578, lng: 77.57902, desc: "Rear gate opening directly in front of the MCA Block." },
  MCA_BLOCK:    { name: "MCA Block (3rd Sem/Lab)", floor: "In Front of Back Gate", lat: 12.92568, lng: 77.57900, desc: "3rd Sem classrooms (Right & Left), Staffroom (Left) & MCA Computer Lab." },
  SPORTS_ROOM:  { name: "Sports Room & WR", floor: "Below MCA Block", lat: 12.92564, lng: 77.57902, desc: "Located below MCA Block: Sports equipment room and washrooms." },
  GROUND:       { name: "College Ground", floor: "Right of Campus", lat: 12.925572, lng: 77.579086, desc: "Spacious outdoor College Ground on the right side of the campus." },
  DEGREE_BLOCK: { name: "Degree Block (Left)", floor: "Past MCA (Left)", lat: 12.92548, lng: 77.57914, desc: "Walk a few steps past MCA Block — Degree Block is on the Left." },
  PUC_BLOCK:    { name: "PUC Block (Right)", floor: "Past MCA (Right)", lat: 12.92546, lng: 77.57925, desc: "Walk a few steps past MCA Block — PUC Block is on the Right." }
};

// 2. Campus Connections
const edges = [
  { u: "MAIN_GATE", v: "G_OFFICE", w: 20, flat: true },
  { u: "CANTEEN_GATE", v: "CANTEEN", w: 15, flat: true },
  { u: "CANTEEN_GATE", v: "ATM", w: 15, flat: true },
  { u: "B_LIBRARY", v: "CANTEEN_GATE", w: 20, flat: true },
  { u: "G_OFFICE", v: "G_WASHROOM", w: 18, flat: true },
  { u: "G_WASHROOM", v: "G_MULTIMEDIA", w: 18, flat: true },
  { u: "G_OFFICE", v: "B_PHYSICS", w: 20, flat: true },
  { u: "B_PHYSICS", v: "B_CLASS", w: 18, flat: true },
  { u: "B_CLASS", v: "B_LIBRARY", w: 18, flat: true },
  { u: "G_MULTIMEDIA", v: "B_LIBRARY", w: 20, flat: false },
  { u: "G_OFFICE", v: "F1_CHEM", w: 20, flat: true },
  { u: "F1_CHEM", v: "F1_CSE", w: 18, flat: true },
  { u: "F1_CSE", v: "F1_STAFF", w: 18, flat: true },
  { u: "G_MULTIMEDIA", v: "F1_STAFF", w: 20, flat: false },
  { u: "F1_CHEM", v: "F2_CLASS", w: 20, flat: true },
  { u: "F2_CLASS", v: "F2_STAFF", w: 22, flat: true },
  { u: "F1_STAFF", v: "F2_STAFF", w: 20, flat: false },
  { u: "F2_CLASS", v: "F3_TERRACE", w: 20, flat: false },
  { u: "F2_STAFF", v: "F3_TERRACE", w: 20, flat: false },
  { u: "G_MULTIMEDIA", v: "MCA_BLOCK", w: 45, flat: true },
  { u: "CANTEEN_GATE", v: "DEGREE_BLOCK", w: 40, flat: true },
  { u: "BACK_GATE", v: "MCA_BLOCK", w: 20, flat: true },
  { u: "BACK_GATE", v: "GROUND", w: 40, flat: true },
  { u: "MCA_BLOCK", v: "SPORTS_ROOM", w: 15, flat: false },
  { u: "MCA_BLOCK", v: "GROUND", w: 35, flat: true },
  { u: "SPORTS_ROOM", v: "DEGREE_BLOCK", w: 30, flat: true },
  { u: "SPORTS_ROOM", v: "PUC_BLOCK", w: 35, flat: true },
  { u: "DEGREE_BLOCK", v: "PUC_BLOCK", w: 25, flat: true }
];

// 3. Build Connections & Populate Dropdowns immediately
const connections = {};
const startSel = document.getElementById("start");
const endSel = document.getElementById("end");
const mapFrame = document.getElementById("gmapFrame");

for (let id in nodes) {
  connections[id] = [];
  let item = nodes[id];
  startSel.add(new Option(item.name + " (" + item.floor + ")", id));
  endSel.add(new Option(item.name + " (" + item.floor + ")", id));
}
endSel.value = "F1_CSE";

for (let i = 0; i < edges.length; i++) {
  let e = edges[i];
  connections[e.u].push({ to: e.v, w: e.w, flat: e.flat });
  connections[e.v].push({ to: e.u, w: e.w, flat: e.flat });
}

// 4. Queue-Based Route Finder + Focus Google Map on Destination
function findRoute() {
  const start = startSel.value;
  const end = endSel.value;
  const noStairs = document.getElementById("noStairs").checked;
  const out = document.getElementById("output");

  if (start === end) {
    out.innerHTML = "You are already at <b>" + nodes[start].name + "</b>.";
    focusMap(nodes[start].lat, nodes[start].lng);
    return;
  }

  const queue = [{ curr: start, path: [start], totalDist: 0 }];
  const visited = [start];

  while (queue.length > 0) {
    let step = queue.shift();

    if (step.curr === end) {
      let distText = step.totalDist >= 1000 ? (step.totalDist / 1000).toFixed(2) + " km" : step.totalDist + " m";
      let mins = Math.max(1, Math.ceil(step.totalDist / 60));

      let html = "<b>Distance:</b> " + distText + " (~" + mins + " min walk)<br><b>Step-by-Step Route:</b><br>";
      for (let i = 0; i < step.path.length; i++) {
        let id = step.path[i];
        html += (i + 1) + ". " + nodes[id].name + " <i>(" + nodes[id].floor + ")</i><br>";
      }

      out.innerHTML = html;
      showInfo(end);
      focusMap(nodes[end].lat, nodes[end].lng);
      return;
    }

    let neighbors = connections[step.curr];
    for (let i = 0; i < neighbors.length; i++) {
      let edge = neighbors[i];
      if (noStairs && !edge.flat) continue;
      if (visited.indexOf(edge.to) === -1) {
        visited.push(edge.to);
        queue.push({
          curr: edge.to,
          path: step.path.concat([edge.to]),
          totalDist: step.totalDist + edge.w
        });
      }
    }
  }

  out.innerHTML = "No lift/flat-only route available for this destination.";
}

function focusMap(lat, lng) {
  mapFrame.src = "https://google.com" + lat + "," + lng + "&t=k&z=20&output=embed";
}

function locateUser() {
  if (!navigator.geolocation) {
    alert("GPS is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      focusMap(pos.coords.latitude, pos.coords.longitude);
      document.getElementById("output").innerHTML = "Centered map on your <b>Live GPS Location</b>.";
    },
    function() {
      alert("Please allow Location access in your browser to center on your live GPS.");
    }
  );
}

function recenterCampus() {
  mapFrame.src = "https://google.com12.925572,77.579086&t=k&z=19&output=embed";
  document.getElementById("output").innerHTML = "Map recentered to HNN College of Engineering Campus.";
}

function showInfo(id) {
  const item = nodes[id];
  document.getElementById("info").innerHTML =
    "<b>" + item.name + "</b> (" + item.floor + ")<br>" + item.desc +
    "<br><small><b>GPS:</b> " + item.lat + ", " + item.lng + "</small>";
}

function searchPlace() {
  const q = document.getElementById("search").value.toLowerCase();
  if (!q) return;
  for (let id in nodes) {
    let item = nodes[id];
    if (item.name.toLowerCase().indexOf(q) !== -1 ||
        item.floor.toLowerCase().indexOf(q) !== -1 ||
        item.desc.toLowerCase().indexOf(q) !== -1) {
      showInfo(id);
      focusMap(item.lat, item.lng);
      break;
    }
  }
}
