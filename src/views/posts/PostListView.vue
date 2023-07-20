<template>
	<div>게시글리스트</div>
	<div class="row g-3">
		<div class="col-4" v-for="post in posts" :key="post.id">
			<PostItem
				:title="post.title"
				:content="post.content"
				:createAt="post.createAt"
				@click="goPage(post.id)"
			>
			</PostItem>
		</div>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/post';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);

const featchPosts = () => {
	posts.value = getPosts();
};
featchPosts();

const goPage = id => {
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style lang="scss" scoped></style>
