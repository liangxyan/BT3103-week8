<template>
    <div>
        <ul>
            <li> <router-link to="/" exact> Home </router-link> </li>
            <li> <router-link to="/orders" exact> Orders </router-link> </li>
            <li> <router-link to="/dashboard" exact> Dashboard </router-link> </li>
        </ul>

        <ul>
            <li v-for="ord in orders" v-bind:key="ord[0]"> 
              <div v-for="(num, food) in ord[1]" v-bind:key="food" id="l"> 
                <span> {{ food }}: {{ num }} </span>
              </div>
              <div id="buttons">
                <button v-bind:id="ord[0]" v-on:click="deleteItem($event)"> Delete </button>
                <button v-bind:id="ord[0]" v-on:click="route($event)"> Modify </button>
              </div>
            </li>    
        </ul>
    </div>
</template>

<script>
import database from "./firebase.js"

export default {
  name: "Orders",
  data() {
    return {
      orders: []
    };
  },
  methods: {
      fetchItems: function() {
        database.collection("orders").get().then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
      },
      deleteItem: function(event) {
        let doc_id = event.target.getAttribute("id");
        database.collection('orders').doc(doc_id).delete().then(() => location.reload());
      },
      route: function(event) {
        let doc_id = event.target.getAttribute("id");
        console.log(doc_id);
        this.$router.push({name: 'modify', params: {id: doc_id}})
      }
  },
  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #e8561c;
  border-radius: 10px;
  border-width: 1px;
}
</style>

