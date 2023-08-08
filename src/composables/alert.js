import { ref } from 'vue';

const alerts = ref([]);
export function useAlert() {
	const vAlert = (message, type = 'error') => {
		alerts.value.push({ message, type });
		setTimeout(() => {
			alerts.value.shift();
		}, 2000);
	};
	return {
		alerts,
		vAlert,
	};
}
