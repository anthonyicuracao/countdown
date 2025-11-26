const gravy5Events = [
    { start: '2025-11-28 18:00:00', end: '2025-11-28 21:00:00', name: 'Black Friday 6pm-9pm', url: '/collections/black-friday-sale-2025-6pm-9pm', style: '2' },
];
const gravy5Count = document.getElementById('gravy5Count');
const gravy5Msg = document.getElementById('gravy5Msg');
const gravy5D = document.getElementById('gravy5D');
const gravy5H = document.getElementById('gravy5H');
const gravy5M = document.getElementById('gravy5M');
const gravy5S = document.getElementById('gravy5S');
function displayTheCountDown5(x, w, y) {
    if (gravy5Count && typeof gravy5Count !== 'undefined') {
        gravy5Count.removeAttribute('style');
        if (
            gravy5D &&
            gravy5H &&
            gravy5M &&
            gravy5S &&
            gravy5Msg
        ) {
            gravy5D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy5H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy5M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy5S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy5Count.classList = 'gravy5Sale' + y;
            gravy5Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown5() {
    if (gravy5Count && typeof gravy5Count !== 'undefined') {
        const gravy5ParentElement = gravy5Count.parentElement;
        if (gravy5ParentElement && typeof gravy5ParentElement !== 'undefined') {
            gravy5ParentElement.removeChild(gravy5Count);
        }
    }
}
var gravy5Func = function () { };
gravy5Func = function gravy5Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy5Events.length; i++) {
        var event = gravy5Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown5(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown5(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy5Events.length - 1) {
            var nextEvent = gravy5Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown5(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy5Int);
    removeTheCountDown5();
}
const gravy5Int = setInterval(function () {
    gravy5Func();
}, 1000);