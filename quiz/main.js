$.getJSON("data.json", function (data) {
  $('#quiz-title').append(`<h1>${data.quiz_title}</h1>`);

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
      } else { // don't want the caption bar, so choice div is just full img -- styled differently 
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
  });
});

var winner = ""; // need this to be global 
frequencies = {};
$('#submit').on('click', function (e) {
  var choices = $("input[type='radio']:checked").map(function (i, radio) {
    return $(radio).val();
  }).toArray();

  // used this for help on writing the function below to find the most freq. word 
  //appendto.com/2016/10/finding-the-most-frequent-string-in-a-javascript-array/
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
    var user_error = false; // added this variable 
    if (choices.length < data.number_of_questions) {
      current_outcome = $(`<p id="error">${data.error}</p>`);
      user_error = true;
    } else {
      current_outcome = $(`<div class="outcome"><div class="outcome-text"><p id="congrats">${data.congrats}</p>
                              <p id="whoami">${winner}</p>
                              <p id="whoami-description">${data.outcomes[winner].text}</p></div>
                              <img class="outcome-img"src=${data.outcomes[winner].img}></div>`);
    }
    $('.current-outcome').html(current_outcome);
    // moved button stuff from two places to one!
    result.style.display = "block";
    var buttonId = $(this).attr('id');
    $('#result-content').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
    if (!user_error) { // added user error to load graph or not 
      loadGraph();
    }
  });
});

// all from https://www.w3schools.com/howto/howto_css_modals.asp
// this makes a modal pop up after submissions
var result = document.getElementById('myresult');
var btn = document.getElementById('submit');
var span = document.getElementsByClassName("close")[0];

/** CHART STUFF HERE **/
function getPercentage(key) {
  if (parseInt(frequencies[key]) > 0) {
    return parseInt((frequencies[key]) / 7 * 100).toFixed(2)
  } else {
    return 0
  }
}

function loadGraph() {
  var chart = new CanvasJS.Chart("graph", {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: false,
    animationEnabled: true,
    responsive: true,
    title: {
      text: "what % of each character are you?"
    },
    data: [{
      type: "pie",
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: getPercentage("alexis"), label: "Alexis" },
        { y: getPercentage("david"), label: "David" },
        { y: getPercentage("moira"), label: "Moira" },
        { y: getPercentage("johnny"), label: "Johnny" },
      ]
    }]
  });
  chart.render();
}

function resetFreqs() {
  Object.keys(frequencies).forEach(function (key) {
    frequencies[key] = 0;
  })
}

span.onclick = function () {
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  result.style.display = "none";
  resetFreqs();
}
window.onclick = function (event) {
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  if (event.target == result) {
    result.style.display = "none";
    resetFreqs();
  }
}