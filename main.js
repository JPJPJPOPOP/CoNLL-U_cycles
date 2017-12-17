/*

is_depend_cycles takes in a parameter c which is an Array of Maps .

Each map in c should have three elements, head (maps to an integer), id (maps to an integer), form (maps to a string).


tree is a dictionary of dictionaries.
*/

function is_depend_cycles(tree) {
  var g = new Map();
  var vertices;
  var data = tree;
  vertices = Object.keys(data).length + 1;
  var id_to_word = new Map();

  for (var k in data) {
    if (data.hasOwnProperty(k)) {           
      var word = data[k];
      add_edge(parseId(word["id"]), word["head"]);
      id_to_word.set(parseId(word["id"]), word["form"]);
    }
  }

  console.log("Has Cycles:");
  console.log(_is_cyclic());
  if (_is_cyclic()) {
    console.log("Cycle List:");
    var c_list = cycle_list();
    for (var i = 0; i < c_list.length; i++) {
      var cycle = c_list[i];
      console.log(cycle);
      var word_form = [];
      for (var j = 0; j < cycle.length; j++) {
        word_form.push(id_to_word.get(cycle[j]));
      }
      var output = "";
      for (var j = 0; j < word_form.length; j++) {
        output += String(word_form[j]) + "-->"
      }
      console.log(output);
    }
  }
  return _is_cyclic();
  function add_edge(u,v) {
    if (g.get(u) === undefined) {
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
    while (g.get(current_vertex) !== undefined && g.get(current_vertex).length > 0 && g.get(current_vertex)[0] !== start_vertex) {
      current_vertex = g.get(current_vertex)[0];
      visited.push(current_vertex);
    }
    if (g.get(current_vertex) !== undefined && g.get(current_vertex).length > 0) {
      return [visited];
    }
    return [];
  };

  function normalize_cycle(a) {
    var b = a;
    b.sort();
    var loc = a.indexOf(b[0]);
    var c = [];
    for (var i = 0; i < a.length; i++) {
      c.push(0);
    }
    for (var i = 0; i < a.length; i++) {
      c[i - loc] = a[i];
    }
    return c;
  };

  function cycle_list() {
    var cycles = [];
    for (var node = 0; node < vertices; node++) {
      var c_datas = _is_cyclic_util(node);
      for (var i = 0; i < c_datas.length; i++) {
        var c_data = c_datas[i];
        if (c_data.length > 0) {
          c_data = normalize_cycle(c_data);
          var checkEqual = 0;
          for (var j = 0; j < cycles.length; j++) {
            if (checkIfEqual(cycles[j],c_data) === true) {
              checkEqual = 1;
              break;
            }
          }
          if (checkEqual === 0) {
            cycles.push(c_data);
          }
        }
      }
    }
    return cycles;
  };

  function checkIfEqual(a,b) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  function parseId(id) {
    var nfid = id.substr(2);
    return parseInt(nfid);
  }

  function _is_cyclic() {
    return cycle_list().length > 0;
  };
};
