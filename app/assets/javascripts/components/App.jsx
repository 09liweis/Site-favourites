class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}></Route>
            </Router>
        );
    }
}