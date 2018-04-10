$(document).ready(() => {
  const setActive = element => {
    $("#navbar-list li.active").removeClass("active");
    $(element).addClass("active");
  };

  $(document).on("click", "#home a", () => {
    setActive("#home");

    const url = "/api/home";
    console.log("GET request: " + url);

    $.ajax(url, {
      type: "GET"
    })
    .then(results => $(".content").html(results)
    )
    .fail(error => console.error(error));
  });

  $(document).on("click", "#saved a", () => {
    setActive("#saved");

    const url = "/api/saved";
    console.log("GET request: " + url);

    $.ajax(url, {
      type: "GET"
    })
    .then(results => $(".content").html(results)
    )
    .fail(error => console.error(error));
  });

  $(document).on("click", "#scrape a", () => {
    setActive("#home");

    const url = "/api/scrape";
    console.log("GET request: " + url);

    $.ajax(url, {
      type: "GET"
    })
    .then(results => $(".content").html(results)
    )
    .fail(error => console.error(error));
  });

  $(document).on("click", ".hl-save", function() {
    const dataObj = { id: $(this).closest(".card").data("id") };
    const url = "/api/save";
    console.log("PUT request: " + url);

    $.ajax(url, {
      type: "PUT",
      data: dataObj
    })
    .then(results => $(this).closest(".headline").remove()
    )
    .fail(error => console.error(error));
  });

  $(document).on("click", ".hl-delete", function() {
    const dataObj = { id: $(this).closest(".card").data("id") };
    const url = "/api/delete";
    console.log("DELETE request: " + url);

    $.ajax(url, {
      type: "DELETE",
      data: dataObj
    })
    .then(results => $(this).closest(".headline").remove()
    )
    .fail(error => console.error(error));
  });
});