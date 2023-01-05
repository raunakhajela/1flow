<template>
  <router-view></router-view>
  <div :class="hiden?'d-none':'d-display'">
    <div class="btn_frame">
    <span>+</span>
    <span @click="closebtn"><XMarkIcon class="icon-svg" /></span>
  </div>
  <div class="header_wrapper">
    
    <span class="title"><b>All Tasks</b></span> <span class="total_time"><b>{{  toTime }}</b></span>
    
  </div>
  <div class="todos-app">
    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <input type="checkbox" v-model="todo.completed" @click="todoDone(todo)" checked="false" />
        <div class="todo-text" :class="{ 'todo-text-completed': todo.completed }">
          {{ todo.text }}
        </div>
        <div class="todo-time"><span :class="{ 'todo-text-completed': todo.completed }">{{ todo.timeM }}:{{ todo.timeS
}}</span></div>
        <div class="ctrl-btn" @click="deleteTodo(todo)">
          <TrashIcon class="icon-svg btn-del" />
        </div>
        <div v-if="todo.status" class="ctrl-btn" :class="{ 'd-none': todo.completed }" @click="stopTimer(todo)">
          <PauseIcon class="icon-svg" />
        </div>
        <div v-else class="ctrl-btn" :class="{ 'd-none': todo.completed }" @click="startTimer(todo)">
          <PlayIcon class="icon-svg btn-start" />
        </div>
      </div>
    </div>
    <div class="todo-form">
      <input v-model="newTodoText" placeholder="Enter your Todo...." />
      <button @click="addTodo">
        <PlusIcon class="icon-svg btn-start" />
      </button>
    </div>
  </div>
  <div class="prog_wrapper">
    <div class="bar_wrapper" :style="workStaus">
      <span class="work_pro">{{ donStatus }}/{{ todos.length }}</span>
    </div>
  </div>
  
  </div>
  
</template>

<script>
import { TrashIcon, PauseIcon, PlayIcon, PlusIcon,XMarkIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
export default {
  name: 'TodosApp',
  components: {
    TrashIcon,
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    PlusIcon
  },
  data() {
    return {
      todos:[],
      newTodoText: '',
      hiden:window.location.hash.split("/").includes("hello")
    };
  },
  computed: {
    donStatus() {
      return this.todos.filter(o => o.completed == true).length
    },
    toTime(){
      let done =  this.todos.filter(o => o.completed == true) 
      var totalS= 0;
      var totalM= 0;
       for (var i = 0; i < done.length; i++) {
              totalM += done[i].timeM;
              totalS += done[i].timeS;

            }
      
     return `Total Time - ${totalM}:${totalS}`
    },
    workStaus() {
      let d = this.todos.length
     return d != 0 ? 'width:' + (100 / d) * this.todos.filter(o => o.completed == true).length + '%' : 'width:0%'
    }
  },
  methods: {
    getList() {
      axios.get('https://server-oz1f.onrender.com/MyTasks').then(res => this.todos = res.data)
    },
    todoDone(todo) {
      todo.timer != null ? clearInterval(todo.timer) : todo.timer
      let body = {
        "timeM": todo.timeM,
        "timeS": todo.timeS,
        "completed": todo.completed ? false : true,
        "status":false

      }
      axios.patch(`https://server-oz1f.onrender.com/MyTasks/${todo.id}`, body)
        .then(() =>
        this.getList()
        )
        .catch(err => console.log(err))
    },
    addTodo() {
      let project = {
        id: Date.now(),
        text: this.newTodoText,
        timeM: 0,
        timeS: 0,
        timer: null,
        completed: false,
        status: false,
        runing:false
      }
      axios.post('https://server-oz1f.onrender.com/MyTasks', project)
        .then(() => this.getList())
        .catch(err => console.log(err))
      // this.todos.push(project);
      this.newTodoText = '';
    },
    startTimer(todo) {
      if (!todo.timer) {
        todo.status = true
        axios.patch(`https://server-oz1f.onrender.com/MyTasks/${todo.id}`, {"runing":true})
          .then((res) => console.log(res.data))
          .catch(err => console.log(err))
        todo.timer = setInterval(() => {
          todo.timeS += 1;
          if (todo.timeS === 59) {
            todo.timeM += 1
            todo.timeS = 0

          }
        }, 1000);
      }
    },
    stopTimer(todo) {
      if (todo.timer){
        clearInterval(todo.timer);
        todo.timer = null;
        todo.status = false
        let body = {
          "timeM": todo.timeM,
          "timeS": todo.timeS,
          "timer": null,
        }
        axios.patch(`https://server-oz1f.onrender.com/MyTasks/${todo.id}`, body)
          .then((res) => console.log(res.data))
          .catch(err => console.log(err))
      }
    },
    deleteTodo(todo) {
      axios.delete(`https://server-oz1f.onrender.com/MyTasks/${todo.id}`)
        .then(() => this.getList())
        .catch(err => console.log(err))
    },
    closebtn(){
      window.openTower()
    }
  },
  mounted() {
    this.getList();
  }
}



</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

* {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
}
.btn_frame{
  -webkit-user-select: none;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.d-none{
  display: none;
}
.btn_frame span{
  height: 14px;
  width: 28px;
  text-align: center;
  cursor:default;
  padding: 3px;
  -webkit-app-region: no-drag;
}
.btn_frame span:nth-child(2):hover{
  background-color: red;
  color: #F5F5F5;
  z-index:10000;
  
}
.header_wrapper {
  display: flex;
  justify-content: space-between;
  margin: 4px;
  padding-top: 14px;
  font-size: 13px;
}

.prog_wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 18px;
  width: 100%;
  background-color: rgb(225, 225, 225);
}

.bar_wrapper {
  position: relative;
  height: 18px;
  text-align: center;
  color: #F5F5F5;
  font-size: 10px;
  padding: 4px;
  background-color: rgb(10, 144, 122);
}

.d-none {
  display: none;
}

.btn-del {
  color: rgb(255, 0, 34);
}

.btn-start,
.title {
  color: rgb(26, 159, 112);
}

.ctrl-btn {
  height: 20px;
  cursor: pointer;

}

.todo-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 230px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #555 #F5F5F5;
}

.todo-list::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.todo-list::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: rgb(6, 186, 129);
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.4rem;
}

.todo-text {
  flex: 1;
  font-size: 12px;
}

.todo-text-completed {
  text-decoration: line-through;
  color: #ccc;
}

.todo-time {
  width: 5rem;
  text-align: right;
}

.todo-form {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
}

.todo-form input {

  flex: 1;
  height: 1.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 4px 0 0 4px;
}

.todo-form button {
  height: 4rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  background-color: #eee;
  cursor: pointer;
}

.todo-form button {
  height: 2rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  background-color: #eee;
  cursor: pointer;
}

.todo-form button:hover {
  background-color: #ddd;
}

.icon-svg {
  height: 14px;
  width: 14px;
}
</style>