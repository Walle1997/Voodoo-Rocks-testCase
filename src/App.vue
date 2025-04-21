<script setup lang="ts">
import { onMounted } from "vue";
import SearchPanel from "./components/SearchPanel.vue";
import PostCard from "./components/PostCard.vue";


import { useBlogStore } from "./stores/postsStore";
const blogStore = useBlogStore();

onMounted(() => {
  blogStore.fetchPosts()
  blogStore.fetchAuthors()
});
</script>

<template>
  <div class="container">
    <div class="spinner-block d-flex justify-content-center" v-if="blogStore.isLoading === true">
      <div class="spinner-border my-6" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-else>
      <section class="search-section">
        <div class="row">
          <div class="col col-md-4 offset-md-4">
            <SearchPanel />
          </div>
        </div>
      </section>
      <section class="results-section">
        <div class="row row-cols-1 row-cols-md-3 results-grid">
          <div class="col" v-for="post in blogStore.FilteredPostsList">
            <PostCard :postDetails="post"></PostCard>
          </div>
          <div class="col" v-if="blogStore.FilteredPostsList.length === 0">
            No posts found, please change your search query
          </div>
        </div>
      </section>
    </template>
  </div>
</template>