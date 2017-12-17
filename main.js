function is_depend_cycles(c) {
  var g = new Map();
  var vertices;
  var data = c;
  vertices = data.length + 1;
  var id_to_word = new Map();

  for(var i = 0; i < vertices-1; i++) {
    var word = data[i];
    add_edge(word.get("id"), word.get("head"));
    id_to_word.set(word.get("id"), word.get("form"));
  }

  console.log("Has Cycles:");
  console.log(is_cyclic());
  if(is_cyclic()) {
    console.log("Cycle List:");
    var c_list = cycle_list();
    for(var i = 0; i < c_list.length; i++) {
      var cycle = c_list[i];
      console.log(cycle);
      var word_form = [];
      for(var j = 0; j < cycle.length; j++) {
        word_form.push(id_to_word[cycle[j]]);
      }
      console.log("-->" + String(word_form) + "-->");
    }
  }
  return is_cyclic();
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
    while(g.get(current_vertex) !== undefined && g.get(current_vertex).length > 0 && g.get(current_vertex)[0] !== start_vertex) {
      current_vertex = g.get(current_vertex)[0];
      visited.push(current_vertex);
    }
    if(g.get(current_vertex) !== undefined && g.get(current_vertex).length > 0) {
      return [visited];
    }
    return [];
  };

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
  };

  function cycle_list() {
    var cycles = [];
    for(var node = 0; node < vertices; node++) {
      var c_datas = _is_cyclic_util(node);
      for(var i = 0; i < c_datas.length; i++) {
        var c_data = c_datas[i];
        if(c_data.length > 0) {
          c_data = normalize_cycle(c_data);
          if(cycles.indexOf(c_data) === -1) {
            cycles.push(c_data);
          }
        }
      }
    }
    return cycles;
  };

  function is_cyclic() {
    return cycle_list().length > 0;
  };
};
