import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	console.log(config);
	const defaultOptions = {
		immediate: true,
	};

	const { params } = config;
	const { onSuccess, onError, immediate } = {
		...defaultOptions,
		...options,
	};

	const runFunction = body => {
		loading.value = true;
		data.value = null;
		error.value = null;
		axios(url, {
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				loading.value = false;
				if (onSuccess) {
					onSuccess();
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError();
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	if (isRef(params)) {
		watchEffect(runFunction);
	} else {
		if (immediate) {
			runFunction();
		}
	}

	return {
		response,
		data,
		error,
		loading,
		runFunction,
	};
};
