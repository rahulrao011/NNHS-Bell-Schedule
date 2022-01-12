const NUMPERIODS = 8;

// [[Mon/Fri start, Mon/Fri end], [Tue/Thu start, Tue/Thr end], [Wed start, Wed end]]
let bellScheduleWithoutHomeroom = [
    [["07:45", "08:35"], ["07:45", "08:30"], ["09:00", "09:42"]],
    [["08:41", "09:34"], ["08:35", "09:20"], ["09:47", "10:29"]],
    [["09:40", "10:30"], ["10:15", "11:00"], ["10:34", "11:16"]],
    [["10:36", "11:26"], ["11:05", "11:50"], ["11:21", "12:03"]],
    [["11:32", "12:22"], ["11:55", "12:40"], ["12:08", "12:49"]],
    [["12:28", "13:18"], ["12:45", "13:30"], ["12:54", "13:36"]],
    [["13:24", "14:14"], ["13:35", "14:20"], ["13:41", "14:23"]],
    [["14:20", "15:10"], ["14:25", "15:10"], ["14:28", "15:10"]],
];

let bellScheduleHomeroom = ["09:25", "10:10"];


/*
interval = [start, end]
start = "hh:mm"
end = "hh:mm"
*/
function isCurrentTimeInInterval(interval){
    let [start, end] = interval;
    let currentTime = new Date();
    
    let startTime = new Date(currentTime.getTime());
    startTime.setHours(start.split(":")[0]);
    startTime.setMinutes(start.split(":")[1]);
    startTime.setSeconds("00");

    let endTime = new Date(currentTime.getTime());
    endTime.setHours(end.split(":")[0]);
    endTime.setMinutes(end.split(":")[1]);
    endTime.setSeconds("00");
    
    return startTime < currentTime && endTime > currentTime;
};

function checkBellScheduleWithoutHomeroom(day, bellSchedule, numPeriods){
    let currentHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    let index;
    if (day == 1 || day == 5){
        index = 0;
    }else if (day == 2 || day == 4){
        index = 1;
    }else{
        index = 3;
    };
    for (let i = 0; i < numPeriods; i ++){
        if (isCurrentTimeInInterval(bellSchedule[i][index])){
            return 60 * (bellSchedule[i][index][1].split(":")[0] - currentHour) + (bellSchedule[i][index][1].split(":")[1] - currentMinutes);
        };
    };
};

let currentDay = new Date().getDay();
let currentHour = new Date().getHours();
let currentMinutes = new Date().getMinutes();

let timeLeft;
if (currentDay == 2 || currentDay == 4){
    timeLeft = checkBellScheduleWithoutHomeroom(currentDay, bellScheduleWithoutHomeroom, NUMPERIODS);
    if (timeLeft == undefined && isCurrentTimeInInterval(bellScheduleHomeroom)){
        timeLeft = 60 * (bellScheduleHomeroom[1].split(":")[0] - currentHour) + (bellScheduleHomeroom[1].split(":")[1] - currentMinutes);
    };
}else{
    timeLeft = checkBellScheduleWithoutHomeroom(currentDay, bellScheduleWithoutHomeroom, NUMPERIODS);
};

if (timeLeft == undefined){
    document.write("Class is not in session during this time");
}else{
    document.write(`Minutes remaining: ${timeLeft}`);
};