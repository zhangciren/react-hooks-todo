import React, { FC, ReactElement, useCallback, useState, useEffect, useReducer } from 'react'
import TdInput from './Input'
import TdList from './List'
import { ITodo, IState, ACTION_TYPE } from './typings'
import { todoReducer } from './reducer'

// const initialState:IState = {
//   todoList: []
// }

function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList
  }
}

const TodoList: FC = (): ReactElement => {

//   const [todoList, setTodoList] = useState<ITodo[]>([])
  // 使用useReducer来代替useState：
  // 比如这个todoList，你可能去add或者remove或者splice等等，也就是你有很多的方法去操作一个状态的变化，而且方法内部有比较相对复杂的逻辑时，就可以使用useReduce
  // 如果你熟悉redux的话，就知道它是如何工作的。
  const [state, dispatch] = useReducer(todoReducer, [], init) // 返回state和dispatch函数


  useEffect(() => {
    console.log(state.todoList)
  }, [state.todoList]) // 当todoList有改变的时候，打印todoList

  // 当父组件更新，子组件并没有更新的时候，这个句柄会重新生成一次。因此会有性能问题
  /*
  const addTodo = (todo: ITodo) => {

  }
  */
  // 因此，要使用useCallback包裹
  const addTodo = useCallback((todo: ITodo): void => {
    // setTodoList(todoList => [...todoList, todo])
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo
    })
  }, [])

  const removeTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id
    })
  }, [])

  const toggleTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id
    })
  }, [])

  return (
    <div className="todo-list">
      <TdInput
        addTodo={ addTodo }
        todoList={ state.todoList }
      />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )
}

export default TodoList