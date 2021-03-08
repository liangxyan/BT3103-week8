<template>
  <div>
    <ul id="tabs">
      <li> <router-link to="/" exact> Home </router-link> </li>
      <li> <router-link to="/orders" exact> Orders </router-link> </li>
      <li> <router-link to="/dashboard" exact> Dashboard </router-link> </li>
    </ul>
    <ul id="itemsList">
      <li v-for="theItem in items" v-bind:key="theItem.id">
        <p id="itemName">{{ theItem.name }}</p>
        <img v-bind:src="theItem.imageURL" /> <br />
        <p id="price">${{ theItem.price }}</p>
        <qtyCount v-on:counter="onCounter" v-bind:item="theItem"></qtyCount>
      </li>
    </ul>

    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";

import database from "./firebase.js";

export default {
  name: "PageContent",
  components: {
    qtyCount: QuantityCounter,
    basket: Basket,
  },
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  methods: {
    fetchItems: function() {
      database.collection("menu").get().then((querySnapShot) => {
        let i = {};
        querySnapShot.forEach((doc) => {
          i = doc.data();
          i.show = false;
          i.id = doc.id;
          this.items.push(i);
        });
      });
    },
    onCounter: function(item, count) {
      //console.log(count);
      //console.log(this.itemsSelected);
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          var updated = false;

          if (item_name === item.name && count > 0) {
            //update itemsSelected
            //this.itemsSelected[i] = [item.name, count, item.price];
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
            updated = true;
            break;
          }
          if (item_name == item.name && count == 0) {
            //remove it from itemsSelected.
            this.itemsSelected.splice(i, 1);
            updated = true;
            break;
          }
        }
        if (updated == false && count > 0) {
          //item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#itemsList, #tabs {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}

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

img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
  font-weight: bold;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
