<template>

<div>
     
    <h1>Des questions vont vous être posées</h1>
    
     <Reponses v-bind:questionslist="oui"/>
    </div> 
</template>
<script>

import questions from '../../question.json'
import Reponses from '@/components/Reponses.vue'
export default {
    
    name: 'question',
   
    
    components: {
        Reponses
    },
     data () {
     return {
       oui: questions
     }
    }
}
</script>
