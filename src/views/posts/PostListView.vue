<template>
	<h2>게시글 목록</h2>
	<hr class="my-4" />
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
	<hr class="my-4" />
	<AppCard>
		<PostDetailView :id="1"></PostDetailView>
	</AppCard>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '../../components/AppCard.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/post';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);

const featchPosts = async () => {
	try {
		let { data } = await getPosts();
		console.log(data);
		posts.value = data;
	} catch (error) {
		console.error(error);
	}
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
