class Stopwatch extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			running: false,
			display: '0:00:0',
			minutes: 0,
			seconds: 0,
			miliseconds:0
		}
		this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
        this.stop = this.stop.bind(this);
        this.step = this.step.bind(this);
        this.print = this.print.bind(this);
	}
	
	reset() {
		this.setState({
			running: false
		});
		this.print();
	}

	print() {
		const display = this.format(this.state);
		this.setState({display});
	}

	format(props) {
		let timer = this.pad0(this.state.minutes) + ':' + this.pad0(this.state.seconds) + ':' + this.pad0(this.state.miliseconds);
		return timer;
	}

	pad0(value) {
		let result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
	}

	start() {
		if(this.state.running == false) {
			this.setState({
				running:true
			});
			console.log('printf-1');
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (this.state.running == false) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.setState(event=>{
			event.miliseconds + 1;
		});
		if (this.state.miliseconds >= 100) {
			this.setState(event=>{
				event.seconds + 1;
				event.miliseconds = 0;
			});
		}
		if (this.state.seconds >=60) {
			this.setState(event=>{
				event.minutes + 1;
				event.seconds = 0;
			});
		}
	}

	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	render() {
		return (
			<nav className='col-md-12 controls text-center'>
				<button className='btn btn-lg btn-success' onClick={this.start}>Start</button>
				<button className='btn btn-lg btn-danger' onClick={this.stop}>Stop</button>
				<button className='btn btn-lg btn-success' onClick={this.reset}>Reset</button>
				<div className="stopwatch text-center" style={{fontSize: 30}} />{this.display} />
			</nav>
		);
	}
}




var app = React.createElement(Stopwatch);
ReactDOM.render(<Stopwatch />, document.getElementById('app')
);