<template>
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">{{ title }}</h5>
			<p class="card-text">
				{{ content }}
			</p>
			<a href="#" class="btn btn-primary">{{ createAt }}</a>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createAt: {
		type: [String, Date, Number],
		required: true,
	},
});
</script>

<style lang="scss" scoped></style>
