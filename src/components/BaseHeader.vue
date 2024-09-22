<template>
  <header>
    <nav>
      <a href="#">Home</a>
      <a href="#">History</a>
      <span>User</span>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader',
};
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #333;
}
</style>
