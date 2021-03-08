<template>
  <div>
    <button v-on:click="decrement()"> - </button>
    {{ counter }}
    <button v-on:click="increment()"> + </button>
  </div>
</template>

<script>
export default {
  name: "QuantityCounter",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment: function() {
      if (this.counter < 10) {
        this.counter++;
      } else {
        alert("You cannot buy more than 10 items.");
      }
      this.$emit("counter", this.item, this.counter);
    },
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit("counter", this.item, this.counter);
    }
  },
  props: ["item"]
};
</script>

<style scoped>
button {
  background-color: yellow;
  height: 50px;
  width: 50px;
  font-size: 30px;
}

div {
  font-size: 30px;
}
</style>
