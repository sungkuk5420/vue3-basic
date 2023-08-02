<template>
	<div>
		<h2>Home View</h2>
		<button class="btn btn-primary" @click="goAboutPage">about으로 이동</button>
	</div>
	<hr class="my-4" />
	<AppGrid :items="items" v-slot="{ item }" :col-clsas="'col-3'">
		<AppCard>{{ item }}</AppCard>
	</AppGrid>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AppGrid from '../components/AppGrid.vue';
import AppCard from '../components/AppCard.vue';
import { ref } from 'vue';
const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};
const items = ref(['사과', '딸기', '포도', '바나나']);
</script>

<style lang="scss" scoped></style>
