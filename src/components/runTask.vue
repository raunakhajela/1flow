<template>
<span class="move_body">
</span>
  <div class="loading" v-if="todos.length!=1">
    Loading......
  </div>
  <div v-else class="todo_wrapper" v-for="todo in todos" key="run">
   <span>{{ todo.text }}</span><span>{{ todo.timeM }}:{{ todo.timeS }}</span>  <span v-if="todo.status" @click="stopTimer(todo)"><PauseIcon class="icon-svg" /></span> <span v-else @click="startTimer(todo)"><PlayIcon class="icon-svg btn-start" /></span> <span><CheckCircleIcon  class="icon-svg" /></span>
  </div>
  </template>
 <script>
import {PauseIcon, PlayIcon,CheckCircleIcon, RectangleGroupIcon } from '@heroicons/vue/24/solid'

 import axios from 'axios'
 export default {
  name:"runtodo",
  components: {
    PlayIcon,
    PauseIcon,
    CheckCircleIcon,
    RectangleGroupIcon

  },
  data(){
    return{
      todos:[]
    }
  },
    methods:{
       getList() {
      axios.get('https://server-oz1f.onrender.com/MyTasks').then(res => {
      let result = res.data;
      let checkRunning = result.filter(o => o.runing == true)[0];
      this.todos.push(checkRunning)
      })
    },
    startTimer(todo){
      if (!todo.timer) {
       todo.status = true
        todo.timer = setInterval(() => {
          todo.timeS += 1;
          if (todo.timeS === 59) {
            todo.timeM += 1
            todo.timeS = 0
          }
        }, 1000);


      } 
    },
    stopTimer(todo){
      todo.status = false
   if(todo.timer){
    clearInterval(todo.timer);
        todo.timer = null;
        
   }  
      }
    },
    mounted() {
    this.getList();
  }
 }

  </script>
  
  <style scoped>
*{
  overflow-y: hidden;
}
  .loading{
    display: flex;
    align-items: center;
    height: 27px;
    padding: 3px;
  }
  .todo_wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding: 3px; 
  }
  .icon-svg {
  height: 14px;
  width: 14px;
  cursor: pointer;
}


.btn-start{
  color: rgb(26, 159, 112);
}
.move_body{
  position: absolute;
  left: 0;
  top: 0;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: rgb(26, 159, 112);
  -webkit-user-select: none;
  -webkit-app-region: drag;
   cursor:default;
}
  </style>
  



































