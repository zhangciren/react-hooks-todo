import React, { useRef, FC, ReactElement } from 'react'
import { ITodo } from '../typings'

// 以下是函数组件的标准写法

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const TdInput: FC<IProps> = ({
  addTodo,
  todoList
}): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = ():void => {
    const val: string = inputRef.current!.value.trim() // !. 代表着断言。告诉javascript  inputRef.current中一定有value字段
    if (val.length) {
      const isExist = todoList.find(todo => todo.content === val)
      if (isExist) {
        alert('已存在该项')
        return
      }
      // 不存在，则执行添加操作
      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false
      })

      inputRef.current!.value = ''
    }
  }

  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办项" ref={ inputRef } />
      <button onClick={ addItem }>增加</button>
    </div>
  )
}

export default TdInput