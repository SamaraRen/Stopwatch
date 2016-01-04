var React = require('react-native');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
} = React;
var formatTime = require('minutes-seconds-milliseconds');


var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed2: null,
      timeElapsed: null,
      running: false,
      startTime: null,
      startTime2: null,
      laps: [],
    }
  },
  render: function() {
    return <View style = {styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <View style={styles.time1}>
            <Text style={styles.timer1}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.time2}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed2)}
            </Text>
          </View>
        </View>
        <View style={ styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>
    </View>
  },
  laps: function() {
    return this.state.laps.map(function(time, index) {
      return <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap {index +1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
    })
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton: styles.startButton;
    return <TouchableHighlight 
    underlayColor="gray"
    onPress={this.handleStartPress}
    style={[styles.button, style]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
  },
  lapButton: function () {
    return <TouchableHighlight 
    style={styles.button}
    underlayColor='gray'
    onPress={this.handleLapPress}>
        <Text>
          {this.state.running ? 'Lap' : 'Reset'}
        </Text>
      </TouchableHighlight>
  },
  handleStartPress: function(){
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }
    // never do this:   this.state.timeElapsed = new Date()
    // Update our state with new value
    this.setState({startTime2: new Date()});
    this.setState({startTime: new Date()});
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        timeElapsed2: new Date() - this.state.startTime2,
        running: true
      });
    }, 100);

  },

  handleLapPress: function() {
    var lap = this.state.timeElapsed;
    if (this.state.running) {
      this.setState({
        startTime: new Date(),
        laps: this.state.laps.concat([lap])
      });
    }
    else {
      this.setState({startTime: new Date()});
      this.setState({
          timeElapsed: null,
          timeElapsed2: null,
          laps: [],
        });

    }
  },

  border: function(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {//red
    flex: 5, // takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  time1: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  timer1: {
    fontSize: 20,
    fontWeight: "100"
  },
  time2: {
    flex: 3,
  },
  buttonWrapper: {//green
    flex: 3, // takes up 5/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60,
    color: '#E87722'
  },
  button: {
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: '002058',
  },
  stopButton: {
    borderColor: 'E87722'
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  lapText: {
    fontSize: 15,
    fontWeight: "100",
    color: '002058'
  }
});


//AppRegistry.registerComponent('stopwatch', function() {
//  return StopWatch
//});
AppRegistry.registerComponent('stopwatch', () => StopWatch); //This is ES2015 fancy version

