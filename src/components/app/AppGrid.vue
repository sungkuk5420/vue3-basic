<template>
	<div class="row g-3 mb-5">
		<div :class="colClsas" v-for="(item, index) in items" :key="index">
			<slot :item="item" :index="index"></slot>
		</div>
	</div>
</template>

<script setup>
defineProps({
	items: {
		type: Array,
		required: true,
	},
	colClsas: {
		type: String,
		default: 'col-4',
	},
});
</script>

<style lang="scss" scoped></style>
