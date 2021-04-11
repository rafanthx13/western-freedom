<template>
  <div class="container box">
    <div class="columns">

      <!-- Column 1 -->
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Joice_Hasselmann_em_fevereiro_de_2019_%28cropped%29.jpg/220px-Joice_Hasselmann_em_fevereiro_de_2019_%28cropped%29.jpg"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>
        </div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
          <!-- <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a> -->
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          <b-taglist>
            <b-tag type="is-info">First</b-tag>
            <b-tag type="is-info">Second</b-tag>
            <b-tag type="is-info">Third</b-tag>
            <b-tag type="is-info">Fourth</b-tag>
            <b-tag type="is-info">Fifth</b-tag>
          </b-taglist>
        </div>
      </div>

      <!-- Column 2 -->
      <div class="column">
          Second column
      </div>

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
