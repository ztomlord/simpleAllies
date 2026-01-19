// IMPORTANT: This code is just meant to show you how use the segment data. It does not run

const { simpleAllies } = require('simpleAllies');

export function loop() {
    //run every loop
    launchQueuedNukes();

    //run intermittenly
    {
        simpleAllies.initRun()
        stashRequests();
        simpleAllies.endRun()
    }
}

function stashRequests() {

    const playerName = simpleAllies.currentAlly;

    if(typeof Memory.ALLY_REQUESTS === 'undefined')
    { Memory.ALLY_REQUESTS = {}; }

    Memory.ALLY_REQUESTS[playerName] = simpleAllies.allySegmentData;

}

function handleBarrageRequests(){
    //this should be handled outside segment data reading as it needs to be monitored every tick until launch
    let nukeLaunched = false;
    Memory.ALLY_REQUESTS.forEach(playerName=>{
        if(nukeLaunched){return;}

        if(Memory.ALLY_REQUESTS[playerName].requests && Memory.ALLY_REQUESTS[playerName].requests.barrage)
        {
            Memory.ALLY_REQUESTS[playerName].requests.barrage.forEach(request=>{
                if(nukeLaunched){return;}

                if(Game.time >= request.startTick && Game.time%request.modVal === request.playerLaunchSlots['myUserName'])
                {
                    if(checkNukeInterval(request.roomName, request.interval)) continue;
                    if(checkMaxNukes(request.roomName, request.maxNukes)) continue;

                    let siloRoomName = findNukeInRange(request.roomName);
                    if(siloRoomName)
                    {
                        launchNuke(siloRoomName,targetRoomName);
                        return;
                    }
                }
            });
        }
    });
}

function launchNuke(siloRoomName, targetRoomName) {
    //run targetting (try to do as much damage as possible), and launch nuke
}

function findNukeInRange(targetRoomName) {
    //check owned rcl8 rooms for a room within range 10 of the target with a loaded nuke not on cooldown
}

function checkNukeInterval(targetRoomName , interval_ticks) {
    //check if any nukes have been launched withing Game.time-interval from now
}

function checkMaxNukes(targetRoomName, maxNukes){
    //check if the room already has more nukes incoming than maxNuke count
}