<template>
  <li class="news-item">
    <span class="score">{{ item.score }}</span>
    <span class="title">
      <a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
      <span class="host"> ({{ item.url | host }})</span>
    </span>
    <br />
    <span class="meta">
      <span v-if="item.type !== 'job'" class="by">
        by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
      </span>
      <span v-if="item.type !== 'job'" class="comments-link">
        |
        <router-link :to="'/item/' + item.id"
          >{{ item.descendants }} comments</router-link
        >
      </span>
      <span> {{ item.time | timeAgo }} ago </span>
    </span>
  </li>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
<style>
.news-item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.news-item .score {
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}
.news-item .meta,
.news-item .host {
  font-size: 0.85em;
  color: #828282;
}
.news-item .meta a,
.news-item .host a {
  color: #828282;
  text-decoration: underline;
}
.news-item .meta a:hover,
.news-item .host a:hover {
  color: #f60;
}
</style>
