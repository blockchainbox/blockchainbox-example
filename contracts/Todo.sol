pragma solidity ^0.4.11;

contract Todo {
  event LogTodo(uint256 _num, string _title, bool _finished, bool _disabled);

  struct Todos {
    string title;
    bool finished;
    bool disabled;
  }

  Todos[] public todosArray;
  
  function create(string _title) returns (uint256) {
    var _todos = Todos(_title, false, false);
    todosArray.push(_todos);
    var _curr = todosArray.length - 1;
    LogTodo(_curr, _title, false, false);
    return _curr;
  }

  function update(uint256 _num, string _title, bool _finished, bool _disabled) returns (bool) {
    require(_num < todosArray.length);
    var _todos = todosArray[_num];
    _todos.title = _title;
    _todos.finished = _finished;
    _todos.disabled = _disabled;
    LogTodo(_num, _title, _finished, _disabled);
    return true;
  }

}