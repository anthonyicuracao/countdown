const gravy11Events = [
    { start: '2025-11-30 18:00:00', end: '2025-11-30 21:00:00', name: 'Super Sunday 6pm-9pm', url: '/collections/super-sunday-sale-2025-6pm-9pm', style: '4' }
];
const gravy11Count = document.getElementById('gravy11Count');
const gravy11Msg = document.getElementById('gravy11Msg');
const gravy11D = document.getElementById('gravy11D');
const gravy11H = document.getElementById('gravy11H');
const gravy11M = document.getElementById('gravy11M');
const gravy11S = document.getElementById('gravy11S');
function displayTheCountDown11(x, w, y) {
    if (gravy11Count && typeof gravy11Count !== 'undefined') {
        gravy11Count.removeAttribute('style');
        if (
            gravy11D &&
            gravy11H &&
            gravy11M &&
            gravy11S &&
            gravy11Msg
        ) {
            gravy11D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy11H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy11M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy11S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy11Count.classList = 'gravy11Sale' + y;
            gravy11Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown11() {
    if (gravy11Count && typeof gravy11Count !== 'undefined') {
        const gravy11ParentElement = gravy11Count.parentElement;
        if (gravy11ParentElement && typeof gravy11ParentElement !== 'undefined') {
            gravy11ParentElement.removeChild(gravy11Count);
        }
    }
}
var gravy11Func = function () { };
gravy11Func = function gravy11Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy11Events.length; i++) {
        var event = gravy11Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown11(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown11(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy11Events.length - 1) {
            var nextEvent = gravy11Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown11(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy11Int);
    removeTheCountDown11();
}
const gravy11Int = setInterval(function () {
    gravy11Func();
}, 1000);