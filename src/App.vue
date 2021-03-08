<template>
  <div id="app">
    <header>
      <h1>Liang Yan's Amazing Zi Char Store</h1>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
header {
  background-color: aquamarine;
  text-align: center;
  font-size: 20px;
  font-style: italic;
  font-family: Verdana;
  padding: 10px;
}

.tabs {
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  width: 30%;
  display: inline-block;
}
</style>
