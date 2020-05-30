<template>
  <div class="textcontainer">
    <p class="text" data-text="UnKnownTown">UnKnownTown</p>
  </div>
</template>

<script>
  export default {
    name: "WaveText"
  }
</script>

<style scoped>

  .textcontainer{
   z-index: 150;

  }
  .textcontainer .text {
    margin: 0;
    font-size: 6em;
    font-family: "montserrat",sans-serif;
    height: 100%;
    position: relative;
    color: rgba(255,255,255,.2);
    background-image: url("../../assets/img/font_end/home/water.png");
    font-weight: 600;
    -webkit-background-clip: text;
    animation: wave 30s linear infinite;
    z-index: 1;
  }

  @keyframes wave {
    from {
      background-position:0 0;
    }
    to {
      background-position: 1200px 0;
    }
  }
  @media screen and (max-width: 900px){
    .textcontainer .text{
      font-size: 4.5em;
    }
  }
  @media screen and (max-width: 635px){
    .textcontainer .text{
      font-size: 3.5em;
    }
  }
  @media screen and (max-width: 480px){
    .textcontainer .text{
      font-size: 3em;
      background-position: 0;
    }
    @keyframes wave {
      from {
        background-position:0 -25px;
      }
      to {
        background-position: 1200px -25px;
      }
    }
  }
  .textcontainer .text::before, .textcontainer .text::after{
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .textcontainer .text:hover{
    color: #ffffff;
  }
  .textcontainer .text:hover::before{
    color: #ff00c1;
    animation: glitch-effect 3s infinite;
  }
  .textcontainer .text:hover::after{
    color: #3498db;
    animation: glitch-effect 2s infinite;
  }

  @keyframes glitch-effect {
    0%{
      left: -2px;
      top: -2px;
    }
    25%{
      left: 2px;
      top: 0px;
    }
    50%{
      left: -1px;
      top: 2px;
    }
    75%{
      left: 1px;
      top: -1px;
    }
    100%{
      left: 0px;
      top: -2px;
    }
  }
</style>