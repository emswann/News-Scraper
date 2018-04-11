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
    .then(results => {
      $(".content").html(results);
      const numScraped = $(".headlines").data("scraped");
      const message = numScraped > 0 
                      ? `${numScraped} new articles were added!`
                      : `No new articles were added! Please check again later.`;

      const modalTxt = $('<h3>').text(message);
      $("#scrapedModal .modal-body").append(modalTxt);
      $("#scrapedModal").modal("show");
    })
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

  $(document).on("click", ".hl-notes", function() {
    const id = $(this).closest(".card").data("id");
    const url = `/api/notes/${id}`;
    console.log("GET request: " + url);

    $.ajax(url, {
      type: "GET"
    })
    .then(results => {
      $("#modalNotesForm .modal-body").html(results);

      $("#modalNotesForm").modal("show");
    })
    .fail(error => console.error(error));
  });

  $(document).on("click", "#note-name, #note-body", function() {
    $(this).text("");
  });

  $(document).on("click", ".add-notes", function() {
    const author = $("#note-name").val().trim();
    const body   = $("#note-body").val().trim();

    if (author && body) {
      const dataObj = { author: author, body: body };

      const id = $("#note-container").data("id");
      const url = `/api/notes/add/${id}`;
      console.log("POST request: " + url);

      $.ajax(url, {
        type: "POST",
        data: dataObj
      })
      .then(results => $("#modalNotesForm").modal("hide"))
      .fail(error => console.error(error));
    }
  });

  $(document).on("click", ".note-delete", function() {
    const dataObj = { id: $(this).closest(".card").data("id") };
    const url = "/api/notes/delete";
    console.log("DELETE request: " + url);

    $.ajax(url, {
      type: "DELETE",
      data: dataObj
    })
    .then(results => $(this).closest(".list-group-item").remove()
    )
    .fail(error => console.error(error));
  });
});