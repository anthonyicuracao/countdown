const gravy7Events = [
    { start: '2025-11-29 13:00:00', end: '2025-11-29 16:00:00', name: 'Giant Saturday 1pm-4pm', url: '/collections/giant-saturday-sale-2025-1pm-4pm', style: '3' },
];
const gravy7Count = document.getElementById('gravy7Count');
const gravy7Msg = document.getElementById('gravy7Msg');
const gravy7D = document.getElementById('gravy7D');
const gravy7H = document.getElementById('gravy7H');
const gravy7M = document.getElementById('gravy7M');
const gravy7S = document.getElementById('gravy7S');
function displayTheCountDown7(x, w, y) {
    if (gravy7Count && typeof gravy7Count !== 'undefined') {
        gravy7Count.removeAttribute('style');
        if (
            gravy7D &&
            gravy7H &&
            gravy7M &&
            gravy7S &&
            gravy7Msg
        ) {
            gravy7D.innerHTML = String(Math.floor(x / (1000 * 60 * 60 * 24))).padStart(2, '0');
            gravy7H.innerHTML = String(Math.floor(
                (x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            gravy7M.innerHTML = String(Math.floor((x % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            gravy7S.innerHTML = String(Math.floor((x % (1000 * 60)) / 1000)).padStart(2, '0');
            gravy7Count.classList = 'gravy7Sale' + y;
            gravy7Msg.innerHTML = w;
        }
    }
}
function removeTheCountDown7() {
    if (gravy7Count && typeof gravy7Count !== 'undefined') {
        const gravy7ParentElement = gravy7Count.parentElement;
        if (gravy7ParentElement && typeof gravy7ParentElement !== 'undefined') {
            gravy7ParentElement.removeChild(gravy7Count);
        }
    }
}
var gravy7Func = function () { };
gravy7Func = function gravy7Func() {
    var tLA = moment.tz(moment().valueOf(), 'America/Los_Angeles').valueOf();
    // Find current event
    for (var i = 0; i < gravy7Events.length; i++) {
        var event = gravy7Events[i];
        var startTime = moment.tz(event.start, 'America/Los_Angeles').valueOf();
        var endTime = moment.tz(event.end, 'America/Los_Angeles').valueOf();
        var timeUntilStart = startTime - tLA;
        var timeUntilEnd = endTime - tLA;
        // Before sale starts
        if (timeUntilStart > 0) {
            var message = event.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
            displayTheCountDown7(timeUntilStart, message, event.style);
            return;
        }
        // During sale
        else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
            var message = event.name + '<small> PST</small><br>' + '<a href="' + event.url + '">DOORBUSTERS</a> end in...';
            displayTheCountDown7(timeUntilEnd, message, event.style);
            return;
        }
        // Between sales (sale ended, check if next sale exists)
        else if (timeUntilEnd <= 0 && i < gravy7Events.length - 1) {
            var nextEvent = gravy7Events[i + 1];
            var nextStartTime = moment.tz(nextEvent.start, 'America/Los_Angeles').valueOf();
            var timeUntilNextStart = nextStartTime - tLA;

            if (timeUntilNextStart > 0) {
                var message = nextEvent.name + '<small> PST</small><br>' + 'DOORBUSTERS start in...';
                displayTheCountDown7(timeUntilNextStart, message, nextEvent.style);
                return;
            }
        }
    }
    // All sales are over
    clearInterval(gravy7Int);
    removeTheCountDown7();
}
const gravy7Int = setInterval(function () {
    gravy7Func();
}, 1000);