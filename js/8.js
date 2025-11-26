const gravy8Events = [
    { start: '2025-11-29 18:00:00', end: '2025-11-29 21:00:00', name: 'Giant Saturday 6pm-9pm', url: '/collections/giant-saturday-sale-2025-6pm-9pm', style: '3' },
];
const gravy8Count = document.getElementById('gravy8Count');
const gravy8Msg = document.getElementById('gravy8Msg');
const gravy8D = document.getElementById('gravy8D');
const gravy8H = document.getElementById('gravy8H');
const gravy8M = document.getElementById('gravy8M');
const gravy8S = document.getElementById('gravy8S');
function displayTheCountDown8(x, w, y) {
    if (gravy8Count && typeof gravy8Count !== 'undefined') {
        gravy8Count.removeAttribute('style');
        if (
            gravy8D &&
            gravy8H &&
            gravy8M &&
            gravy8S &&
            gravy8Msg
        ) {
            gravy8D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy8H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy8M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy8S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy8Count.classList = 'gravy8Sale' + y;
            gravy8Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown8() {
    if (gravy8Count && typeof gravy8Count !== 'undefined') {
        const gravy8ParentElement = gravy8Count.parentElement;
        if (gravy8ParentElement && typeof gravy8ParentElement !== 'undefined') {
            gravy8ParentElement.removeChild(gravy8Count);
        }
    }
}
var gravy8Func = function () { };
gravy8Func = function gravy8Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy8Events.length; i++) {
        var event = gravy8Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown8(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown8(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy8Events.length - 1) {
            var nextEvent = gravy8Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown8(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy8Int);
    removeTheCountDown8();
}
const gravy8Int = setInterval(function () {
    gravy8Func();
}, 1000);