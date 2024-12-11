<template>
    <nav>
      <ul>
        <li><a href="#login">Iniciar sesión</a></li>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AppMenu'
  }
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline;
    margin-right: 20px;
  }
  a {
    color: white;
    text-decoration: none;
  }
  </style>
  