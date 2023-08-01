<template>
	<h2>게시글 목록</h2>
	<form @submit.prevent></form>
	<div class="row g-3">
		<div class="col">
			<input v-model="params.title_like" type="text" class="form-control" />
		</div>
		<div class="col-3">
			<select class="form-select" v-model="params._limit">
				<option value="3">3개씩 보기</option>
				<option value="6">6개씩 보기</option>
				<option value="9">9개씩 보기</option>
			</select>
		</div>
	</div>
	<hr class="my-4" />
	<div class="row g-3 mb-5">
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
	<nav aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="{ disabled: !(params._page > 1) }">
				<a
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="--params._page"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: params._page === page }"
			>
				<a class="page-link" href="#" @click.prevent="params._page = page">{{
					page
				}}</a>
			</li>
			<li class="page-item" :class="{ disabled: !(params._page < pageCount) }">
				<a
					class="page-link"
					href="#"
					aria-label="Next"
					@click.prevent="++params._page"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
	<hr class="my-5" />
	<AppCard>
		<PostDetailView :id="'1'"></PostDetailView>
	</AppCard>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '../../components/AppCard.vue';
import { ref, computed, watchEffect } from 'vue';
import { getPosts } from '@/api/post';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);
const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_limit: 3,
	title_like: '',
	_page: 1,
});
//pagination
const totalCount = ref(0);
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / params.value._limit);
});
const featchPosts = async () => {
	try {
		let { data, headers } = await getPosts(params.value);
		totalCount.value = headers['x-total-count'];
		console.log(totalCount.value);
		posts.value = data;
	} catch (error) {
		console.error(error);
	}
};
featchPosts();

watchEffect(featchPosts);

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
