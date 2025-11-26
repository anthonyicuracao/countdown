const gravy4Events = [
    { start: '2025-11-28 13:00:00', end: '2025-11-28 16:00:00', name: 'Black Friday 1pm-4pm', url: '/collections/black-friday-sale-2025-1pm-4pm', style: '2' },
];
const gravy4Count = document.getElementById('gravy4Count');
const gravy4Msg = document.getElementById('gravy4Msg');
const gravy4D = document.getElementById('gravy4D');
const gravy4H = document.getElementById('gravy4H');
const gravy4M = document.getElementById('gravy4M');
const gravy4S = document.getElementById('gravy4S');
function displayTheCountDown4(x, w, y) {
    if (gravy4Count && typeof gravy4Count !== 'undefined') {
        gravy4Count.removeAttribute('style');
        if (
            gravy4D &&
            gravy4H &&
            gravy4M &&
            gravy4S &&
            gravy4Msg
        ) {
            gravy4D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy4H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy4M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy4S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy4Count.classList = 'gravy4Sale' + y;
            gravy4Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown4() {
    if (gravy4Count && typeof gravy4Count !== 'undefined') {
        const gravy4ParentElement = gravy4Count.parentElement;
        if (gravy4ParentElement && typeof gravy4ParentElement !== 'undefined') {
            gravy4ParentElement.removeChild(gravy4Count);
        }
    }
}
var gravy4Func = function () { };
gravy4Func = function gravy4Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy4Events.length; i++) {
        var event = gravy4Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown4(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PT</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown4(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy4Events.length - 1) {
            var nextEvent = gravy4Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown4(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy4Int);
    removeTheCountDown4();
}
const gravy4Int = setInterval(function () {
    gravy4Func();
}, 1000);