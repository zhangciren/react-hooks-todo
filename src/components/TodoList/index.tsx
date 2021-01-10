import React, { FC, ReactElement, useCallback, useState, useEffect } from 'react'
import TdInput from './Input'
import TdList from './List'
import { ITodo } from './typings'


const TodoList: FC = (): ReactElement => {

  const [todoList, setTodoList] = useState<ITodo[]>([])


  useEffect(() => {
    console.log(todoList)
  }, [todoList]) // 当todoList有改变的时候，打印todoList

  // 当父组件更新，子组件并没有更新的时候，这个句柄会重新生成一次。因此会有性能问题
  /*
  const addTodo = (todo: ITodo) => {

  }
  */
  // 因此，要使用useCallback包裹
  const addTodo = useCallback((todo: ITodo) => {
    setTodoList(todoList => [...todoList, todo])
  }, [])

  return (
    <div className="todo-list">
      <TdInput
        addTodo={ addTodo }
        todoList={ todoList }
      />
      <TdList />
    </div>
  )
}

export default TodoList