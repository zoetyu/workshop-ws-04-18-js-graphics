$.getJSON("data_dartmouth.json", function (data) {
  /** typed.js stuff **/

  data.questions.forEach(question => {
    var current_question = $(`<div class="question"></div>`);
    current_question.append(`<div class="q-header">
                            <h3 class="question_name">${question.question_name}</h3>
                            <img class="question_img_url" src=${question.question_img_url}></div>`)

    var current_choices = $(`<div class="choices"></div>`);
    question.choices.forEach(choice => {
      var current_label = $(`<label></label>`)
      current_label.append(`<input type="radio" name=${question.name} value=${choice.value}>`);
      var curr_choice = $(`<div class="choice"></div>`)
      if (choice.img) {
        curr_choice.append(`<img src=${choice.img} class="img-with-border"/>`);
      }
      if (choice.caption) {
        curr_choice.append(`<p class="caption">${choice.caption}</p>`);
      } else {
        curr_choice.addClass('no-caption');
      }
      current_label.append(curr_choice);
      current_choices.append(current_label);
    });
    current_question.append(current_choices);
    $('.questions').append(current_question);
  });

  $('#submit').html(data.submit_button);

  $('label').click(function () {
    $(this).addClass('selected');
    $(this).siblings().addClass('unselected');
    $(this).siblings().removeClass('selected');
    $(this).removeClass('unselected');

    // velocity stuff part 1 (scaling)

  });
  // velocity stuff part 2 (rotating on selection)

  /** scroll reveal stuff here */

});

var winner = "";
frequencies = {};
num_questions = 0;

// velocity part 3 (title banner)


$('#submit').on('click', function (e) {
  var choices = $("input[type='radio']:checked").map(function (i, radio) {
    return $(radio).val();
  }).toArray();

  // velocity (bouncy submit button)

  for (i = 0; i < choices.length; i++) {
    el = choices[i];
    if (!frequencies[el]) {
      frequencies[el] = 1;
    } else {
      frequencies[el]++;
    }
  };

  max = 0;
  Object.keys(frequencies).forEach(function (key) {
    if (frequencies[key] > max) {
      max = frequencies[key];
      winner = key;
    }
  })

  $.getJSON("data.json", function (data) {
    var current_outcome;
    // declare user_error variable in here
    num_questions = parseInt(data.number_of_questions);
    if (choices.length < data.number_of_questions) {
      current_outcome = $(`<p id="error">${data.error}</p>`);
    } else {
      current_outcome = null;
    }
    $('.current-outcome').html(current_outcome);
    result.style.display = "block";
    var buttonId = $(this).attr('id');
    $('#result-content').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');

    // check here on user error to load graph or not 

  });
});


var result = document.getElementById('myresult');

/** CHART STUFF HERE **/


window.onclick = function (event) {
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  if (event.target == result) {
    result.style.display = "none";
  }
}

/**  Add click effect here **/
