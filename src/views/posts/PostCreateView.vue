<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary">저장</button>
			</template>
		</PostForm>
		<AppAlert :items="alerts" />
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { createPost } from '@/api/post';
import { ref } from 'vue';
import PostForm from '../../components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';

const { alerts, vAlert } = useAlert();
const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });
const form = ref({
	title: null,
	content: null,
});
const save = async () => {
	try {
		const data = {
			...form.value,
			createdAt: Date.now(),
		};
		await createPost(data);

		vAlert('등록이 완료되었습니다.', 'success');
		// router.push({ name: 'PostList' });
	} catch (error) {
		console.error(error);
	}
};
</script>

<style lang="scss" scoped></style>
