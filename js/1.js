const gravy1Events = [
    { start: '2025-11-27 08:00:00', end: '2025-11-27 11:00:00', name: 'Thanksgiving 8am-11am', url: '/collections/thanksgiving-sale-2025-8am-11am', style: '1' },
];
const gravy1Count = document.getElementById('gravy1Count');
const gravy1Msg = document.getElementById('gravy1Msg');
const gravy1D = document.getElementById('gravy1D');
const gravy1H = document.getElementById('gravy1H');
const gravy1M = document.getElementById('gravy1M');
const gravy1S = document.getElementById('gravy1S');
function displayTheCountDown1(x, w, y) {
    if (gravy1Count && typeof gravy1Count !== 'undefined') {
        gravy1Count.removeAttribute('style');
        if (
            gravy1D &&
            gravy1H &&
            gravy1M &&
            gravy1S &&
            gravy1Msg
        ) {
            gravy1D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy1H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy1M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy1S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy1Count.classList = 'gravy1Sale' + y;
            gravy1Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown1() {
    if (gravy1Count && typeof gravy1Count !== 'undefined') {
        const gravy1ParentElement = gravy1Count.parentElement;
        if (gravy1ParentElement && typeof gravy1ParentElement !== 'undefined') {
            gravy1ParentElement.removeChild(gravy1Count);
        }
    }
}
var gravy1Func = function () { };
gravy1Func = function gravy1Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy1Events.length; i++) {
        var event = gravy1Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown1(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PT</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown1(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy1Events.length - 1) {
            var nextEvent = gravy1Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown1(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy1Int);
    removeTheCountDown1();
}
const gravy1Int = setInterval(function () {
    gravy1Func();
}, 1000);