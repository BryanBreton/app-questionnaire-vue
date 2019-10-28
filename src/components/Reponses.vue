<template>
<div id='all'>
    <span>Point de la partie en cours : {{ points }}</span>
<b-form @submit="onSubmit"  action="">
    <p>{{ questionslist["questions"][this.index]["enoncee"] }}</p>
    <div v-for="reponse in questionslist['questions'][this.index]['reponses']" v-bind:key="reponse">
        <b-form-checkbox v-model="checkedboxes" v-bind:value="reponse">{{reponse}}</b-form-checkbox>
    </div>
    <input type="submit" value="ok" variant="primary"/>
    <span>Noms cochés : {{ checkedboxes }}</span>
    <span >Noms a cocher : {{ tocheck }}</span>
</b-form>
</div>  
</template>

<script>
import { METHODS } from 'http';
export default {
     name: 'Question',
  data(){
      return{
         tocheck: [], 
         checkedboxes: [],
         index: 0,
         points: 0
      } 
  },
  props: ["questionslist"],
  created : function(){
        console.log(this.questionslist["questions"][this.index]["bonnereponses"])
        this.tocheck.push(this.questionslist["questions"][this.index]["bonnereponses"])
    },
    methods:{
    onSubmit(evt){
        console.log(this.index)
        if(this.index<1){
        this.index=this.index+1
        }
        this.tocheck=this.tocheck[0]
        this.tocheck.sort()
        this.checkedboxes.sort()
        console.log(this.tocheck)
        console.log(this.checkedboxes)
        let cpt=0
        let pareil=false
        if(this.checkedboxes.length==this.tocheck.length){
            console.log("meme taille")
            for(let i=0; i<this.checkedboxes.length; i++){
                if(this.checkedboxes[i]===this.tocheck[i]){
                    cpt++
                }
            }
                    console.log(cpt)
                    console.log(this.checkedboxes.length)
            if(cpt===this.checkedboxes.length){
                console.log("ici")
                pareil=true
                this.points++
            }
            
        }
        return pareil
    },
    
  }
}

</script>