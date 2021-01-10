import { IState, IAction, ACTION_TYPE, ITodo } from './typings'

function todoReducer(state: IState, action: IAction):IState {
    const { type, payload } = action

    switch(type){
      case ACTION_TYPE.ADD_TODO: 
        return {
          ...state,
          todoList: [...state.todoList, payload as ITodo], // payload可能是ITodo，也可能是number。所以这里要做断言
        }
      case ACTION_TYPE.REMOVE_TODO:
        return {
          ...state,
          todoList: state.todoList.filter(todo => todo.id !== payload)
        }
      case ACTION_TYPE.TOGGLE_TODO:
        return {
          ...state,
          todoList: state.todoList.map(todo => {
            return todo.id === payload ?
            {
              ...todo, 
              completed: !todo.completed
            } :
            {
              ...todo
            }
          })
        }
      case ACTION_TYPE.INIT_TODOLIST: 
        return {
          ...state,
          todoList: payload as ITodo[]
        }
      default: 
        return state
    }
}

export {
  todoReducer
}