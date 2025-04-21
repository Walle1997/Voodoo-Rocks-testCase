import { defineStore } from 'pinia'
import { PostsUrl, AuthorsUrl } from '../constants'

import { Post, Author } from './../interfaces/Blog'

export const useBlogStore = defineStore('blog', {
  state: () => {
    return {
      PostsList: [] as Post[],
      FilteredPostsList: [] as Post[],
      AuthorsList: [] as Author[],
      FilteredAuthorsList: [] as Author[],
      filteredAuthorsIds: [] as number[],
      SearchQuery: "" as string,
      isLoading: true as boolean
    }
  },
  actions: {
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await fetch(PostsUrl);
        if (!response.ok) {
          throw new Error("Не удалось загрузить список статей.");
        }
        const data = await response.json()
        this.PostsList = data
        this.FilteredPostsList = data
      } catch (error: any) {
        console.error("Возникла проблема с fetch запросом: ", error.message);
      }
      this.isLoading = false
    },
    async fetchAuthors() {
      try {
        this.isLoading = true
        const response = await fetch(AuthorsUrl);
        if (!response.ok) {
          throw new Error("Не удалось загрузить список авторов.");
        }
        const data = await response.json()
        this.AuthorsList = data
        this.FilteredAuthorsList = data
      } catch (error: any) {
        console.error("Возникла проблема с fetch запросом: ", error.message);
      }
      this.isLoading = false
    },
    updateFilteredLists() {
      if (this.SearchQuery != "" && this.SearchQuery.length > 1) {
        this.updateFilteredAuthors()
        this.updateFilteredPosts()
      } else {
        this.FilteredPostsList = this.PostsList
      }
    },
    updateFilteredPosts() {
      this.FilteredPostsList = this.PostsList.filter((post) => this.filteredAuthorsIds.includes(post.userId))
    },
    updateFilteredAuthors() {
      this.filteredAuthorsIds = []
      this.AuthorsList.forEach((author) => {
        let isAuthorMatch = author.name.toLowerCase().includes(this.SearchQuery.toLowerCase())
        if (isAuthorMatch && !this.filteredAuthorsIds.includes(author.id)) {
          this.filteredAuthorsIds.push(author.id)
        }
      })
      if (this.filteredAuthorsIds.length === 0) {
        this.FilteredAuthorsList = []
      }
    }
  },
})