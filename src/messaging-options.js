export default {
    host: 'wss://mr-connection-4rkd228mtwr.messaging.solace.cloud:8443',
    username: 'solace-cloud-client',
    password: '2ldp4pe9pha6pjvlt33n391dvn',
    clientId: 'myUniqueClientId',
    keepalive: 10,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    rejectUnauthorized: false
};