const gravy6Events = [
    { start: '2025-11-29 08:00:00', end: '2025-11-29 11:00:00', name: 'Giant Saturday 8am-11am', url: '/collections/giant-saturday-sale-2025-8am-11am', style: '3' },
];
const gravy6Count = document.getElementById('gravy6Count');
const gravy6Msg = document.getElementById('gravy6Msg');
const gravy6D = document.getElementById('gravy6D');
const gravy6H = document.getElementById('gravy6H');
const gravy6M = document.getElementById('gravy6M');
const gravy6S = document.getElementById('gravy6S');
function displayTheCountDown6(x, w, y) {
    if (gravy6Count && typeof gravy6Count !== 'undefined') {
        gravy6Count.removeAttribute('style');
        if (
            gravy6D &&
            gravy6H &&
            gravy6M &&
            gravy6S &&
            gravy6Msg
        ) {
            gravy6D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy6H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy6M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy6S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy6Count.classList = 'gravy6Sale' + y;
            gravy6Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown6() {
    if (gravy6Count && typeof gravy6Count !== 'undefined') {
        const gravy6ParentElement = gravy6Count.parentElement;
        if (gravy6ParentElement && typeof gravy6ParentElement !== 'undefined') {
            gravy6ParentElement.removeChild(gravy6Count);
        }
    }
}
var gravy6Func = function () { };
gravy6Func = function gravy6Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy6Events.length; i++) {
        var event = gravy6Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown6(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown6(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy6Events.length - 1) {
            var nextEvent = gravy6Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown6(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy6Int);
    removeTheCountDown6();
}
const gravy6Int = setInterval(function () {
    gravy6Func();
}, 1000);