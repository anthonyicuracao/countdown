const gravy2Events = [
    { start: '2025-11-27 13:00:00', end: '2025-11-27 16:00:00', name: 'Thanksgiving 1pm-4pm', url: '/collections/thanksgiving-sale-2025-1pm-4pm', style: '1' },
];
const gravy2Count = document.getElementById('gravy2Count');
const gravy2Msg = document.getElementById('gravy2Msg');
const gravy2D = document.getElementById('gravy2D');
const gravy2H = document.getElementById('gravy2H');
const gravy2M = document.getElementById('gravy2M');
const gravy2S = document.getElementById('gravy2S');
function displayTheCountDown2(x, w, y) {
    if (gravy2Count && typeof gravy2Count !== 'undefined') {
        gravy2Count.removeAttribute('style');
        if (
            gravy2D &&
            gravy2H &&
            gravy2M &&
            gravy2S &&
            gravy2Msg
        ) {
            gravy2D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy2H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy2M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy2S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy2Count.classList = 'gravy2Sale' + y;
            gravy2Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown2() {
    if (gravy2Count && typeof gravy2Count !== 'undefined') {
        const gravy2ParentElement = gravy2Count.parentElement;
        if (gravy2ParentElement && typeof gravy2ParentElement !== 'undefined') {
            gravy2ParentElement.removeChild(gravy2Count);
        }
    }
}
var gravy2Func = function () { };
gravy2Func = function gravy2Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy2Events.length; i++) {
        var event = gravy2Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown2(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown2(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy2Events.length - 1) {
            var nextEvent = gravy2Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown2(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy2Int);
    removeTheCountDown2();
}
const gravy2Int = setInterval(function () {
    gravy2Func();
}, 1000);