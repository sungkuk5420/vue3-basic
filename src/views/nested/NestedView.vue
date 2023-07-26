<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<RouterLink class="nav-link" to="/nested/one" active-class="active"
					>nested 1</RouterLink
				>
			</li>
			<li class="nav-item">
				<RouterLink class="nav-link" to="/nested/two" active-class="active"
					>nested 2</RouterLink
				>
			</li>
			<li class="nav-item">
				<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
					>Disabled</a
				>
			</li>
		</ul>
	</div>
	<hr class="my-4" />
	<RouterView></RouterView>
</template>

<script setup></script>

<style lang="scss" scoped></style>
