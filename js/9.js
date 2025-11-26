const gravy9Events = [
    { start: '2025-11-30 08:00:00', end: '2025-11-30 11:00:00', name: 'Super Sunday 8am-11am', url: '/collections/super-sunday-sale-2025-8am-11am', style: '4' },
];
const gravy9Count = document.getElementById('gravy9Count');
const gravy9Msg = document.getElementById('gravy9Msg');
const gravy9D = document.getElementById('gravy9D');
const gravy9H = document.getElementById('gravy9H');
const gravy9M = document.getElementById('gravy9M');
const gravy9S = document.getElementById('gravy9S');
function displayTheCountDown9(x, w, y) {
    if (gravy9Count && typeof gravy9Count !== 'undefined') {
        gravy9Count.removeAttribute('style');
        if (
            gravy9D &&
            gravy9H &&
            gravy9M &&
            gravy9S &&
            gravy9Msg
        ) {
            gravy9D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy9H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy9M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy9S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy9Count.classList = 'gravy9Sale' + y;
            gravy9Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown9() {
    if (gravy9Count && typeof gravy9Count !== 'undefined') {
        const gravy9ParentElement = gravy9Count.parentElement;
        if (gravy9ParentElement && typeof gravy9ParentElement !== 'undefined') {
            gravy9ParentElement.removeChild(gravy9Count);
        }
    }
}
var gravy9Func = function () { };
gravy9Func = function gravy9Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy9Events.length; i++) {
        var event = gravy9Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown9(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown9(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy9Events.length - 1) {
            var nextEvent = gravy9Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown9(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy9Int);
    removeTheCountDown9();
}
const gravy9Int = setInterval(function () {
    gravy9Func();
}, 1000);