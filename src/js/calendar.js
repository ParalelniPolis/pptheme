(function(window, document, PP) {
    var calendarElement = document.getElementById('js-calendar');
    var stateElement = document.getElementById('js-calendar-state');
    var calendarOverlay = document.getElementById('js-calendar-overlay');

    PP.calendar = function() {
        var request = new XMLHttpRequest();

        request.addEventListener('load', transferComplete);
        request.addEventListener('error', transferFailed);
        request.open('GET', PP.DEFAULTS.calendarApiUrl, true);
        request.send();
    }

    var filterSortData = function(data) {
        data.sort(function(a, b) {
            return a.timestamp - b.timestamp;
        });
        return data.filter(function(event) {
            var eventDate = new Date(event.start_time);
            var nowDate = new Date();

            return eventDate > nowDate;
        });
    }

    var createCalendarArray = function(data) {
        var onlyDates = data.map(function(event) {
            return new Date(event.start_time).toDateString();
        });
        var uniqueDates = onlyDates.filter(function(item, index, self) {
            return self.indexOf(item) == index;
        });

        var reducedDates = uniqueDates.slice(0, 7)

        var calendarArray = new Array(7);

        for (var i = 0; i < reducedDates.length; i++) {
            calendarArray[i] = [];
            var dayData = data.filter(function(event, index, self) {
                var eventDate = new Date(event.start_time).toDateString();

                return eventDate == reducedDates[i];
            });
            calendarArray[i] = dayData;
        }

        return calendarArray;
    }

    var fillCalendar = function(calendarData) {
        var dayName;
        var dayMapping = {
            0 : 'Ne',
            1 : 'Po',
            2 : 'Út',
            3 : 'St',
            4 : 'Čt',
            5 : 'Pá',
            6 : 'So'
        }
        var calendarTable = document.getElementById('js-calendar__table');

        if (calendarTable !== null) {
            var headCells = calendarTable.getElementsByClassName('calendar__cell-head');
            var bodyCells = calendarTable.getElementsByClassName('calendar__cell-body');

            Array.prototype.forEach.call(headCells, function(cell, index) {
                var cellDate = new Date(calendarData[index][0].start_time);
                if (cellDate.toDateString() == new Date().toDateString()) {
                    dayName = 'Dnes';
                }
                else if (new Date(cellDate.valueOf() - 86400000).toDateString() == new Date().toDateString()) {
                    dayName = 'Zítra';
                }
                else {
                    dayName = dayMapping[cellDate.getDay()] + ' ' + cellDate.getDate() + '.' + (cellDate.getMonth() + 1) + '.';
                }
                cell.textContent = dayName;
            });
            Array.prototype.forEach.call(bodyCells, function(cell, cellIndex) {
                calendarData[cellIndex].forEach(function(event, eventIndex) {
                    var eventDate = new Date(event.start_time);
                    var eventHours = eventDate.getHours();
                    var eventMinutes = eventDate.getMinutes().toString().length > 1 ? eventDate.getMinutes() : "0" + eventDate.getMinutes();
                    var eventDescription = event.description.substring(0, event.description.indexOf(' ', 45)) + '...';
                    var eventElement = document.createElement('a');

                    eventElement.className = 'calendar__event';
                    eventElement.innerHTML = eventHours + ':' + eventMinutes + '<br>' + event.name + '<br>' + eventDescription;
                    eventElement.href = 'https://www.facebook.com/profile.php?id=' + event.id;
                    eventElement.target = '_blank';

                    cell.appendChild(eventElement);
                });
            });

            PP.fadeOut(calendarOverlay, 1000, function() {
                calendarElement.classList.remove('calendar--loading');
            });
        }
    }

    var transferComplete = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.responseText) || [];

            var filteredData = filterSortData(data);

            var calendarArray = createCalendarArray(filteredData);

            fillCalendar(calendarArray);
        }
        else {
            stateElement.textContent = 'Nahrávání kalendáře se bohužel nezdařilo :(';
            console.warn(this.status, this.statusText);
        }
    }

    var transferFailed = function() {
        stateElement.textContent = 'Nahrávání kalendáře se bohužel nezdařilo :(';
        console.warn('Calendar request failed');
    }

    if(calendarElement !== null) {
        PP.calendar();
    }
})(window, document, window.PP = window.PP || {})
