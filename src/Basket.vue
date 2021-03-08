<template>
  <div>
    Menu:
    <ul>
      <li v-for="orderedItem in itemsSelected" v-bind:key="orderedItem[0]">
        {{ orderedItem[0] }} x {{ orderedItem[1] }}
      </li>
    </ul>

    <button
      v-on:click.prevent="
        findTotal();
        sendOrder();
      "
    >
      Add Order
    </button>
    <p v-show="clicked">
      Subtotal: ${{ subtotal }} <br />
      Grand Total: ${{ total }}
    </p>
  </div>
</template>

<script>
import database from "./firebase.js";

export default {
  name: "Basket",
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  data() {
    return {
      subtotal: 0,
      total: 0,
      clicked: false,
    };
  },
  methods: {
    sendOrder: function() {
      var theOrder = {
        "Prawn Omelette": 0,
        "Dry Beef Hor Fun": 0,
        "Sambal KangKung": 0,
        "Pork Fried Rice": 0,
        "Mapo Tofu": 0,
        "Cereal Prawn": 0,
      };
      for (let i = 0; i < this.itemsSelected.length; i++) {
        //updates num of items ordered
        theOrder[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
      }

      database
        .collection("orders")
        .add(theOrder)
        .then(() => {
          location.reload();
        });
    },
    findTotal: function() {
      this.clicked = true;
      this.subtotal = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        //console.log(this.itemsSelected[i][1]);
        this.subtotal += this.itemsSelected[i][2] * this.itemsSelected[i][1];
      }
      //console.log(this.subtotal);
    },
  },
  watch: {
    subtotal: function() {
      this.total = (this.subtotal * 1.07).toFixed(2);
    },
  },
};
</script>

<style>
div {
  font-size: 25px;
  line-height: 1.5;
}

button {
  background-color: #fac746;
  padding: 8px;
  font-size: 15px;
}
</style>
