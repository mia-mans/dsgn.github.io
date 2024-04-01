function postToGoogle() {
      var field1 = $("#Message").val();

      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdsLac8IaPsLi4NiIVjlg4PzXubvX0vnEVZSh3JrKZZxPZqmg/formResponse",
          
       
        data: {
          "entry.1125248479": field1,
        },
        type: "POST",
        dataType: "xml",
        success: function (d) {
          $('#contact').trigger('reset');
        },
        error: function (x, y, z) {
          $('#contact').trigger('reset');
        }
      });
      return false;
    }