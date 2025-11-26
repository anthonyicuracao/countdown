const gravy10Events = [
    { start: '2025-11-30 13:00:00', end: '2025-11-30 16:00:00', name: 'Super Sunday 1pm-4pm', url: '/collections/super-sunday-sale-2025-1pm-4pm', style: '4' },
];
const gravy10Count = document.getElementById('gravy10Count');
const gravy10Msg = document.getElementById('gravy10Msg');
const gravy10D = document.getElementById('gravy10D');
const gravy10H = document.getElementById('gravy10H');
const gravy10M = document.getElementById('gravy10M');
const gravy10S = document.getElementById('gravy10S');
function displayTheCountDown10(x, w, y) {
    if (gravy10Count && typeof gravy10Count !== 'undefined') {
        gravy10Count.removeAttribute('style');
        if (
            gravy10D &&
            gravy10H &&
            gravy10M &&
            gravy10S &&
            gravy10Msg
        ) {
            gravy10D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy10H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy10M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy10S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy10Count.classList = 'gravy10Sale' + y;
            gravy10Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown10() {
    if (gravy10Count && typeof gravy10Count !== 'undefined') {
        const gravy10ParentElement = gravy10Count.parentElement;
        if (gravy10ParentElement && typeof gravy10ParentElement !== 'undefined') {
            gravy10ParentElement.removeChild(gravy10Count);
        }
    }
}
var gravy10Func = function () { };
gravy10Func = function gravy10Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy10Events.length; i++) {
        var event = gravy10Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown10(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown10(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy10Events.length - 1) {
            var nextEvent = gravy10Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown10(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy10Int);
    removeTheCountDown10();
}
const gravy10Int = setInterval(function () {
    gravy10Func();
}, 1000);