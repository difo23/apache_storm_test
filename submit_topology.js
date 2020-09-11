var storm = require('node-storm')

var options = {
    // name: 'optional... the default name is the name of the topology script',
    nimbus: '10.10.11.42:6627',
    config: { 'topology.debug': true }
}
storm.submit(topology, options, function(err, topologyName) {
    // Handle error or submission success
    console.dir(topologyName)
})