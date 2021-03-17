import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
//再度名前変更
export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [showSameTodoError, setShowSameTodoError] = useState(false);
  const [showBlankDataError, setShowBlankDataError] = useState(false);
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    //初期化 (エラーメッセージの表示)
    setShowBlankDataError(false);
    setShowSameTodoError(false);

    const todos = [...incompleteTodos, ...completeTodos];
    if (todos.includes(todoText)) {
      setShowSameTodoError(true);
      return;
    }
    //正規表現もいいが  trim()メソッドが楽！(前後の空白を削除する)
    const isEmpty = todoText.replace(/\s/g, "");
    if (isEmpty === "") {
      setShowBlankDataError(true);
      return;
    }

    //新しくtodoを追加して、追加後ボックスをからにする。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newtodos = [...incompleteTodos];
    newtodos.splice(index, 1);
    setIncompleteTodos(newtodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompletetodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompletetodos);
  };
  const onClickBack = (index) => {
    const newCompletetodos = [...completeTodos];
    newCompletetodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompletetodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
        showBlankDataError={showBlankDataError}
        showSameTodoError={showSameTodoError}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは５個まで</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};