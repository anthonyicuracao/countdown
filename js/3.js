const gravy3Events = [
    { start: '2025-11-28 06:00:00', end: '2025-11-28 11:00:00', name: 'Black Friday 6am-11am', url: '/collections/black-friday-sale-2025-6am-11am', style: '2' },
];
const gravy3Count = document.getElementById('gravy3Count');
const gravy3Msg = document.getElementById('gravy3Msg');
const gravy3D = document.getElementById('gravy3D');
const gravy3H = document.getElementById('gravy3H');
const gravy3M = document.getElementById('gravy3M');
const gravy3S = document.getElementById('gravy3S');
function displayTheCountDown3(x, w, y) {
    if (gravy3Count && typeof gravy3Count !== 'undefined') {
        gravy3Count.removeAttribute('style');
        if (
            gravy3D &&
            gravy3H &&
            gravy3M &&
            gravy3S &&
            gravy3Msg
        ) {
            gravy3D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy3H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy3M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy3S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy3Count.classList = 'gravy3Sale' + y;
            gravy3Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown3() {
    if (gravy3Count && typeof gravy3Count !== 'undefined') {
        const gravy3ParentElement = gravy3Count.parentElement;
        if (gravy3ParentElement && typeof gravy3ParentElement !== 'undefined') {
            gravy3ParentElement.removeChild(gravy3Count);
        }
    }
}
var gravy3Func = function () { };
gravy3Func = function gravy3Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy3Events.length; i++) {
        var event = gravy3Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown3(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PT</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown3(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy3Events.length - 1) {
            var nextEvent = gravy3Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PT</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown3(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy3Int);
    removeTheCountDown3();
}
const gravy3Int = setInterval(function () {
    gravy3Func();
}, 1000);