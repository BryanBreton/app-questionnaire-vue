<template>
<div id='all'>
    <span>Point de la partie en cours : {{ bb_points }}</span>
<b-form @submit="onSubmit"  action="">
    <p>{{ bb_questionslist["questions"][this.bb_index]["enoncee"] }}</p> <!-- parcourt la liste des questions -->
    <div v-for="bb_reponse in bb_questionslist['questions'][this.bb_index]['reponses']" v-bind:key="bb_reponse"> <!-- affiche la liste des reponses a celle ci -->
        <b-form-checkbox v-model="bb_checkedboxes" v-bind:value="bb_reponse">{{bb_reponse}}</b-form-checkbox> <!-- ces reponses sont dans des checkbox -->
    </div>
    <input type="submit" value="ok" variant="primary"/>
    <span>Noms cochés : {{ bb_checkedboxes }}</span>
    <span >Noms a cocher : {{ bb_tocheck }}</span>
</b-form>
</div>  
</template>

<script>
import { METHODS } from 'http';
export default {
     name: 'Question',
  data(){
      return{
         bb_tocheck: [], //Tab des reponses a mettre
         bb_checkedboxes: [], //Tab des reponses saisies
         bb_index: 0, //Index a parcourir pour afficher les questions
         bb_points: 0 //Points de l'user
      } 
  },
  props: ["bb_questionslist"],
  created : function(){
        console.log(this.bb_questionslist["questions"][this.bb_index]["bonnereponses"])
        this.bb_tocheck.push(this.bb_questionslist["questions"][this.bb_index]["bonnereponses"])
        console.log('ouiiiiiiiiiiiii')
    },
    methods:{
    onSubmit(evt){ //On verifie que les reponses submit sont les memes que les reponses attendues
        this.bb_index=this.bb_index+1
        this.bb_tocheck=this.bb_tocheck[0]
        this.bb_tocheck.sort()
        this.bb_checkedboxes.sort()
        let bb_cpt=0
        let bb_pareil=false
        if(this.bb_checkedboxes.length==this.bb_tocheck.length){ //On verifie que les deux tab font la meme taille (gagne du temps si non)
            for(let bb_i=0; bb_i<this.bb_checkedboxes.length; bb_i++){
                if(this.bb_checkedboxes[bb_i]===this.bb_tocheck[bb_i]){
                    bb_cpt++ //Compte les occurence communes
                }
            }
            if(bb_cpt===this.bb_checkedboxes.length){ //Si autant de commun que la taille (=identique)
                bb_pareil=true
                this.bb_points++ //Il gagne un point
            }
            
        }
        this.bb_checkedboxes=[]
        this.bb_tocheck=[]
        if(this.bb_index<this.bb_questionslist["questions"].length){ //si il y a encore des q? a poser
            this.bb_tocheck.push(this.bb_questionslist["questions"][this.bb_index]["bonnereponses"])   
        } else {
            console.log(this.bb_points)
            this.$root.bb_score=this.bb_points
            this.$router.push({ name: "score" }); //redirection vers score
        }
        
        return bb_pareil
        

    },
    
  }
}

</script>