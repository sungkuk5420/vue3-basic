<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			@submit.prevent="edit"
			v-model:title="form.title"
			v-model:content="form.content"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</template>
		</PostForm>
		<!-- <AppAlert
			:show="showAlert"
			:alert-message="alertMessage"
			:type="alertType"
		/> -->
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/post';
import { ref } from 'vue';
import PostForm from '../../components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { error, loading, data: form } = useAxios(`/posts/${id}`);

// const fetchPost = async () => {
// 	const { data } = await getPostById(id);
// 	// post.value = { ...data };
// 	setForm(data);
// };
// const setForm = ({ title, content }) => {
// 	form.value.title = title;
// 	form.value.content = content;
// };
// fetchPost();
const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		vAlert('수정이 완료되었습니다.', 'success');
		router.push({ name: 'PostDetail', params: { id } });
	} catch (error) {
		console.error(error);
		vAlert('네트워크 오류!!');
	}
};
</script>

<style lang="scss" scoped></style>
