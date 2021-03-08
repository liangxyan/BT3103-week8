<template>
  <div>
    <ul>
      <li v-for="(num, food, index) in datapacket" v-bind:key="food">
          <div> {{ food }}: {{ num }} </div>
          <input v-bind:id="index" placeholder=0 type="number" min="0" max="10">
      </li> 
    </ul>
    <button v-on:click="updateOrder()"> Update Order </button>
  </div>
</template>

<script>
import database from "./firebase.js";

export default {
  name: "Modify",
  data() {
    return {
      datapacket: {}
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    fetchItems: function() {
      //console.log(this.id);
      database.collection('orders').doc(this.id).get().then((doc) => {
        this.datapacket = doc.data();
      });
    },
    updateOrder: function() {
      var datapacketCopy = this.datapacket;
      
      for (var d=0; d<6; d++) {
        var newVal = document.getElementById(d).value;
        var dish = Object.keys(datapacketCopy)[d];
        if (isNaN(parseInt(newVal)) == false) {
          datapacketCopy[dish] = parseInt(newVal);
        }
      }

      database.collection('orders').doc(this.id).set(datapacketCopy).then(
        () => this.$router.push({path: '/orders'}));
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 10px;
}

button {
  background-color: #fac746;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  border-width: 1px;
}

</style>
