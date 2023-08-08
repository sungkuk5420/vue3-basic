import AppAlert from '@/components/app/AppAlert.vue';
import AppCard from '@/components/app/AppCard.vue';
import AppModal from '@/components/app/AppModal.vue';
import AppGrid from '@/components/app/AppGrid.vue';
import AppPagination from '@/components/app/AppPagination.vue';

export default {
	install(app) {
		app.component('AppAlert', AppAlert);
		app.component('AppCard', AppCard);
		app.component('AppModal', AppModal);
		app.component('AppGrid', AppGrid);
		app.component('AppPagination', AppPagination);
	},
};
