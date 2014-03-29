mode = 1 == 0 ? 'decimal' : 'binary'

stages = {'decimal': 10, 'binary': 5}

numbers_per_step = {'decimal': 2, 'binary': 6}

bases = {'decimal': 10, 'binary': 2}

function resetStages(){
	series = []
	for (i = 0; i < stages[mode]; i++){
	    series[i] = []
	    for (j = 0; j < numbers_per_step[mode]; j++)
	        series[i][j] = (Math.random() * 10).toString(bases[mode]).split('.')[1][0]
	}	
}

durations = {number_display: 400, pause_between_numbers: 100}

render_functions = {decimal: function(){
    $('#a').text(series[stage][0] + ' ' + series[stage][1])
}, binary: function(){
    $('#a').text(series[stage][0] + ' ' + series[stage][1] + ' ' + series[stage][2])
    $('#b').text(series[stage][3] + ' ' + series[stage][4] + ' ' + series[stage][5])
}}

function blank(){
    $('#a, #b').text('')
}

run_id = 0

function a(rid){
	if (run_id == rid){
	    if (stage++ < series.length - 1){
	        render_functions[mode]()
	        setTimeout(blank, durations.number_display)
	        setTimeout(function(){a(rid)}, durations.number_display + durations.pause_between_numbers)
	    } else {
	     	init(rid)
	    }
	}
}

function init (rid){
	should_run = true
	stage = 0
	resetStages()
	a(rid)
}

$(function(){
	init(run_id)
	$('#mode_switcher').click(function(){
		mode = mode == 'decimal' ? 'binary' : 'decimal'
		init(++run_id)
	})
	$('input').keyup(function(){
		v = parseInt($(this).val())
		if (!isNaN(v)){
			durations[$(this).attr('id')] = v
			init(++run_id)
		}
	})
})
