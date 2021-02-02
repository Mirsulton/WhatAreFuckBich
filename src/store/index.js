import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {

      return task
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date, customer, typeProject, dataStart, isFavorite,}) {
      const tasks = state.tasks.concat()

      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]




      tasks[idx] = {...task, date: date, description, customer, typeProject, dataStart, isFavorite}
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    removeTask(state, idx) {
      state.tasks.splice(idx, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    
    removeTask({commit}, idx) {
      commit('removeTask', idx)
    }
  },
  modules: {
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
