// Do data parsing here
def parse(text):
    lines = []
    for line in text:
        if line:
            lines.append(line)
    words = []
    for l in lines:
        row = str(l).split(" ")
        while "" in row:
            row.remove("")
        word = {"id": int(row[0]), "head": int(row[6]), "form": row[1]}
        words.append(word)
return words

data = parse(stuff);
datalength = length of data;

var g = new Map(); // define graph
var vertices;
id_to_word = []

for(var i = 0; i < datalength; i++) {
  g.addedge(word['id'], word['head'])
  id_to_word
}

function add_edge(u,v) {
  if(g.get(u) === undefined) {
    g.set(u,[v]);
  }
  else {
    var getVal = g.get(u);
    getVal.push(v);
    g.set(u, getVal);
  }
};

function _is_cyclic_util(start_vertex) {
  var current_vertex = start_vertex;
  var visited = [current_vertex];
  while(g.get(current_vertex).length > 0 && g.get(current_vertex)[0] !== start_vertex) {
    current_vertex = g.get(current_vertex)[0];
    visited.push(current_vertex);
  }
  if(g.get(current_vertex).length > 0) {
    return [visited];
  }
  return [];
}

function normalize_cycle(a) {
  var b = a;
  b.sort();
  var loc = a.indexOf(b[0]);
  var c = [];
  for(var i = 0; i < a.length; i++) {
    c.push(0);
  }
  for(var i = 0; i < a.length; i++) {
    c[i - loc] = a[i];
  }
  return c;
}

function cycle_list() {
  var cycles = [];
  for(var node = 0; node < vertices; node++) {
    var c_datas = _is_cyclic_util(node);
    for(var i = 0; i < c_datas.length; i++) {
      var c_data = c_datas[i];
      if(c_data.length > 0) {
        c_data = normalize_cycle(c_data);
        if(cycles.indexOf(c_data) !== -1) {
          cycles.push(c_data);
        }
      }
    }
  }
  return cycles;
}
function is_cyclic() {
  return cycle_list().length > 0;
};
