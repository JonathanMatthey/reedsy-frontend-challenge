<template>
    <div class="book-list-container">
        <h2 class="page-title">Top books of all time</h2>
        <div class="book-list">
            <div v-for="(book, index) in paginatedBooks" :key="book.slug" class="book-item">
                <div class="book-info">
                    <div class="book-details">
                        <router-link :to="'/book/' + book.slug" class="book-title-link">
                            <h3 class="book-title">
                                {{ ((page - 1) * perPage) + index + 1 }}. {{ book.title }}
                                <span class="book-rating">({{ book.rating }}/10)</span>
                            </h3>
                        </router-link>
                        <p class="book-author">{{ book.author }}</p>
                        <p class="book-synopsis">{{ truncateSynopsis(book.synopsis) }}</p>
                        <button class="book-button-upvote">Upvote</button>
                        <span class="book-upvotes">Upvoted {{ book.upvotes }} times</span>
                    </div>
                </div>
                <router-link :to="'/book/' + book.slug" class="book-cover-link">
                    <img :src="book.cover" :alt="book.title" class="book-cover" />
                </router-link>
            </div>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="page === 1" class="pagination-button">
                Previous
            </button>
            <span class="pagination-info">Page {{ page }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="page === totalPages" class="pagination-button">
                Next
            </button>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Book } from '@/types/Book';

export default defineComponent({
    data() {
        return {
            books: [] as Book[],
            page: 1,
            perPage: 5,
            searchQuery: "",
            filteredBooks: [] as Book[]
        };
    },
    computed: {
        paginatedBooks() {
            const start = (this.page - 1) * this.perPage;
            return this.filteredBooks.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredBooks.length / this.perPage);
        }
    },
    methods: {
        async fetchBooks() {
            const response = await axios.get("http://localhost:3000/books");
            this.books = response.data.books;
            this.filteredBooks = this.books;
        },
        searchBooks() {
            this.filteredBooks = this.books.filter(book => {
                return (
                    book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    book.synopsis.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            });
            this.page = 1; // Reset to the first page after search
        },
        truncateSynopsis(synopsis: string) {
            return synopsis.length > 200 ? synopsis.slice(0, 200) + "..." : synopsis;
        },
        nextPage() {
            if (this.page < this.totalPages) this.page++;
        },
        prevPage() {
            if (this.page > 1) this.page--;
        }
    },
    created() {
        this.fetchBooks();
    }
});
</script>

<style lang="scss" scoped>
.book-list-container {
    @include container;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding-top: 20px;

    .page-title {
        font-size: 32px;
        color: $primary-color;
        text-align: center;
        font-weight: 600;
        margin: 0 0 20px 0;
    }

    .book-list {
        display: flex;
        flex-direction: column;
    }

    .book-item {
        display: flex;
        border-radius: 8px;
        overflow: hidden;
        text-align: left;
        padding: 30px;

        &:nth-child(odd) {
            background-color: #ffffff;
        }
    }

    .book-cover-link {
        margin: 0;
        line-height: 0;
    }

    .book-cover {
        width: 120px;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .book-details {
        flex-grow: 1;
    }

    .book-title-link {
        text-decoration: none;
        color: inherit;
        color: $secondary-color;

    }

    .book-title {
        font-size: 20px;
        margin: 0 0 10px;
        color: $secondary-color;
        letter-spacing: -0.5px;
        transition: background-color 0.2s;

        &:hover {
            color: #333;
        }
    }

    .book-rating {
        font-weight: normal;
        color: #666;
        font-size: 14px;
    }

    .book-author {
        font-style: italic;
        margin-bottom: 20px;
        font-size: 13px;
    }

    .book-button-upvote {
        @include button;
        margin-bottom: 5px;
    }


    .book-synopsis {
        font-size: 14px;
        margin-bottom: 30px;
        padding-right: 15px;
    }

    .book-upvotes {
        margin-left: 15px;
        font-size: 13px;
    }
}


.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.pagination-button {
    background-color: $primary-color;
    color: white;

    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: #333;
    }
}

.pagination-info {
    margin: 0 15px;
    font-size: 14px;
    color: #666;
}
</style>