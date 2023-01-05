import { createStore } from 'vuex'
export default createStore({
    state:{
         name:"My Task",
         sec_Time:0,
         min_Time:0,
         hr_Time:0,
         setInter:null
    },
    mutations:{
    setStart(state){
        state.setInter = setInterval(()=>{
           state.sec_Time++
           if(state.sec_Time==59){
            state.min_Time++
            state.sec_Time=0
           }
        },1000)
    },
    setStop(state){
        clearInterval(state.setInter)
    }

    },
    actions:{
    startTimer(context){
        context.commit('setStart')
    },
    stopTimer(context){
        context.commit('setStop')
    }
    },
    getters:{
        
    }
})