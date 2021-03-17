import React from "react";

const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "auto",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px"
};

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled,showBlankDataError,showSameTodoError } = props;
  return (
    <>
      <div style={style} className="input-area">
        <input
          disabled={disabled}
          placeholder="Todoを入力"
          value={todoText}
          onChange={onChange}
        />
        <button disabled={disabled} onClick={onClick}>
          追加
        </button>
        {showBlankDataError ?(
         <p style={{color: "red"}}>正しい値を入力してください</p>
      ): null}
        {showSameTodoError ?(
         <p style={{color: "red"}}>同じtodoは登録できません</p>
      ): null}
      </div>
    </>
  );
};