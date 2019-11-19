<template>

<div>
     
    <h1>Des questions vont vous être posées</h1>
    
     <bb_Reponses v-bind:bb_questionslist="bb_oui"/> <!-- Ici il y aura le component Reponses -->
    </div> 
</template>
<script>

import bb_questions from '../../question.json'
import bb_Reponses from '@/components/Reponses.vue'
export default {
    
    name: 'question',
   
    
    components: {
        bb_Reponses
    },
     data () {
     return {
       bb_oui: bb_questions //question est la donnee qui a ete envoye depuis le json
     }
    }
}
</script>
