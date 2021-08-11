import { createStore } from 'vuex'
import app from './modules/app'

export default new createStore({
  modules: {
    app
  }
})
