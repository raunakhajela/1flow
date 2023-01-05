<template>
<div :class="hiden?'hiden_content':'default'">
  <div>
<input type="text" placeholder="Enter Task Name" v-model="tastName"/>
<button @click="addTask">Add</button>
<!-- <button @click="timerStart">{{ secVuex }}</button> -->
  </div>
  {{error}}
  <table>
<tr>
  <td>name</td><td>Time</td><td>Action</td>
</tr>
<tr v-for="item in tasks">
  <td>{{ item.name }}</td><td v-if="item.status">{{ min_Timer }}:{{ sec_Timer }}</td><td v-else>{{item.time }}</td><td> <button v-if="item.status" @click="()=>stopTimer(`${item.name}`)">Stop</button><button v-else  @click="()=>startTimer(`${item.name}`)">Start</button><button @click="()=>getDelete(`${item.name}`)">Delete</button> </td>

</tr>
  </table>
  <span class="hiden_content" v-if="hiden"></span><button v-else @click="addWindow">addWindow</button>
</div>
 
<router-view></router-view>
</template>

<script>
import { mapActions,mapState } from 'vuex';
export default {
  name: "AppLayout",
  data(){
return{ 
 tasks:[],
 tastName:"",
 min_Timer:0,
 sec_Timer:0,
 hr_Timer:0,
 intrerval_Timer:null,
 hiden:window.location.hash.split("/").includes("hello"),
 error:''

}
  },
  computed:{
...mapState({
  secVuex:(state)=>state.sec_Time
})
  },
  methods:{
    ...mapActions({
      timerStart:'startTimer',
      timerStop:'stopTimer'
    }),
    Timer:function(){
      this.sec_Timer++
      this.hr_Timer = Math.floor(this.sec_Timer/3600)
      if(this.sec_Timer==59){
        this.sec_Timer = 0
        this.min_Timer++
      }
    },
    addWindow:function(){
      let chk = this.tasks.filter((o)=>o.status==true)
      const{name,time,status} = chk[0]
      window.openTower({name,time,status});s
     
    },
    addTask:function(){
    this.tasks.push({name:this.tastName,time:'00:00',status:false,done:false});
    },
    startTimer:function(name){
    let objIndex = this.tasks.findIndex((obj => obj.name == name));
    this.tasks[objIndex].status = true
    let chk = this.tasks.filter((o)=>o.status===true)
    if(chk.length===1){
    this.intrerval_Timer = setInterval(this.Timer,1000)
    }
    else{
    this.error = "already task working this time"
    let objIndex = this.tasks.findIndex((obj => obj.name == name));
    this.tasks[objIndex].status = false

    }
    
    },
    stopTimer:function(name){
    clearInterval(this.intrerval_Timer)
    let objIndex = this.tasks.findIndex((obj => obj.name == name));
    this.tasks[objIndex].time = `${this.min_Timer}:${this.sec_Timer}`
    this.tasks[objIndex].status = false
    this.min_Timer = 0
    this.sec_Timer = 0
    console.log(this.tasks);
     },
     getDelete:function(name){
      const filteredPeople = this.tasks.filter((item) => item.name !== name);
      this.tasks = filteredPeople 
     }
  }



};
</script>
<style scoped>
.hiden_content{
  display: none;
}

</style>


import { ref, onMounted,computed} from 'vue'
  const taskrun = ref("")
  onMounted(async() => {
  let data = await window.conteentR.ping()
  taskrun.value = data
  console.log(data);
  })