<template>
    <div class="book-detail">
        <div class="book-header">
            <div class="book-info">
                <h1>{{ book.title }}</h1>
                <p class="book-author">{{ book.author }}</p>
            </div>
            <div class="book-actions">
                <span class="upvotes">Upvoted {{ book.upvotes }} times</span>
                <button class="book-button-upvote">Upvote</button>
            </div>
        </div>
        <div class="book-cover-wrapper">
            <img :src="book.cover" :alt="book.title" class="book-cover" />
        </div>
        <div class="book-body">
            <h2>Synopsis</h2>
            <p>{{ book.synopsis }}</p>
            <div class="book-rating">Rating: {{ book.rating }}/10</div>
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            <textarea v-model="newComment" placeholder="Add a comment"></textarea>
            <button @click="addComment">Submit</button>
            <ul>
                <li v-for="comment in comments" :key="comment">{{ comment }}</li>
            </ul>
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
            book: {} as Book,
            comments: [] as string[],
            newComment: '',
        };
    },
    methods: {
        async fetchBook() {
            const slug = this.$route.params.slug;
            const response = await axios.get(`http://localhost:3000/books/${slug}`);
            this.book = response.data;
        },
        addComment() {
            if (this.newComment) {
                this.comments.push(this.newComment);
                this.newComment = '';
            }
        },
    },
    created() {
        this.fetchBook();
    },
});
</script>

<style scoped lang="scss">
.book-detail {
    @include container;
    padding: 30px 30px;
    background-color: #fffdfd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    text-align: left;
    box-sizing: border-box
}

.book-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: flex-start;


    .book-info {
        display: flex;
        flex-direction: column;

        h1 {
            font-size: 2rem;
            color: $secondary-color;
            margin: 0;
        }

        .book-author {
            font-style: italic;
            margin: 0;
        }
    }


    .book-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-between;
    }

    .book-actions {
        justify-content: space-between;
        text-align: right;

        .upvotes {
            margin-right: 15px;
            font-size: 13px;
        }

        .book-button-upvote {
            @include button;
            margin-bottom: 5px;
        }
    }
}

.book-cover-wrapper {
    text-align: center;
    margin-bottom: 20px;


    .book-cover {
        width: 350px;
        height: auto;
        margin-right: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}

.book-body {
    h2 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 20px;
    }

    .book-rating {
        font-size: 14px;
        font-weight: bold;
        color: #444;
        margin-top: 10px;
    }
}

.comments-section {
    margin-top: 30px;

    textarea {
        width: 100%;
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }

    button {
        @include button;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            padding: 10px 0;
            border-top: 1px solid #e6e6e6;
            font-size: 14px;
        }
    }
}
</style>