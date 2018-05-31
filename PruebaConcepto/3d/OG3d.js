baseAddress = 'http://localhost:8733/Design_Time_Addresses/OpenGloveWCF/OGService/rest/';

var websockets = [];

function getDataReceiver(glove){
  if(websockets!=null){
    for(var ws in websockets){
      if(websockets[ws].Port == glove.Port){
        return websockets[ws];
      }
    }
  }
}

function startCaptureData(glove){
  var ws = new WebSocket('ws://localhost:'+glove.WebSocketPort+'/'+glove.Port);
  ws.fingersFunction = function(region, value){}
  ws.accelerometerFunction = function(ax,ay,az){}
  ws.gyroscopeFunction = function(gx,gy,gz){}
  ws.magnometerFunction = function(mx,my,mz){}
  ws.imu_attitudeFunction = function(rx,ry,rz){}
  ws.imu_ValuesFunction = function(ax,ay,az,gx,gy,gz,mx,my,mz){}
  ws.Port = glove.Port;
  ws.WebSocketPort= glove.WebSocketPort;
  ws.onopen = function()
  {
    console.log('New WebSocket '+glove.Port);
  };
  ws.onmessage = function (evt)
  {
    var received_msg = evt.data;
    var values = received_msg.split(",");
    switch(values[0]){
      case 'f':
      //  console.log('Dato de flexor recibido en la región '+parseInt(values[1])+' y valor '+parseInt(values[2]));
        ws.fingersFunction(parseInt(values[1]),parseInt(values[2]));
        break;
      case 'a':
        ws.accelerometerFunction(parseFloat(values[1]),parseFloat(values[2]),parseFloat(values[3]));
        break;
      case 'g':
        ws.gyroscopeFunction(parseFloat(values[1]),parseFloat(values[2]),parseFloat(values[3]));
        break;
      case 'm':
        ws.magnometerFunction(parseFloat(values[1]),parseFloat(values[2]),parseFloat(values[3]));
        break;
      case 'r':
          ws.imu_attitudeFunction(parseFloat(values[1]),parseFloat(values[2]),parseFloat(values[3]));
          break;
      case 'z':
        ws.imu_ValuesFunction(parseFloat(values[1]),parseFloat(values[2]),parseFloat(values[3]), parseFloat(values[4]),parseFloat(values[5]),parseFloat(values[6]), parseFloat(values[7]),parseFloat(values[8]),parseFloat(values[9]));
        break;
      default:
    }
  };
  websockets.push(ws);
};

/**
* Gets all the current gloves known by the system whether in range or not.
*/
function GetGloves() {
    promise = $.ajax({
      url: baseAddress
       + 'GetGloves',
      type: 'GET'
    });
    return promise;
};

/**
  Activates a region based on a glove current mappings.
* @param {Glove} glove - Glove object. Use the ones returned from GetGloves.
* @param {integer} region - One of the regions defined by the SDK (0 to 57)
* @param {integer} intensity - Intensity of the activation (0 to 255)
*/
function Activate(glove, region, intensity) {
    glove.GloveConfiguration.GloveProfile.Mappings.forEach(function(mapping) {
      if (mapping.Key == String(region)) {
        $.ajax({
          url: baseAddress
           + 'Activate?gloveAddress=' + glove.BluetoothAddress
           + '&actuator=' + mapping.Value
           + '&intensity=' + String(intensity),
          type: 'POST'
        });
        return;
      }
    });
};

/**
  Activates regions based on a glove current mappings.
* @param {Glove} glove - Glove object. Use the ones returned from GetGloves.
* @param {integer} regions - List of regions defined by the SDK (0 to 57)
* @param {integer} intensityList - Intensity list of the activation for each region (0 to 255)
*/
function ActivateMany(glove, regions, intensityList) {
    actuators = [];

    regions.forEach(
      function(region){
        glove.GloveConfiguration.GloveProfile.Mappings.forEach(function(mapping) {
          if (mapping.Key == String(region)) {
            actuators.push(parseInt(mapping.Value));
            return false;
          }
        });

      }
    );

    var jsonObject = JSON.stringify(
        {
        actuators: actuators,
        intensityList: intensityList
      }
    );

    //console.log(jsonObject);
    $.ajax({
      url: baseAddress
       + 'ActivateMany?gloveAddress=' + glove.BluetoothAddress,
      type: 'POST',
      contentType: 'application/json',
      data:
          jsonObject
        ,
      dataType: 'json'
    });
    return;
};

/**
  Contains the regions defined by the SDK. Refer to these constants to activate
  a glove.
**/
var HandRegion = {
  PalmarFingerSmallDistal: 0,
  PalmarFingerRingDistal: 1,
  PalmarFingerMiddleDistal: 2,
  PalmarFingerIndexDistal: 3,
  PalmarFingerSmallMiddle: 4,
  PalmarFingerRingMiddle: 5,
  PalmarFingerMiddleMiddle: 6,
  PalmarFingerIndexMiddle: 7,
  PalmarFingerSmallProximal: 8,
  PalmarFingerRingProximal: 9,
  PalmarFingerMiddleProximal: 10,
  PalmarFingerIndexProximal: 11,
  PalmarPalmSmallDistal: 12,
  PalmarPalmRingDistal: 13,
  PalmarPalmMiddleDistal: 14,
  PalmarPalmIndexDistal: 15,
  PalmarPalmSmallProximal: 16,
  PalmarPalmRingProximal: 17,
  PalmarPalmMiddleProximal: 18,
  PalmarPalmIndexProximal: 19,
  PalmarHypoThenarSmall: 20,
  PalmarHypoThenarRing: 21,
  PalmarThenarMiddle: 22,
  PalmarThenarIndex: 23,
  PalmarFingerThumbProximal: 24,
  PalmarFingerThumbDistal: 25,
  PalmarHypoThenarDistal: 26,
  PalmarThenar: 27,
  PalmarHypoThenarProximal: 28,
  DorsalFingerSmallDistal: 29,
  DorsalFingerRingDistal: 30,
  DorsalFingerMiddleDistal: 31,
  DorsalFingerIndexDistal: 32,
  DorsalFingerSmallMiddle: 33,
  DorsalFingerRingMiddle: 34,
  DorsalFingerMiddleMiddle: 35,
  DorsalFingerIndexMiddle: 36,
  DorsalFingerSmallProximal: 37,
  DorsalFingerRingProximal: 38,
  DorsalFingerMiddleProximal: 39,
  DorsalFingerIndexProximal: 40,
  DorsalPalmSmallDistal: 41,
  DorsalPalmRingDistal: 42,
  DorsalPalmMiddleDistal: 43,
  DorsalPalmIndexDistal: 44,
  DorsalPalmSmallProximal: 45,
  DorsalPalmRingProximal: 46,
  DorsalPalmMiddleProximal: 47,
  DorsalPalmIndexProximal: 48,
  DorsalHypoThenarSmall: 49,
  DorsalHypoThenarRing: 50,
  DorsalThenarMiddle: 51,
  DorsalThenarIndex: 52,
  DorsalFingerThumbProximal: 53,
  DorsalFingerThumbDistal: 54,
  DorsalHypoThenarDistal: 55,
  DorsalThenar: 56,
  DorsalHypoThenarProximal: 57
};

/**
  Contains the regions of the flex sensors defined by the SDK.
**/
var FlexorRegion = {
  ThumbInterphalangealJoint: 0,
  IndexInterphalangealJoint: 1,
  MiddleInterphalangealJoint: 2,
  RingInterphalangealJoint: 3,
  SmallInterphalangealJoint: 4,
  ThumbMetacarpophalangealJoint: 5,
  IndexMetacarpophalangealJoint: 6,
  MiddleMetacarpophalangealJoint: 7,
  RingMetacarpophalangealJoint: 8,
  SmallMetacarpophalangealJoint: 9
};
