<template>
  <div>
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show"> 
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="C'est confidentiel."
        >
          <b-form-input
            id="input-1"
            v-model="form.bb_email"
            type="email"
            required
            placeholder="Entrez votre email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Votre Nom:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.bb_nom" required placeholder="Entrez votre nom"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Votre Prénom:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.bb_prenom"
            required
            placeholder="Entrez votre prenom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Origin:" label-for="input-4">
          <b-form-select id="input-4" v-model="form.bb_origin" :options="bb_origins" required></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>

    
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js">
</script>

<script>
import PouchDB from "pouchdb";
var db = new PouchDB("_test"); //Ici sont les parametres pour la connexion a la bdd
db.replicate.to("http://127.0.0.1:5984/_test");

export default {
  name: "profil",
  data() {
    return {
      //Ici sont les donnees renvoyées, il s'agit des données nécessaires a la céation d'un profil 
      form: {
        bb_email: "",
        bb_nom: "",
        bb_prenom: "",
        bb_origin: null
      },
      //Origins est le tableau des nationnalités
      bb_origins: [
        { text: "Votre Origine", value: null },
        "Anglais",
        "Espagnol",
        "Portugais",
        "Français"
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      //Cette fct s'execute quand le bouton valider est cliqué
      var bb_vm = this;
      evt.preventDefault();
      var bb_jsonprenom = JSON.stringify(this.form.bb_prenom);
      var bb_jsonnom = JSON.stringify(this.form.bb_nom);
      var bb_jsonmail = JSON.stringify(this.form.bb_mail);
      //Toute les donnees du formulaire son stockées via le json dans des variables puis ajouter a la bdd
      db.put({
        _id: JSON.stringify(this.form.bb_email),
        nom: bb_jsonprenom,
        prenom: bb_jsonnom
      }).then(function(doc) {
        alert(
          JSON.parse(bb_jsonprenom) + JSON.parse(bb_jsonnom) + " ajouté a la BDD"
        );
        bb_vm.$router.push("question");
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Au reset toutes les données reviennent vides
      this.form.email = "";
      this.form.name = "";
      this.form.origin = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getdate(){ //Transformation de la date
        var bb_today = new Date();
        var bb_date=bb_today.getFullYear() + " - " + bb_today.getMonth() + " - " + bb_today.getDate();
        return bb_date;
    }
  }
};
</script>