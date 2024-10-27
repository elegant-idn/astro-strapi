export function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, {type: '__INIT__'})
    const subscribers = []
  
    return {
      dispatch(action,data) {
        state = rootReducer(state, action,data)
        subscribers.forEach(sub => sub())
      },
      subscribe(callback) {
        subscribers.push(callback)
      },
      getState() {
        return state
      }
    }
  }