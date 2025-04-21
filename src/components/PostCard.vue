<script setup lang="ts">
import { Post } from './../interfaces/Blog'
import { capitalizeFirstLetter } from "./../utils"

import { useBlogStore } from "./../stores/postsStore";
const blogStore = useBlogStore();


defineProps<{ postDetails: Post }>();
</script>

<template>
    <div class="post-card card mb-4 rounded-2 shadow-sm">
        <div class="card-body">
            <h3 class="h5 card-title text-primary">{{ capitalizeFirstLetter(postDetails.title) }}</h3>
            <p class="card-text">{{ capitalizeFirstLetter(postDetails.body) }}</p>
            <p class="card-text"><small class="text-body-secondary">{{ blogStore.AuthorsList.find((author) => author.id
                === postDetails.userId)?.name }}</small></p>
        </div>
    </div>
</template>