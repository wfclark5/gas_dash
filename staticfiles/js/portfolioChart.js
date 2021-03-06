var graphData;
var portfolioOptions;
var mixedChart;

var portfolioctx = document.getElementById("portfolio-chart");

// Utility Functions
function getGain(data){
    var dayGains = []
    data.forEach(function(d){
        dayGains.push(Number(d.gain))
    })
    return dayGains
}

function getGainPct(data){
    var dayGains = []
    data.forEach(function(d){
        dayGains.push(Number(d.pct_gain))
    })
    return dayGains
}

function getBenchmark(data){
    var benchmarks = []
    data.forEach(function(d){
        benchmarks.push(Number(d.bench_gain))
    })
    return benchmarks
}

function getBenchmarkPct(data){
    var benchmarks = []
    data.forEach(function(d){
        benchmarks.push(Number(d.bench_gain_pct))
    })
    return benchmarks
}

function getDailyLabels(data){
    var days = []
    data.forEach(function(d){
        var day_date = new Date(d.date)
        days.push(day_date.toDateString());
    })
    return days
}

function drawGraph(portfolio, metric, benchMetric, symbol){
    // Chart settings

    graphData =  {
        labels: getDailyLabels(portfolio),
        datasets: [{
            label: "Gain "+symbol,
            backgroundColor: 'rgba(83, 221, 108, 0.2)',
            borderColor: 'rgb(83, 221, 108)',
            data: metric(portfolio),
            type: 'line',
            yAxisID: 'gain'
        },
        {
            label: "Benchmark",
            backgroundColor: 'rgb(17, 157, 164, 0.2)',
            border: 'rgb(17, 157, 164)',
            data: benchMetric(portfolio),
            yAxisID: 'gain',
            type: 'line',
        }],
    };

    portfolioOptions = {
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            },
            point: {
                radius: 1,
            },
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                },
                ticks: {
                    fontColor: 'white'
                },
                display: true
            }],
            yAxes: [{
                id: 'gain',
                ticks: {
                    fontColor: 'white'
                }
            },
            {
                id: 'benchmark',
                position: 'right',
                display: false,
            }]
        },
        legend: {
            display: true,
            labels: {
                  fontColor: 'white'
                }
        }
    }

    mixedChart = new Chart(portfolioctx, {
        type: 'bar',
        data: graphData,
        options: portfolioOptions
    });
    $('#loading-gif').hide();
}

// Charts
$(document).ready(function(){
    portfolioctx.height = ($(window).height())*0.55;
    drawGraph(portfolio, getGainPct, getBenchmarkPct, '%');
    $('#pct_view').click(function(){
         if(mixedChart){
            mixedChart.destroy();
        }
        drawGraph(portfolio, getGainPct, getBenchmarkPct, '%')
    })
    $('#dollar_view').click(function(){
         if(mixedChart){
            mixedChart.destroy();
        }
        drawGraph(portfolio, getGain, getBenchmark, '$')
    })
})
