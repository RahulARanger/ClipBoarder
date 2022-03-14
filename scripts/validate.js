$(function () {
	const id_value = $("input[name='id']");

	$("input[type='radio']").click(() => id_value.prop("disabled", true));
	$("input[value='2']").click(() => id_value.prop("disabled", false));
});
