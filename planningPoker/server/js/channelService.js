"use strict";

let channels = {};

module.exports.getChannels = function() {

    return channels;
}

module.exports.initChannel = function(channelName) {

    channels[channelName] = {};
    channels[channelName].client = [];
    channels[channelName].host = {conn:undefined};
    
}

module.exports.isChannelExist = function(channelName) {

    return !channels[channelName] ? false : true;
}

module.exports.playCard = function(channelName, userName, value) {

    console.log('playCard');
    var index = channels[channelName].client.findIndex(searchByName(userName));

    if(index === -1) {
        channels[channelName].client.push({name:userName,value:value,conn:undefined});
    } else {
        channels[channelName].client[index].name = userName;
        channels[channelName].client[index].value = value;
    }

    if(channels[channelName].host.conn) {
        console.log(JSON.stringify(getChannelResult(channelName)));
        channels[channelName].host.conn.sendText(JSON.stringify({type:'result',data:getChannelResult(channelName)}));
    }
}

module.exports.resetChannel = function(channelName) {

    if(channels[channelName].client) {

        for(let i = 0; i < channels[channelName].client.length; i++) {
            channels[channelName].client[i].value = undefined;
        }
    }
}

module.exports.removeChannel = function(channelName) {

    delete channels[channelName];
}

function getChannelResult(channelName) {

    return channels[channelName].client
        .filter(x => x.value)
        .map(x => ({ name:x.name, value:x.value }));
}

module.exports.getChannelResult = getChannelResult;

module.exports.processWebSocketMessage = function(message, conn) {

    console.log(message);

    try {
        let j = JSON.parse(message);

        switch(j.type) {

            case 'createChannel':
                if(j.channelName && channels[j.channelName]) {

                    channels[j.channelName].host.conn = conn;
                }
                break;
            case 'joinChannel':
                if(j.channelName && j.userName && channels[j.channelName]) {

                    var index = channels[j.channelName].client.findIndex(searchByName(j.userName));

                    if(index === -1) {
                        channels[j.channelName].client.push({userName:j.userName,value:undefined,conn:conn});
                    } else {

                        channels[j.channelName].client[index].conn = conn;
                    }
                    //console.log(channels[j.channelName].client);
                }
                break;
        }

    } catch(e) {
        console.error(e);
        console.error('processWebSocketMessage Error: ' + message);
    }

}



function searchByName(item) {

	return element => element.name === item;
}
