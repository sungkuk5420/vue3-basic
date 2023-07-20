<template>
	<div>
		<h2>About View</h2>
		<button class="btn btn-primary" @click="goHomePage">home으로 이동</button>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
console.log('route.path', route.path);
const goHomePage = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped></style>
