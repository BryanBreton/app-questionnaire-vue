<template>

<div>
     
    <h1>Vous venez de faire {{ bb_scoreuser }} points</h1>
    
    </div> 
</template>
<script>

import Reponses from '@/components/Reponses.vue'
export default {
    name: 'score',
    props: ["score"],
    data(){
        return{
            scoreuser: ""
        }
        
    },
    created(){
        this.bb_scoreuser= this.$root.bb_score //on recupere depuis root dans main.js l'equivalent de la session
        console.log( this.$root.bb_score) 
        
    },
    
    
    components: {
        Reponses
    },
     
}
</script>