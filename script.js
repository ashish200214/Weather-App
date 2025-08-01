$(document).ready(function () {
  $('#form-id').submit(function (e) {
    e.preventDefault();
    $('.text-danger').remove();
    const val = $('#city').val().trim();
    if (val === "") {
      if ($('.text-danger:contains("Please Enter The City Name")').length === 0) {
        $('form').append(`
          <p class="text-danger text-center mt-2">Please Enter The City Name</p>
        `);
      }
    } else {
      localStorage.setItem("cityName", val);
      window.location.href = "./result.html";
    }
  });
});
