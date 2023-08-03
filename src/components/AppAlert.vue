<template>
	<Transition name="slider">
		<div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
			{{ alertMessage }}
		</div>
	</Transition>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	alertMessage: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: '',
		validator: value => ['success', 'error'].includes(value),
	},
});

const typeStyle = computed(() => {
	return props.type == 'success' ? 'alert-success' : 'alert-danger';
});
</script>

<style scoped>
.app-alert {
	position: fixed;
	top: 10px;
	right: 10px;
}

.slider-enter-from,
.slider-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.slider-enter-active,
.slider-leave-active {
	transition: all 0.5s ease;
}
.slider-enter-to,
.slider-leave-from {
	opacity: 1;
	transform: translateY(0px);
}
</style>
