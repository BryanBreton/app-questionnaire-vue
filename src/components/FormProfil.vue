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
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Votre Nom:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.nom" required placeholder="Entrez votre nom"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Votre Prénom:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.prenom" required placeholder="Entrez votre prenom"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Food:" label-for="input-4">
        <b-form-select id="input-4" v-model="form.food" :options="foods" required></b-form-select>
      </b-form-group>

     

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-container>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>
	<script src="https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js"></script>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      foods: [
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
      evt.preventDefault();
      var jsonprenom=JSON.stringify(this.form.prenom);
      var jsonnom=JSON.stringify(this.form.nom);
      var db = new PouchDB('_test');

	db.put({
		_id: 'daniel@gmail.com',
		nom: jsonprenom, 
        prenom: jsonnom
    });
    	db.replicate.to('http://127.0.0.1:5984/_test');

      alert(JSON.parse(jsonprenom) + JSON.parse(jsonnom) + " ajouté a la BDD");

    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>