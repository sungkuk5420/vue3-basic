<template>
	<h2>게시글 목록</h2>
	<PostFilter
		v-model:title="params.title_like"
		v-model:limit="params._limit"
	></PostFilter>
	<hr class="my-4" />
	<AppGrid :items="posts">
		<template v-slot="{ item }">
			<PostItem
				:title="item.title"
				:content="item.content"
				:createdAt="item.createdAt"
				@click="goPage(item.id)"
				@modal="openModal(item)"
			>
			</PostItem>
		</template>
	</AppGrid>
	<AppPagination
		:currentPage="params._page"
		:pageCount="pageCount"
		@page="page => (params._page = page)"
	/>
	<Teleport to="#modal">
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:created-at="modalCreatedAt"
		></PostModal>
	</Teleport>

	<template v-if="posts && posts.length > 0">
		<hr class="my-5" />
		<AppCard>
			<PostDetailView :id="posts[0].id"></PostDetailView>
		</AppCard>
	</template>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '../../components/posts/PostFilter.vue';
import PostModal from '../../components/posts/PostModal.vue';
import { ref, computed, watchEffect } from 'vue';
import { getPosts } from '@/api/post';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);
const params = ref({
	_sort: 'createdAt',
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

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
	show.value = true;
};
const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
